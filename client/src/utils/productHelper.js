import { useFirestore } from "../hooks/useFirestore";
import { useSelector, useDispatch } from "react-redux";
import { setProduct, setRandomProducts, setProductData } from "../store/features/product/productSlice";
import { db } from "./firebase";
import { setBrands } from "../store/features/brand/brandSlice";

export const useProductHelper = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productData);

  const {
    getAllDocs: getAllProductsFromFirebase,
    getDocById,
    addDocData: addProduct,
    updateDocData: updateProduct,
    deleteDocData: deleteProduct,
  } = useFirestore(db, "products");

  // Lấy tất cả sản phẩm, ưu tiên lấy từ store
  const getAllProducts = async () => {
    if (productData && productData.length > 0) {
      console.log("Lấy từ store");
      return productData;
    }
    console.log("Lấy từ firebase");
    const allProducts = await getAllProductsFromFirebase();
    if (allProducts && allProducts.length > 0) {
      dispatch(setProductData(allProducts));
    }
    return allProducts;
  };

  // Hàm lấy random sản phẩm theo số lượng và lưu vào redux
  const getRandomProducts = async (count) => {
    const allProducts = await getAllProducts();
    if (!allProducts || allProducts.length === 0) {
      dispatch(setRandomProducts([]));
      return [];
    }
    // Clone array before sorting to avoid mutating read-only state
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, count);
    dispatch(setRandomProducts(randomProducts));
    return randomProducts;
  };

  // Hàm lấy sản phẩm theo id và lưu vào redux
  const getProductById = async (id) => {
    let product;
    if (productData && productData.length > 0) {
      product = productData.find((p) => p.id === id);
      if (product) {
        console.log("Lấy từ store");
      }
    }
    if (!product) {
      console.log("Lấy từ firebase");
      product = await getDocById(id);
    }
    if (product) {
      dispatch(setProduct(product));
    }
    return product;
  };

  const getProductsByCategory = async (categoryStr) => {
    const allProducts = await getAllProducts();
    if (!allProducts || allProducts.length === 0) return [];
    const filtered = allProducts.filter(
      (product) =>
        product.category &&
        product.category.toLowerCase().includes(categoryStr.toLowerCase())
    );
    return filtered;
  };

  const searchProductsByName = async (nameStr) => {
    const allProducts = await getAllProducts();
    if (!allProducts || allProducts.length === 0) return [];
    const filtered = allProducts.filter(
      (product) =>
        product.name &&
        product.name.toLowerCase().includes(nameStr.toLowerCase())
    );
    if (filtered.length === 0) {
      // Random 1 từ trong chuỗi nhập
      const words = nameStr.trim().split(/\s+/);
      if (words.length > 1) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const randomFiltered = allProducts.filter(
          (product) =>
            product.name &&
            product.name.toLowerCase().includes(randomWord.toLowerCase())
        );
        if (randomFiltered.length > 0) {
          return randomFiltered;
        }
      }
      // Không trả về rỗng hay allProducts, trả về N sản phẩm ngẫu nhiên
      const N = 5; // Số lượng sản phẩm muốn trả về
      const shuffled = allProducts.sort(() => 0.5 - Math.random());
      const randomProducts = shuffled.slice(0, Math.min(N, allProducts.length));
      return randomProducts;
    }
    return filtered;
  };

  // Lọc sản phẩm theo filter object
  const filterProducts = async (filter) => {
    const allProducts = await getAllProducts();
    if (!allProducts || allProducts.length === 0) return [];

    // Lọc theo category (dùng includes)
    let filteredByCategory = allProducts;
    if (
      filter.category &&
      filter.category.trim() !== ""
    ) {
      filteredByCategory = allProducts.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase().includes(filter.category.toLowerCase())
      );
    }

    console.log("Sản phẩm sau khi lọc category:", filter);

    // Lấy tất cả brand hiện có sau khi lọc category
    const brandsSet = new Set(
      filteredByCategory
        .filter((product) => product.brand)
        .map((product) => product.brand)
    );
    const brands = Array.from(brandsSet);
    console.log("Các brand hiện có:", brands);
    dispatch(setBrands(brands)); // Lưu vào store

    // Tiếp tục filter các điều kiện còn lại
    return filteredByCategory.filter((product) => {
      // Lọc theo brands
      if (
        filter.brands &&
        filter.brands.length > 0 &&
        (!product.brand ||
          !filter.brands.some(
            (b) => b.toLowerCase() === product.brand.toLowerCase()
          ))
      ) {
        return false;
      }

      // Lọc theo priceRanges
      if (
        filter.priceRanges &&
        filter.priceRanges.length > 0 &&
        (typeof product.Ban_Le_Value !== "number" ||
          !filter.priceRanges.some(
            ([min, max]) =>
              product.Ban_Le_Value >= min && product.Ban_Le_Value <= max
          ))
      ) {
        return false;
      }

      // Lọc theo needs (nếu có trường needs trong product)
      if (
        filter.needs &&
        filter.needs.length > 0 &&
        (!product.needs ||
          !filter.needs.every((need) =>
            product.needs
              ?.map((n) => n.toLowerCase())
              .includes(need.toLowerCase())
          ))
      ) {
        return false;
      }

      return true;
    });
  };

  return {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getRandomProducts,
    getProductsByCategory,
    searchProductsByName,
    filterProducts, // thêm hàm này vào return
  };
};