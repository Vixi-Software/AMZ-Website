import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

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
      color: product.options?.[0]?.values || [], 
      Product_condition: product.options?.[1]?.values?.[0] || null,
      Barcode: product.variants?.[0]?.barcode || null,
      DaNang: product.variants?.[0]?.inventories?.[0]?.available || 0,
      HaNoi: product.variants?.[0]?.inventories?.[1]?.available || 0,
      Ban_Le: formatVND(product.variants?.[0]?.variant_prices?.[0]?.value || 0),
      Ban_Le_Value: product.variants?.[0]?.variant_prices?.[0]?.value || 0,
      image: product.images || [], 
    }));

    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
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
export function formatVND(amount) {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export async function addProductsToFirebase() {
  try {
    // Lấy dữ liệu products từ hàm fetchData
    const { productsData, categories, brands, colors } = await fetchData();
    
    // Thêm từng product vào Firestore với ID tùy chỉnh
    const addProductPromises = productsData.map(async (product) => {
      const productRef = doc(db, "products", product.id + '');
      await setDoc(productRef, {
        name: product.name,
        category: product.category,
        category_code: product.category_code,
        brand: product.brand,
        color: product.color,
        Product_condition: product.Product_condition,
        Barcode: product.Barcode,
        DaNang: product.DaNang,
        HaNoi: product.HaNoi,
        Ban_Le: product.Ban_Le,
        Ban_Le_Value: product.Ban_Le_Value,
        image: product.image
      });
      console.log(`Đã thêm product với ID: ${product.id}`);
    });

    // Thêm categories vào Firestore
    const addCategoryPromises = categories.map(async (category) => {
      const categoryRef = doc(db, "categories", category);
      await setDoc(categoryRef, { name: category });
      console.log(`Đã thêm category: ${category}`);
    });

    // Thêm brands vào Firestore
    const addBrandPromises = brands.map(async (brand) => {
      const brandRef = doc(db, "brands", brand);
      await setDoc(brandRef, { name: brand });
      console.log(`Đã thêm brand: ${brand}`);
    });

    // Thêm colors vào Firestore
    const addColorPromises = colors.map(async (color) => {
      const colorRef = doc(db, "colors", color);
      await setDoc(colorRef, { name: color });
      console.log(`Đã thêm color: ${color}`);
    });

    // Chờ tất cả các thao tác hoàn thành
    await Promise.all([
      ...addProductPromises,
      ...addCategoryPromises,
      ...addBrandPromises,
      ...addColorPromises
    ]);
    console.log("✅ Đã thêm tất cả products, categories, brands, colors vào Firebase");
    return { success: true, message: "Products, categories, brands, colors added successfully" };
  } catch (error) {
    console.error("❌ Lỗi khi thêm dữ liệu vào Firebase:", error);
    throw error;
  }
}

export async function deleteSyncedProductsFromFirestore() {
  try {
    // Lấy dữ liệu products từ fetchData để biết danh sách ID cần xóa
    const { productsData } = await fetchData();

    // Xóa từng product theo ID khỏi Firestore
    const deletePromises = productsData.map(async (product) => {
      const productRef = doc(db, "products", product.id + '');
      await deleteDoc(productRef);
      console.log(`Đã xóa product với ID: ${product.id}`);
    });

    await Promise.all(deletePromises);
    console.log("✅ Đã xóa tất cả products khỏi Firestore");
    return { success: true, message: "Products deleted successfully" };
  } catch (error) {
    console.error("❌ Lỗi khi xóa products khỏi Firestore:", error);
    throw error;
  }
}