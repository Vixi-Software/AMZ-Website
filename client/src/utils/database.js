import { db } from './firebase';
import { collection, setDoc, doc, getDocs, deleteDoc } from "firebase/firestore";

export async function fetchData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/vdev0812/downgrade-ear/refs/heads/main/products.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const products = data.products;

    const productsData = products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      category_code: product.category_code,
      brand: product.brand,
      color: product.options?.[0]?.values?.[0] || null,
      Product_condition: product.options?.[1]?.values?.[0] || null,
      Barcode: product.variants?.[0]?.barcode || null,
      DaNang: product.variants?.[0]?.inventories?.[0]?.available || 0,
      HaNoi: product.variants?.[0]?.inventories?.[1]?.available || 0,
      Ban_Le: formatVND(product.variants?.[0]?.variant_prices?.[0]?.value || 0),
    }));

    // 2. Danh sách category duy nhất
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

    // 3. Danh sách brand duy nhất
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];

    // 4. Danh sách màu duy nhất (từ option[0].values)
    const colors = [
      ...new Set(
        products
          .map(p => p.options?.[0]?.values || [])
          .flat()
          .filter(Boolean)
      )
    ];

    return { productsData, categories, brands, colors };
  } catch (err) {
    console.error("❌ Lỗi fetch dữ liệu:", err);
    throw err;
  }
}

// Hàm format tiền Việt Nam
export function formatVND(amount) {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Hàm đồng bộ toàn bộ dữ liệu lên Firestore
export async function syncAllToFirebase() {
  try {
    const { productsData, categories, brands, colors } = await fetchData();

    // Đồng bộ productsData
    const productPromises = productsData.map(product =>
      setDoc(doc(collection(db, "products"), product.id.toString()), product)
    );

    // Đồng bộ categories
    const categoryPromises = categories.map(category =>
      setDoc(doc(collection(db, "categories"), category), { name: category })
    );

    // Đồng bộ brands
    const brandPromises = brands.map(brand =>
      setDoc(doc(collection(db, "brands"), brand), { name: brand })
    );

    // Đồng bộ colors
    const colorPromises = colors.map(color =>
      setDoc(doc(collection(db, "colors"), color), { name: color })
    );

    await Promise.all([
      ...productPromises,
      ...categoryPromises,
      ...brandPromises,
      ...colorPromises
    ]);

    console.log("✅ Đã đồng bộ products, categories, brands, colors lên Firestore!");
  } catch (err) {
    console.error("❌ Lỗi đồng bộ lên Firestore:", err);
    throw err;
  }
}

// Hàm xóa sạch dữ liệu products, categories, brands, colors trên Firestore
export async function cleanAllFromFirebase() {
  try {
    const collections = ["products", "categories", "brands", "colors"];
    for (const col of collections) {
      const snapshot = await getDocs(collection(db, col));
      const deletePromises = snapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
      await Promise.all(deletePromises);
    }
    console.log("🧹 Đã xóa sạch dữ liệu products, categories, brands, colors trên Firestore!");
  } catch (err) {
    console.error("❌ Lỗi khi xóa dữ liệu Firestore:", err);
    throw err;
  }
}
