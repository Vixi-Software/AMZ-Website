import React from 'react'
import { useProductHelper } from '../../utils/productHelper'
import ProductGrid from '../../components/features/ProductGrid'
import iconPopular from '../../assets/iconPopular.png'
import MainCarousel from './MainCarousel';
import { Space } from 'antd';
import CountSale from './CountSale';
import BannerCustom from './BannerCustom';
import BannerCustom2 from './BannerCustom2';
import Feeback from './Feeback';
import fireIcon from '../../assets/fire.png'
function Home() {
  const { getAllProducts } = useProductHelper();
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setProducts(products || []);
    };
    fetchProducts();
  }, []);

  return (
    <div className='flex flex-col gap-6'>
      <MainCarousel />
      <CountSale />
      <BannerCustom />
      <ProductGrid
        title={<span className='flex gap-2'><b>Top bán chạy</b><img width={34} height={24} src={iconPopular} alt="" /></span>}
        buttons={[
          { label: "Top tai nghe", type: "primary", className: "!font-semibold !bg-[#D65312]", onClick: () => { } },
          { label: "Top loa", className: "!font-semibold", onClick: () => { } }
        ]}
        products={products}
        banners={[
          { index: 0, image: 'https://cdn.stereo.vn/uploads/2016/04/SpeakersWallpaper161.jpg' },
          { index: 6, image: 'https://loabainhat.com/wp-content/uploads/2023/03/Loa-decor-dep-mat-trang-tri-cho-khong-gian-them-sinh-dong-phong-cach-hon.jpg' }
        ]}
      />
      <BannerCustom2 />
      <ProductGrid
        title={<span className='flex gap-2'><b>Deal cực cháy - Mua ngay kẻo lỡ</b><img width={34} height={24} src={fireIcon } alt="" /></span>}
        buttons={[
          { label: "Top tai nghe", type: "primary", className: "!font-semibold !bg-[#D65312]", onClick: () => { } },
          { label: "Top loa", className: "!font-semibold", onClick: () => { } }
        ]}
        products={products}
        banners={[
          { index: 0, image: 'https://th.bing.com/th/id/OIP.SOu3FLg4lC4wHQSbHTgI7gHaEK?rs=1&pid=ImgDetMain' },
          { index: 6, image: 'https://th.bing.com/th/id/OIP.WAfqtRVQg3epWyzCRbkwZwHaE7?w=626&h=417&rs=1&pid=ImgDetMain' }
        ]}
      />
      <Feeback />
    </div>
  )
}

export default Home