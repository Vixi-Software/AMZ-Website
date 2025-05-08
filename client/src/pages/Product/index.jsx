import Post from '@/components/post';
import ProductGrid from '@/components/product-grid';
import { HomeIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function Product() {
  const [selectedItemLabel, setSelectedItemLabel] = useState('');
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    const label = localStorage.getItem('selectedItemLabel') || 'Tainghenhetcaicu';
    setSelectedItemLabel(label);


    const breadcrumbMap = {
      'Tainghenhettaicu': [
        { text: 'Trang chủ', to: '/', icon: HomeIcon },
        { text: 'Tai nghe nhét tai cũ', to: '/tainghenhetcaicu' },
      ],
      'Tainghechuptaicu': [
        { text: 'Trang chủ', to: '/', icon: HomeIcon },
        { text: 'Tai nghe chụp tai cũ', to: '/tainghechuptaicu' },
      ],
      'Loadidongcu': [
        { text: 'Trang chủ', to: '/', icon: HomeIcon },
        { text: 'Loa di động cũ', to: '/loadidongcu' },
      ],
      'Loadebancu': [
        { text: 'Trang chủ', to: '/', icon: HomeIcon },
        { text: 'Loa để bàn cũ', to: '/loadebancu' },
      ],
      'Loakaraokecu': [
        { text: 'Trang chủ', to: '/', icon: HomeIcon },
        { text: 'Loa karaoke cũ', to: '/loakaraokecu' },
      ],
      'Thucudoimoi': [
        { text: 'Trang chủ', to: '/', icon: HomeIcon },
        { text: 'Thực dụng đổi mới', to: '/thucudoimoi' },
      ],
      'Hangnewseal': [
        { text: 'Trang chủ', to: '/', icon: HomeIcon },
        { text: 'Hàng new seal', to: '/hangnewseal' },
      ],
      'Khuyenmaihot': [
        { text: 'Trang chủ', to: '/', icon: HomeIcon },
        { text: 'Khuyến mãi hot', to: '/khuyenmaihot' },
      ],
      'Baohanh': [
        { text: 'Trang chủ', to: '/', icon: HomeIcon },
        { text: 'Bảo hành', to: '/baohanh' },
      ],
      'Reviews': [
        { text: 'Trang chủ', to: '/', icon: HomeIcon },
        { text: 'Reviews', to: '/reviews' },
      ],
      'Suachua': [
        { text: 'Trang chủ', to: '/', icon: HomeIcon },
        { text: 'Sửa chữa', to: '/suachua' },
      ],
    };

    // Cập nhật breadcrumb dựa trên label
    setBreadcrumb(breadcrumbMap[label] || [
      { text: 'Trang chủ', to: '/', icon: HomeIcon },
      { text: 'Sản phẩm khác', to: '/others' },
    ]);

    // Gọi hàm setBreadCum
    window.util.setBreadCum(breadcrumb);
  }, [selectedItemLabel]);

  return (
    <div>
      <div className='bg-white p-4 rounded-4 flex gap-2 flex-wrap'>
        <h5 className='m-0 mt-3'>Sắp xếp theo</h5>
        <div className='hidden md:flex gap-1 flex-wrap'>
          <button className='border-2 py-1 px-3 font-semibold rounded-3'>Bán chạy nhất</button>
          <button className='border-2 py-1 px-3 font-semibold rounded-3'>Giá thấp đến cao</button>
          <button className='border-2 py-1 px-3 font-semibold rounded-3'>Giá cao đến thấp</button>
          <button className='border-2 py-1 px-3 font-semibold rounded-3'>Mới nhất</button>
          <button className='border-2 py-1 px-3 font-semibold rounded-3'>Khuyến mãi</button>
        </div>
        <div className='md:hidden w-full'>
          <select className='border-2 py-1 px-3 font-semibold rounded-3 w-full'>
            <option value='banchay'>Bán chạy nhất</option>
            <option value='giathap'>Giá thấp đến cao</option>
            <option value='giacao'>Giá cao đến thấp</option>
            <option value='moinhat'>Mới nhất</option>
            <option value='khuyenmai'>Khuyến mãi</option>
          </select>
        </div>
      </div>

      <div className='lg:mx-2 md:mx-1 sm:mx-0'>
        <ProductGrid selectedItemLabel={selectedItemLabel} />
      </div>
      <Post />
    </div>
  );
}

export default Product;