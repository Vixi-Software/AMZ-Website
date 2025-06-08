import { db } from './firebase';
import { collection, setDoc, doc, getDocs, deleteDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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


    if (!localStorage.getItem("top5ProductNames")) {
      const first5Names = productsData.slice(0, 5).map(p => {
        const parts = p.name.split(" - ");
        return {
          id: p.id,
          name: parts[2] ? parts[2].trim() : p.name
        };
      });
      localStorage.setItem("top5ProductNames", JSON.stringify(first5Names));
    }

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


// Hàm format tiền Việt Nam
export function formatVND(amount) {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Hàm đồng bộ toàn bộ dữ liệu lên Firestore
export async function syncAllToFirebase() {
  try {
    const { productsData, categories, brands, colors } = await fetchData();

    const processedProducts = productsData.map(product => {
      const nameParts = product.name.split(" - ");
      const shortName = nameParts[2] ? nameParts[2].trim() : product.name;
      let productCondition = product.Product_condition;
      if (!Array.isArray(productCondition)) {
        productCondition = productCondition ? [productCondition] : [];
      }
      return {
        ...product,
        name: shortName,
        Product_condition: productCondition
      };
    });

    // Gộp dữ liệu cũ và mới khi sync
    const productPromises = processedProducts.map(async product => {
      const productRef = doc(collection(db, "products"), product.id.toString());
      const oldDoc = await getDoc(productRef);
      let mergedProduct = { ...product };

      if (oldDoc.exists()) {
        const oldData = oldDoc.data();
        // Gộp mảng image (loại trùng lặp)
        mergedProduct.image = Array.from(new Set([...(oldData.image || []), ...(product.image || [])]));
        // Nếu muốn gộp các trường khác dạng mảng, làm tương tự ở đây
        // Ví dụ: mergedProduct.Product_condition = Array.from(new Set([...(oldData.Product_condition || []), ...(product.Product_condition || [])]));
      }
      return setDoc(productRef, mergedProduct);
    });

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
    if (err.stack) {
      console.error("Stack trace:", err.stack);
    }
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

// Hàm upload ảnh lên Firebase Storage
export async function uploadImageToFirebase(file, path = "product-images") {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (err) {
    console.error("❌ Lỗi upload ảnh lên Firebase:", err);
    throw err;
  }
}

// Lấy danh sách sản phẩm theo category
export async function getProductsByCategory(category) {
  try {
    const { productsData } = await fetchData();
    console.log("🚀 ~ getProductsByCategory ~ productsData:", productsData)
    
    return productsData.filter(product => product.category === category);
  } catch (err) {
    console.error("❌ Lỗi lấy sản phẩm theo category:", err);
    throw err;
  }
}

// Lấy danh sách sản phẩm theo brand
export async function getProductsByBrand(brand) {
  try {
    const { productsData } = await fetchData();
    return productsData.filter(product => product.brand === brand);
  } catch (err) {
    console.error("❌ Lỗi lấy sản phẩm theo brand:", err);
    throw err;
  }
}

// Lấy danh sách categories từ Firestore
export async function getCategoriesFromFirebase() {
  try {
    const snapshot = await getDocs(collection(db, "categories"));
    return snapshot.docs.map(doc => doc.data().name);
  } catch (err) {
    console.error("❌ Lỗi lấy categories từ Firestore:", err);
    throw err;
  }
}

// Lấy danh sách brands từ Firestore
export async function getBrandsFromFirebase() {
  try {
    const snapshot = await getDocs(collection(db, "brands"));
    return snapshot.docs.map(doc => doc.data().name);
  } catch (err) {
    console.error("❌ Lỗi lấy brands từ Firestore:", err);
    throw err;
  }
}

// Lọc sản phẩm theo thương hiệu
export async function filterProductsByBrand(brand) {
  const { productsData } = await fetchData();
  return productsData.filter(product => product.brand === brand);
}

// Lọc sản phẩm theo khoảng giá (minPrice, maxPrice là số VND)
export async function filterProductsByPriceRange(minPrice, maxPrice) {
  const { productsData } = await fetchData();
  return productsData.filter(product => {
    const price = Number(product.Ban_Le.replace(/[^\d]/g, ''));
    return price >= minPrice && price <= maxPrice;
  });
}

// Lọc sản phẩm theo nhu cầu sử dụng (usage)
export async function filterProductsByUsage(usage) {
  const { productsData } = await fetchData();
  // Giả sử trường 'usage' đã có trong mỗi product
  return productsData.filter(product => product.usage === usage);
}

// Lấy thông tin chi tiết một brand từ Firestore theo tên
export async function getBrandDetailFromFirebase(brandName) {
  try {
    const brandDoc = await getDocs(collection(db, "brands"));
    const brand = brandDoc.docs.find(doc => doc.id === brandName || doc.data().name === brandName);
    return brand ? { id: brand.id, ...brand.data() } : null;
  } catch (err) {
    console.error("❌ Lỗi lấy brand từ Firestore:", err);
    throw err;
  }
}

export async function searchProductsByName(searchTerm = "") {
  try {
    const { productsData } = await fetchData();
    const keyword = searchTerm.trim().toLowerCase();
    console.log("🚀 ~ searchProductsByName ~ productsData:", productsData);
    return productsData
      .filter(product =>
        product.name.toLowerCase().includes(keyword)
      )
      .map(product => ({
        id: product.id,
        name: product.name,
        image: product.image
      }));
      
  } catch (err) {
    console.error("❌ Lỗi tìm kiếm sản phẩm:", err);
    throw err;
  }
}

// Lấy ngẫu nhiên các sản phẩm có chung brand và category (số lượng mặc định: 4)
export async function getRandomProductsByCategory(category, count = 4) {
  try {
    // Lấy tất cả sản phẩm từ Firestore
    const snapshot = await getDocs(collection(db, "products"));
    const productsData = snapshot.docs.map(doc => doc.data());
    // Lọc sản phẩm theo category
    const filtered = productsData.filter(
      product => product.category === category
    );
    console.log("🚀 ~ getRandomProductsByCategory ~ filtered:", filtered);
    // Xáo trộn mảng
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
    return filtered.slice(0, count);
  } catch (err) {
    console.error("❌ Lỗi lấy random sản phẩm theo brand và category:", err);
    throw err;
  }
}
