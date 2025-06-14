import React, { useEffect } from 'react'
import CountSale from './CountSale'
import { useProductHelper } from '../../utils/productHelper'
import ProductGrid from '../../components/features/ProductGrid'
import iconPopular from '../../assets/iconPopular.png'
import MainCarousel from './MainCarousel';
import BannerCustom from './BannerCustom';
import BannerCustom2 from './BannerCustom2';
import Feeback from './Feeback';
import fireIcon from '../../assets/fire.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomeSetting } from '../../utils/settingHelper'

function Home() {
  const { getAllProducts, getProductsByCategory } = useProductHelper();
  const [products1, setProducts1] = React.useState([]);
  const [products2, setProducts2] = React.useState([]);
  const [activeCategory1, setActiveCategory1] = React.useState(""); 
  const [activeCategory2, setActiveCategory2] = React.useState("");
  const dispatch = useDispatch();
  const home = useSelector(state => state.settings.home);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const all = await getAllProducts();
      setProducts1(all || []);
      setProducts2(all || []);
    };
    fetchProducts();
  }, []);

  // Hàm lọc cho từng ProductGrid
  const handleFilterCategory1 = async (category) => {
    if (activeCategory1 === category) {
      setActiveCategory1("");
      const all = await getAllProducts();
      setProducts1(all || []);
    } else {
      setActiveCategory1(category);
      setActiveCategory2("");
      const filtered = await getProductsByCategory(category);
      setProducts1(filtered || []);
    }
  };

  const handleFilterCategory2 = async (category) => {
    if (activeCategory2 === category) {
      setActiveCategory2("");
      const all = await getAllProducts();
      const filtered = (all || []).filter(
        (product) => product.salePrice !== undefined && product.salePrice !== null
      );
      setProducts2(filtered);
    } else {
      setActiveCategory2(category);
      setActiveCategory1("");
      const filtered = (await getProductsByCategory(category)).filter(
        (product) => product.salePrice !== undefined && product.salePrice !== null
      );
      setProducts2(filtered || []);
    }
  };

  useEffect(() => {
    fetchHomeSetting(dispatch);
  }, [dispatch]);

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
          { index: 0, image: home.banner1Top },
          { index: 6, image: home.banner2Top }
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
          { index: 0, image: home.banner },
          { index: 6, image: home.banner3 }
        ]}
        activeCategory={activeCategory2}
      />
      <Feeback />
    </div>
  )
}

export default Home