import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/features/productServices/productServiceSlice";
import { useFirestore } from "../hooks/useFirestore";
import { db } from "../utils/firebase";
import React from "react";

const collectionName = "productStore";
const PAGE_SIZE = 10;
const ORDER_FIELD = "name";
const TIME_EXPIRATION = 30 * 60 * 1000; 
const LAST_FETCHED_KEY = "products_last_fetched";

export const useProductService = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productService.products);

  const getLastFetched = () => {
    const value = localStorage.getItem(LAST_FETCHED_KEY);
    return value ? parseInt(value, 10) : null;
  };

  const setLastFetched = (timestamp) => {
    localStorage.setItem(LAST_FETCHED_KEY, timestamp.toString());
  };

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

  const getProductsWithStore = async () => {
    const now = Date.now();
    const lastFetched = getLastFetched();
    if (
      products.length > 0 &&
      lastFetched &&
      now - lastFetched < TIME_EXPIRATION
    ) {
      console.log("Lấy sản phẩm từ Redux store (cache)");
      return products;
    }
    const allProducts = await getAllProducts();
    dispatch(setProducts(allProducts));
    setLastFetched(now);
    console.log("Lấy sản phẩm từ Firestore");
    return allProducts;
  };

  return {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByPage,
    getProductsWithStore,
  };
}