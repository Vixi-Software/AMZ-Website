import { useFirestore } from "../hooks/useFirestore";
import { useDispatch } from "react-redux";
import { setProduct, setRandomProducts } from "../store/features/product/productSlice";
import { db } from "./firebase";

export const useProductHelper = () => {
  const dispatch = useDispatch();

  const {
    getAllDocs: getAllProducts,
    getDocById,
    addDocData: addProduct,
    updateDocData: updateProduct,
    deleteDocData: deleteProduct,
  } = useFirestore(db, "products");

  // Hàm lấy random sản phẩm theo số lượng và lưu vào redux
  const getRandomProducts = async (count) => {
    const allProducts = await getAllProducts();
    if (!allProducts || allProducts.length === 0) {
      dispatch(setRandomProducts([]));
      return [];
    }
    // Shuffle array và lấy count phần tử đầu
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, count);
    dispatch(setRandomProducts(randomProducts));
    return randomProducts;
  };

  // Hàm lấy sản phẩm theo id và lưu vào redux
  const getProductById = async (id) => {
    const product = await getDocById(id);
    if (product) {
      dispatch(setProduct(product));
    }
    return product;
  };

  // Hàm lấy tất cả sản phẩm theo loại (category) có chứa chuỗi truyền vào
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
    return filtered;
  };

  return {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getRandomProducts,
    getProductsByCategory,
    searchProductsByName, // thêm hàm này vào return
  };
};