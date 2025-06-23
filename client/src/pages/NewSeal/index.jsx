import React, { useEffect, useState, useMemo } from "react";
import { useProductService } from "../../services/productService";
import ProductGrid from "../../components/features/ProductGrid";
import SideBarProduct from "../../components/features/SideBarProduct";
import { Col, Grid, Row } from "antd";
import Footer from "../../components/features/Footer";

const NewSeal = () => {
  const { getProductsWithStore } = useProductService();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ brands: [], priceRanges: [] });

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const allProducts = await getProductsWithStore();
        if (isMounted) {
          setProducts(
            allProducts.filter(
              (item) => item.statusSell?.[0] === "New Seal"
            )
          );
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // Optionally handle error here
        setProducts([]);
      }
    };
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Lấy danh sách brand duy nhất từ products
  const brandsByCategory = Array.from(
    new Set(products.map((item) => item.brand).filter(Boolean))
  );

  const screens = Grid.useBreakpoint()

  const handleFilterChange = React.useCallback(
    ({ brands, priceRanges }) => {
      setFilters({ brands, priceRanges });
    },
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchBrand =
        filters.brands.length === 0 ||
        filters.brands.includes(product.brand);

      const matchPrice =
        filters.priceRanges.length === 0 ||
        filters.priceRanges.some(
          ([min, max]) =>
            product.price >= min && product.price < max
        );

      return matchBrand && matchPrice;
    });
  }, [filters]);

  return (
    <Row gutter={[16, 0]}>
      <Col xs={24} sm={6} md={7} lg={5}>
        {screens.sm && (
          <div className={`bg-white rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl`}>
            <SideBarProduct
              brands={brandsByCategory}
              priceRanges={[
                { value: [0, 1000000], label: 'Dưới 1 triệu đồng' },
                { value: [1000000, 2000000], label: 'Từ 1 triệu - 2 triệu' },
                { value: [2000000, 3000000], label: 'Từ 2 triệu - 3 triệu' },
                { value: [3000000, 5000000], label: 'Từ 3 triệu - 5 triệu' },
                { value: [5000000, Infinity], label: 'Trên 5 triệu' },
              ]}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

      </Col>
      <Col xs={24} sm={18} md={17} lg={19}>
        <ProductGrid products={filteredProducts} />
        <Footer />
      </Col>

    </Row>
  );
};

export default NewSeal;