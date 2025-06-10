import React from 'react'
import { Card, Tag } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProduct } from '../../store/features/product/productSlice'
import routePath from '../../constants/routePath'

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const salePrice = product.salePrice;
  const price = product.Ban_Le;
  const oldPrice = product.oldPrice || '';
  const status = product.Product_condition || 'Newseal';

  // Hàm xử lý click card
  const handleCardClick = () => {
    dispatch(setProduct(product));
    console.log('Product clicked:', product);
    navigate(routePath.productDetail);
  };

  // Hàm xử lý click giá tham khảo
  const handleGiaThamKhaoClick = (e) => {
    e.stopPropagation();
    window.open('https://zalo.me/0333571236', '_blank');
  };

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      className="w-full mb-4 !rounded-2xl flex flex-col flex-1 h-full overflow-hidden"
      bodyStyle={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}
      style={{
        boxShadow: '0 0 5px 2px rgba(0,0,0,0.35)',
      }}
      cover={
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Hàng chứa các tag */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 12px 0',
            background: '#fff',
            zIndex: 2,
          }}>
            {salePrice > 0 && (
              <Tag
                color="#FFE8D3"
                style={{
                  fontWeight: 700,
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontSize: 12,
                  margin: 0,
                  border: 0,
                  color: '#D65312',
                }}
              >
                Giảm {salePrice}%
              </Tag>
            )}
            <Tag
              color="#ffffff"
              style={{
                color: '#D65312',
                border: '1px solid #FF9231',
                fontWeight: 500,
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 12,
                margin: 0
              }}
            >
              {status}
            </Tag>
          </div>

          <div style={{ paddingTop: 12 }}>
            {product.image && product.image.length > 0 ? (
              <img
                alt={product.name}
                src={product.image[0]}
                style={{
                  height: 260,
                  objectFit: 'cover',
                  width: '100%',
                  borderRadius: '0 0 0 0'
                }}
              />
            ) : (
              <div style={{
                height: 280,
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Ảnh chưa được cập nhật
              </div>
            )}
          </div>
        </div>
      }
    >
      <div className='flex justify-between'>
        <div>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          {
            (() => {
              const parts = product.name.split(' - ');
              // Lấy phần 1 và phần 3 nếu có, nối lại bằng " - "
              return [parts[0], parts[2]].filter(Boolean).join(' - ');
            })()
          }
        </div>
        <div className="font-bold text-[21px] text-[#D65312] leading-none">
          {price && price.toLocaleString('vi-VN')}
          {salePrice <= 0 && oldPrice && (
            <span className="font-normal text-[12px] text-[#aaa] ml-2 line-through">
              {oldPrice.toLocaleString('vi-VN')}
            </span>
          )}
          {salePrice > 0 && (
            <span className="font-normal text-base text-[#aaa] ml-2 line-through">
              {price && price.toLocaleString('vi-VN')}
            </span>
          )}
        </div>
        <div
          className="text-[#888] text-sm mt-0.5 cursor-pointer no-underline"
          onClick={handleGiaThamKhaoClick}
        >
          Giá tham khảo. Chi tiết xin liên hệ zalo
        </div>
        </div>
        {/* dotcolor */}
        <div className='flex flex-col'>
          <div className="flex gap-1 mt-2">
            {(product.color || []).map((color, idx) => {
              const colorMap = {
                'Trắng': '#fff',
                'Đen': '#222',
                'Cam': '#FFA500',
                'Vàng': '#FFD700',
                'Xanh': '#1E90FF',
                'Xanh dương': '#1E90FF',
                'Xanh lá': '#32CD32',
                'Xanh lá cây': '#32CD32',
                'Xanh rêu': '#556B2F',
                'Xanh ngọc': '#00CED1',
                'Xanh navy': '#000080',
                'Xanh da trời': '#87CEEB',
                'Xanh lam': '#4682B4',
                'Đỏ': '#FF0000',
                'Đỏ đô': '#8B0000',
                'Đỏ tươi': '#FF6347',
                'Hồng': '#FF69B4',
                'Hồng pastel': '#FFD1DC',
                'Tím': '#800080',
                'Tím nhạt': '#D8BFD8',
                'Tím than': '#4B0082',
                'Xám': '#888',
                'Xám nhạt': '#D3D3D3',
                'Nâu': '#8B4513',
                'Nâu nhạt': '#DEB887',
                'Bạc': '#C0C0C0',
                'Vàng đồng': '#B8860B',
                'Vàng chanh': '#FFF700',
                'Be': '#F5F5DC',
                'Kem': '#FFFDD0',
                'Ghi': '#B0B0B0',
                'Xanh mint': '#AAF0D1',
                'Cam đất': '#E97451',
                'Cam nhạt': '#FFDAB9',
                'Xanh cốm': '#7FFF00',
                'Xanh lục bảo': '#50C878',
                'Vàng nghệ': '#FFC30B',
                'Vàng nhạt': '#FFFACD',
                'Trắng sữa': '#F8F8FF',
                'Đen nhám': '#111',
                'Đen bóng': '#333',
              };
              return (
                <span
                  key={idx}
                  title={color}
                  style={{
                    display: 'inline-block',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: colorMap[color] || '#ccc',
                    border: '1px solid #ddd',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard