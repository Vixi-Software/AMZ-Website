import React, { useEffect, useState, useMemo } from "react";
import { useProductService } from "../../services/productService";
import ProductGrid from "../../components/features/ProductGrid";
import SideBarProduct from "../../components/features/SideBarProduct";
import { Col, Grid, Row } from "antd";
import Footer from "../../components/features/Footer";
import { useNavigate } from "react-router-dom";
import routePath from "../../constants/routePath";
import { usePostService } from "../../services/postService";

const NewSeal = () => {
  const { getProductsWithStore } = useProductService();
  const { getPostsWithStore } = usePostService();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ brands: [], priceRanges: [] });
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    // Lấy bài viết
    getPostsWithStore().then((posts) => {
      if (isMounted) {
        setPosts(posts);
      }
    });

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
    <div>
      <div className="mb-4">
        <nav className="flex items-center gap-2 text-sm">
          {/* Home icon */}
          <span className="flex items-center gap-1 text-black border-2 p-2 rounded-full border-black" onClick={() => navigate(routePath.home)}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M3 10.75L12 4l9 6.75" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.5 10.75V19a1 1 0 001 1h3.5v-4.25a1 1 0 011-1h2a1 1 0 011 1V20H18.5a1 1 0 001-1v-8.25" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Trang chủ</span>
          </span>

          {/* Divider */}
          <span className="mx-1 text-black">{'>'}</span>
          {/* Product name */}
          <span className="flex items-center gap-1 bg-orange-500 text-white font-semibold p-2 rounded-full border-2 border-orange-500">
            {'Hàng newseal'}
          </span>
        </nav>
      </div>
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
          <div className='mt-[30px]'>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {posts.map(post => (
                  <div key={post.id} className="rounded-lg">
                    <h1 className="text-[21px] be-vietnam-pro-medium  font-semibold">{post.title}</h1>
                    <div
                      className="text-gray-600 be-vietnam-pro"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>Không có bài viết nào</div>
            )}
          </div>

          <Footer />
        </Col>

      </Row>
    </div>

  );
};

export default NewSeal;