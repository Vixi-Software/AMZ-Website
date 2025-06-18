import React, { useEffect } from 'react'
import CountSale from './CountSale'
import ProductGrid from '../../components/features/ProductGrid'
import iconPopular from '../../assets/iconPopular.png'
import MainCarousel from './MainCarousel';
import BannerCustom from './BannerCustom';
import BannerCustom2 from './BannerCustom2';
import Feeback from './Feeback';
import fireIcon from '../../assets/fire.png'
import { useSelector } from 'react-redux'
import { useProductService } from '../../services/productService'
import { useHomeSettingService } from '../../services/homeSettingService'

function Home() {
  const { getProductsWithStore } = useProductService();
  const { getHomeSettingsWithStore } = useHomeSettingService();
  const [products1, setProducts1] = React.useState([]);
  const [products2, setProducts2] = React.useState([]);
  const [activeCategory1, setActiveCategory1] = React.useState(""); 
  const [activeCategory2, setActiveCategory2] = React.useState("");
  const [allBestSellerProducts, setAllBestSellerProducts] = React.useState([]);
  const [allSaleProducts, setAllSaleProducts] = React.useState([]);
  const home = useSelector(state => state.homeSetting.homeSettings);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const all = await getProductsWithStore();
      // Lọc sản phẩm bán chạy
      const bestSellers = (all || []).filter(product => product.isbestSeller);
      setAllBestSellerProducts(bestSellers);
      setProducts1(bestSellers);
      // Lọc sản phẩm đang sale
      const priceSaleProducts = (all || []).filter(product => product.salePrice !== undefined && product.salePrice !== null);
      setAllSaleProducts(priceSaleProducts);
      setProducts2(priceSaleProducts);
    };
    
    fetchProducts();
  }, []);

  // Hàm lọc cho từng ProductGrid
  const handleFilterCategory1 = async (category) => {
    if (activeCategory1 === category) {
      setActiveCategory1(""); // Bỏ chọn
      setProducts1(allBestSellerProducts); // Hiện tất cả
    } else {
      setActiveCategory1(category); // Đánh dấu nút đang active
      const filtered = allBestSellerProducts.filter(
        (product) => product.category && product.category.toLowerCase().includes(category.toLowerCase())
      );
      setProducts1(filtered);
    }
  };

  const handleFilterCategory2 = async (category) => {
    if (activeCategory2 === category) {
      setActiveCategory2(""); // Bỏ chọn
      setProducts2(allSaleProducts); // Hiện tất cả
    } else {
      setActiveCategory2(category); // Đánh dấu nút đang active
      const filtered = allSaleProducts.filter(
        (product) => product.category && product.category.toLowerCase().includes(category.toLowerCase())
      );
      setProducts2(filtered);
    }
  };

  useEffect(() => {
    getHomeSettingsWithStore();
  }, []);

  return (
    <div className='flex flex-col gap-6'>
      <MainCarousel />
      <CountSale endDate={home?.endDate} content={home?.content} />
      <BannerCustom />
      <ProductGrid
        title={<span className='flex gap-2'><b>Top bán chạy</b><img width={34} height={24} src={iconPopular} alt="" /></span>}
        buttons={[
          { label: "Top tai nghe", type: "primary", className: "!font-semibold !bg-[#D65312]", onClick: () => handleFilterCategory1("Tai nghe"), category: "Tai nghe" },
          { label: "Top loa", className: "!font-semibold", onClick: () => handleFilterCategory1("Loa"), category: "Loa" }
        ]}
        products={products1}
        banners={[
          { index: 0, image: home[0].topSellingImage1 },
          { index: 6, image: home[0].topSellingImage2 }
        ]}
        activeCategory={activeCategory1}
      />
      <BannerCustom2 />
      <ProductGrid
        title={<span className='flex gap-2'><b>Deal cực cháy - Mua ngay kẻo lỡ</b><img width={34} height={24} src={fireIcon } alt="" /></span>}
        buttons={[
          { label: "Tai nghe đang sale", type: "primary", className: "!font-semibold !bg-[#D65312]", onClick: () => handleFilterCategory2("Tai nghe"), category: "Tai nghe" },
          { label: "Loa đang sale", className: "!font-semibold", onClick: () => handleFilterCategory2("Loa"), category: "Loa" }
        ]}
        products={products2}
        banners={[
          { index: 0, image: home[0].hotDealImage1 },
          { index: 6, image: home[0].hotDealImage1 }
        ]}
        activeCategory={activeCategory2}
      />
      <Feeback />
    </div>
  )
}

export default Home