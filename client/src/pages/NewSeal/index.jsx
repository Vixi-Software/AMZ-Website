import React, { useEffect, useState } from "react";
import { useProductService } from "../../services/productService";
import ProductGrid from "../../components/features/ProductGrid";

const NewSeal = () => {
  const { getProductsWithStore } = useProductService();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsWithStore();
      // Lọc sản phẩm có statusSell[0] === 'New Seal'
      const newSealProducts = products.filter(
        (item) => item.statusSell && item.statusSell[0] === "New Seal"
      );
      console.log("Filtered New Seal products:", newSealProducts);
      setProduct(newSealProducts);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductGrid products={product}  />
    </div>
  );
};

export default NewSeal;