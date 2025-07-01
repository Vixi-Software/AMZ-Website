import React, { useEffect } from 'react'
import CountSale from './CountSale'
import ProductGrid from '../../components/features/ProductGrid'
import iconPopular from '../../assets/iconPopular.png'
import MainCarousel from './MainCarousel';
import BannerCustom from './BannerCustom';
import BannerCustom2 from './BannerCustom2';
import Feeback from './Feeback';
import fireIcon from '../../assets/fire.png'
import { useSelector, useDispatch } from 'react-redux'
import { useProductService } from '../../services/productService'
import { useHomeSettingService } from '../../services/homeSettingService'
import { 
  setData as setAllDataRedux,
  setTaiNgheNhetTai,
  setLoaDeBan,
  setLoaKaraoke,
  setNewSealTaiNghe,
  setTaiNgheChupTai,
  setLoaDiDong
} from '../../store/features/allData/allDataSlice';
import { getAllTaiNgheNhetTai } from '../../utils/taiNgheNhetTaiHelper';
import { getAllLoaDeBan } from '../../utils/loaDeBan';
import { getAllLoaKaraoke } from '../../utils/loaKaraoke';
import { getAllNewSealTaiNghe } from '../../utils/newSeal';
import { getAllTaiNgheChupTai } from '../../utils/taiNgheChuptai';
import { getAllLoaDiDong } from '../../utils/diDong';

function Home() {
  const { getProductsWithStore } = useProductService();
  const { getHomeSettingsWithStore } = useHomeSettingService();
  const dispatch = useDispatch();
  const [products1, setProducts1] = React.useState([]);
  const [products2, setProducts2] = React.useState([]);
  const [activeCategory1, setActiveCategory1] = React.useState(""); 
  const [activeCategory2, setActiveCategory2] = React.useState("");
  const [allBestSellerProducts, setAllBestSellerProducts] = React.useState([]);
  const [allSaleProducts, setAllSaleProducts] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  const home = useSelector(state => state.homeSetting.homeSettings);
  const hasLoaded = React.useRef(false);

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
  React.useEffect(() => {
    if (hasLoaded.current) return; // chỉ chạy 1 lần duy nhất
    hasLoaded.current = true;

    let unsub1, unsub2, unsub3, unsub4, unsub5, unsub6;
    let loaded = 0;
    const temp = [];

    function handleLoaded() {
      loaded++;
      if (loaded === 6) {
        const all = [
          ...temp[0], // Tai nghe nhét tai
          ...temp[1], // Loa để bàn
          ...temp[2], // Loa karaoke
          ...temp[3], // New seal tai nghe
          ...temp[4], // Tai nghe chụp tai
          ...temp[5], // Loa di động
        ];
        setAllData(all); 
        dispatch(setAllDataRedux(all)); 
        dispatch(setTaiNgheNhetTai(temp[0] || []));
        dispatch(setLoaDeBan(temp[1] || []));
        dispatch(setLoaKaraoke(temp[2] || []));
        dispatch(setNewSealTaiNghe(temp[3] || []));
        dispatch(setTaiNgheChupTai(temp[4] || []));
        dispatch(setLoaDiDong(temp[5] || []));
      }
    }

    unsub1 = getAllTaiNgheNhetTai((data) => {
      temp[0] = data || [];
      handleLoaded();
    });
    unsub2 = getAllLoaDeBan((data) => {
      temp[1] = data || [];
      handleLoaded();
    });
    unsub3 = getAllLoaKaraoke((data) => {
      temp[2] = data || [];
      handleLoaded();
    });
    unsub4 = getAllNewSealTaiNghe((data) => {
      temp[3] = data || [];
      handleLoaded();
    });
    unsub5 = getAllTaiNgheChupTai((data) => {
      temp[4] = data || [];
      handleLoaded();
    });
    unsub6 = getAllLoaDiDong((data) => {
      temp[5] = data || [];
      handleLoaded();
    });

    return () => {
      unsub1 && unsub1();
      unsub2 && unsub2();
      unsub3 && unsub3();
      unsub4 && unsub4();
      unsub5 && unsub5();
      unsub6 && unsub6();
    };
  }, [dispatch]);

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
          { index: 0, image: home?.[0]?.topSellingImage1 || "" },
          { index: 6, image: home?.[0]?.topSellingImage2 || "" }
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
          { index: 0, image: home?.[0]?.hotDealImage1 || "" },
          { index: 6, image: home?.[0]?.hotDealImage1 || "" }
        ]}
        activeCategory={activeCategory2}
      />
      <Feeback />
    </div>
  )
}

export default Home