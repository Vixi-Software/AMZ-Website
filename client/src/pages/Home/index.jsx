<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { Carousel, Space } from 'antd'
import 'antd/dist/reset.css'
import CountSale from './CountSale'
import BannerCustom from './BannerCustom'
import ProductGrid from '../../components/ui/product-grid'
import BannerCustom2 from './BannerCustom2'
import Feeback from './Feeback'
import { db } from '../../utils/firebase'
import { useFirestore } from '../../hooks/useFirestore'

const carouselImages = [
  'https://tiengvangaudio.vn/wp-content/uploads/2023/02/BANNER-DM-JBL.jpg',
  'https://th.bing.com/th/id/OIP.TwEyvv_v8V_eLhG-g21lLgHaDR?rs=1&pid=ImgDetMain',
  'https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg',
]

// const extraButtons = [
//   { key: "extra1", label: "Xem khuyến mãi", type: "default" },
//   { key: "extra2", label: "Sản phẩm mới", type: "default" }
// ]
const banners = [
  { bannerImg: "https://seve7.vn/wp-content/themes/yootheme/cache/01.11-01-scaled-6d43862a.jpeg", alt: "Banner 1", bannerIndex: 1 },
  { bannerImg: "https://th.bing.com/th/id/OIP.u0yK-aYenmSmKoq7WOL5sQHaEm?w=864&h=537&rs=1&pid=ImgDetMain", alt: "Banner 2", bannerIndex: 5 },
]

function Home() {
  const [products, setProducts] = useState([])
  const { getAllDocs } = useFirestore(db, 'products')

  useEffect(() => {
    getAllDocs().then((data) => {
      setProducts(data)
    })
  }, [])

  return (
    <div className="w-full">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Carousel autoplay arrows>
          {carouselImages.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`carousel-${idx}`}
                className="
                  w-full object-cover
                  h-[300px]
                  md:h-[400px]
                  lg:h-[560px]
                  rounded-lg
                "
              />
            </div>
          ))}
        </Carousel>
        <div className="hidden md:block">
          <CountSale />
        </div>
        <BannerCustom />
        <ProductGrid
          title="Top bán chạy"
          products={products}
          banners={banners}
          // extraButtons={extraButtons}
          // viewAllButton={() => alert("Xem tất cả sản phẩm")}
        />
        {/* <ProductGrid
          title="Loa nổi bật"
          products={products2}
          banners={banners2}
          extraButtons={extraButtons2}
          viewAllButton={() => alert("Xem tất cả loa nổi bật")}
        /> */}
        <BannerCustom2 />
        <Feeback />
      </Space>
=======
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
>>>>>>> fix-admin
    </div>
  )
}

export default Home