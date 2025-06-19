import { useDispatch, useSelector } from "react-redux";
import { setProducts, setProductSelected } from "../store/features/productServices/productServiceSlice";
import { useFirestore } from "../hooks/useFirestore";
import { db } from "../utils/firebase";
import React from "react";

const collectionName = "productStore";
const PAGE_SIZE = 10;
const ORDER_FIELD = "name";
const TIME_EXPIRATION = 30 * 60 * 1000;
const LAST_FETCHED_KEY = "products_last_fetched";

// {
//   "id": "02U5zSsiKZzoa8CCXL5v",
//     "isbestSeller": true,
//       "status": "active",
//         "product_type": "Tai nghe nhét tai cũ",
//           "tags": "Tai nghe xịn, Tai nghe đẹp,",
//             "sku": "",
//               "colors": [
//                 "Vàng",
//                 "Đen"
//               ],
//                 "statusSell": [
//                   "99-98% Nobox"
//                 ],
//                   "name": "Linkbuds S",
//                     "tableInfo": "<table style="width: 100 %; border - collapse: collapse; border: 1px solid #ccc; "><tr><td style="font - weight: bold; border: 1px solid #ccc; padding: 4px 8px; ">Khối lượng</td><td style="border: 1px solid #ccc; padding: 4px 8px; ">1 gam</td></tr></table>",
//                       "salePrice": 20,
//                         "pricesBanLe": 2190000,
//                           "images": [
//                             "https://th.bing.com/th/id/R.510e12b341f9ebee2b7481fbd5d481b0?rik=7G19oh96tH8y2g&pid=ImgRaw&r=0",
//                             "https://cdn.rentio.jp/matome/uploads/2022/12/IMG_9308-scaled.jpg",
//                             "https://songlongmedia.com/media/product/3140_sony_linkbuds_s_den_black_songlongmediacom__1_.jpg"
//                           ],
//                             "inventories": 20,
//                               "brand": "Sony",
//                                 "category": "Tai nghe nhét tai cũ",
//                                   "pricesBanBuon": 0,
//                                     "description": "Velit non cum erat elit. Ac fusce porta amet tellus. Volutpat per nisi dignissim lacus. Luctus non vel posuere faucibus. Eu et netus ultricies litora. Imperdiet erat primis proin ridiculus. Magna nunc turpis vivamus accumsan. Iaculis enim risus taciti natoque. Ornare varius nam eleifend aenean.\n\nAuctor faucibus posuere suspendisse posuere. Quisque malesuada ornare praesent scelerisque. Et integer suscipit tellus nam. Ante luctus velit accumsan sagittis. Metus ridiculus curabitur volutpat varius. Habitasse sodales purus pellentesque felis. Lectus praesent sollicitudin hac risus. Volutpat posuere non habitasse sed. Malesuada fusce hendrerit nunc natoque."
// }

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
      return products;
    }
    const allProducts = await getAllProducts();
    dispatch(setProducts(allProducts));
    setLastFetched(now);
    return allProducts;
  };

  // Lấy sản phẩm theo danh mục (tìm kiếm gần đúng, không phân biệt hoa thường)
  const getProductsByCategory = async (category) => {
    const allProducts = await getProductsWithStore();
    const lowerCategory = category.toLowerCase();
    return allProducts.filter((product) =>
      product.category && product.category.toLowerCase().includes(lowerCategory)
    );
  };

  // Lấy sản phẩm theo tên (tìm kiếm gần đúng, không phân biệt hoa thường)
  const getProductsByName = async (name) => {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return [];
    }

    const allProducts = await getProductsWithStore();
    const lowerName = name.toLowerCase().trim();

    // Bước 1: Lọc sản phẩm có tên chứa từ khóa (ưu tiên hàng đầu)
    const keywordProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerName)
    );

    // Nếu đủ 10 sản phẩm thì trả về ngay
    if (keywordProducts.length >= 10) { 
      return keywordProducts.slice(0, 10);
    }

    // Bước 2: Lấy thêm sản phẩm có chứa ký tự đầu tiên (không trùng)
    const firstChar = lowerName[0];
    const additionalProducts = allProducts.filter(product =>
      !keywordProducts.some(p => p.id === product.id) &&
      product.name.toLowerCase().includes(firstChar)
    );

    // Kết hợp kết quả, giới hạn tối đa 10 sản phẩm
    const results = [
      ...keywordProducts,
      ...additionalProducts.slice(0, 10 - keywordProducts.length)
    ];

    return results;
  };

  const filterProduct = async (filter = {}, sort = '') => {
    const allProducts = await getProductsWithStore();
    if (!allProducts || allProducts.length === 0) return [];

    // Lọc theo category (dùng includes)
    let filteredByCategory = allProducts;
    if (filter.category && filter.category.trim() !== "") {
      filteredByCategory = allProducts.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase().includes(filter.category.toLowerCase())
      );
    }

    // --- SẮP XẾP TRƯỚC ---
    let sortedProducts = [...filteredByCategory];
    switch (sort) {
      case 'asc':
        sortedProducts = sortedProducts.sort(
          (a, b) =>
            (a.salePrice || a.pricesBanLe || 0) - (b.salePrice || b.pricesBanLe || 0)
        );
        break;
      case 'desc':
        sortedProducts = sortedProducts.sort(
          (a, b) =>
            (b.salePrice || b.pricesBanLe || 0) - (a.salePrice || a.pricesBanLe || 0)
        );
        break;
      case 'hotdeal':
        sortedProducts = sortedProducts.sort((a, b) => {
          const aHasSale = !!a.salePrice;
          const bHasSale = !!b.salePrice;
          if (aHasSale !== bHasSale) {
            return bHasSale - aHasSale; // true lên đầu
          }
          return (b.discountPercent || 0) - (a.discountPercent || 0);
        });
        break;
      case 'bestseller':
        sortedProducts = sortedProducts.sort(
          (a, b) => (b.isbestSeller === true) - (a.isbestSeller === true)
        );
        break;
      default:
        sortedProducts = sortedProducts.sort((a, b) =>
          a.name.localeCompare(b.name, 'vi')
        );
        break;
    }

    // --- LỌC SAU ---
    let filteredProducts = sortedProducts.filter((product) => {
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

      // Lọc theo priceRanges (mảng các [min, max])
      if (
        Array.isArray(filter.priceRanges) &&
        filter.priceRanges.length > 0
      ) {
        const price = product.salePrice || product.pricesBanLe || 0;
        // Nếu nằm trong ít nhất một khoảng giá thì giữ lại
        if (
          !filter.priceRanges.some(
            (range) =>
              Array.isArray(range) &&
              range.length === 2 &&
              price >= range[0] &&
              price <= range[1]
          )
        ) {
          return false;
        }
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

    // Sắp xếp lại theo giá nếu có lọc priceRanges
    if (
      Array.isArray(filter.priceRanges) &&
      filter.priceRanges.length > 0 &&
      (sort === 'asc' || sort === 'desc')
    ) {
      filteredProducts = filteredProducts.sort((a, b) => {
        const priceA = a.salePrice || a.pricesBanLe || 0;
        const priceB = b.salePrice || b.pricesBanLe || 0;
        return sort === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    return filteredProducts;
  };

  // Lấy sản phẩm theo id từ store, nếu có thì lưu vào store.productEdit
  const getProductByIdFromStore = (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      dispatch(setProductSelected(product));
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
    getProductsWithStore,
    getProductsByCategory,
    getProductsByName,
    filterProduct,
    getProductByIdFromStore,
  };
}
