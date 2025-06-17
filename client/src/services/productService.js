import { useFirestore } from "../hooks/useFirestore";
import { db } from "../utils/firebase";

const collectionName = "products";
const PRODUCT_CACHE_KEY = "cached_product";
const PRODUCT_CACHE_EXPIRE_KEY = "cached_product_expire";
const PAGE_SIZE = 10;
const ORDER_FIELD = "name";

export const useProductService = () => {
  const {
    getAllDocs,
    getDocById,
    addDocData,
    updateDocData,
    deleteDocData,
    getDocsByPage,
  } = useFirestore(db, collectionName);

  const getAllProducts = async () => {
    return await getAllDocs();
  };

  const getProductById = async (id) => {
    return await getDocById(id);
  };

  const addProduct = async (data) => {
    return await addDocData(data);
  };

  const updateProduct = async (id, data) => {
    await updateDocData(id, data);
  };

  const deleteProduct = async (id) => {
    await deleteDocData(id);
  };

  const getProductsByPage = async ({ pageSize = PAGE_SIZE, lastDoc = null, orderField = ORDER_FIELD }) => {
    return await getDocsByPage({ pageSize, lastDoc, orderField });
  };

  // Lấy sản phẩm, ưu tiên lấy từ cache nếu còn hạn
  const getProductWithStore = async (id) => {
    const now = Date.now();
    const expire = localStorage.getItem(PRODUCT_CACHE_EXPIRE_KEY);
    const cached = localStorage.getItem(PRODUCT_CACHE_KEY);

    if (
      cached &&
      expire &&
      now < Number(expire)
    ) {
      const product = JSON.parse(cached);
      if (product.id === id) {
        return product;
      }
    }

    // Nếu không có hoặc hết hạn, lấy từ Firestore
    const product = await getProductById(id);
    if (product) {
      localStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(product));
      localStorage.setItem(
        PRODUCT_CACHE_EXPIRE_KEY,
        (now + 30 * 60 * 1000).toString()
      );
    }
    return product;
  };

  return {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByPage,
    getProductWithStore,
  };
}