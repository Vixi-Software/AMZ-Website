import React, { useEffect, useState } from 'react'
import { Card, Tag, Grid, Row, Col } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProduct } from '../../store/features/product/productSlice'
import { setLoading } from '../../store/features/loading/loadingSlice'
import routePath from '../../constants/routePath'

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSmall, setIsSmall] = useState(false);

  const salePrice = product.salePrice;
  const price = product.Ban_Le;
  const oldPrice = product.oldPrice || '';
  const status = product.Product_condition || 'Newseal';

  useEffect(() => {
    const checkScreen = () => setIsSmall(window.innerWidth < 640);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleCardClick = () => {
    dispatch(setProduct({ ...product })); // clone object để luôn trigger update
    dispatch(setLoading(true));
    navigate(routePath.productDetail);
  };

  const handleGiaThamKhaoClick = (e) => {
    e.stopPropagation();
    window.open('https://zalo.me/0333571236', '_blank');
  };

  const colorMap = {
    'Trắng': '#fff',
    'Đen': '#222',
    'Cam': '#FFA500',
    'Vàng': '#FFD700',
    'Xanh': '#1E90FF',
    'Xanh dương': '#1E90FF',
    'Xanh lá': '#32CD32',
    'Đỏ': '#FF0000',
    'Hồng': '#FF69B4',
    'Tím': '#800080',
    'Xám': '#888',
    'Nâu': '#8B4513',
    'Bạc': '#C0C0C0',
    'Be': '#F5F5DC',
  };

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      className="w-full mb-4 !rounded-2xl flex flex-col flex-1 h-full overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
      styles={{
        body: {
          padding: isSmall ? 4 : '25px 10px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: '100%'
        }
      }}
      style={{
        boxShadow: '0 0 5px 2px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1)',
      }}
      cover={
        <Row className="h-[240px] bg-white">
          <Col span={24}>
            <div className="flex justify-between pt-3 px-3 bg-white z-2">
              <div>
                {salePrice > 0 && (
                  <Tag
                    color="#FFE8D3"
                    className="font-bold rounded-lg"
                    style={{
                      borderRadius: '10px',
                      padding: isSmall ? '2px 4px' : '4px 10px',
                      color: '#D65312',
                      fontSize: isSmall ? 10 : 14 // 5px cho sm, 14px cho lớn hơn
                    }}
                  >
                    Giảm {salePrice}%
                  </Tag>
                )}
              </div>
              <div>
                <Tag
                  color="#ffffff"
                  className="font-medium rounded-lg py-1 px-2 border"
                  style={{
                    color: '#D65312',
                    padding: isSmall ? '2px 4px' : '4px 10px',
                    borderRadius: '10px',
                    borderColor: '#FF9231',
                    fontSize: isSmall ? 10 : 14
                  }}
                >
                  {status}
                </Tag>
              </div>
            </div>
            <div className="pt-3 h-[200px] flex items-center justify-center">
              {product.image && product.image.length > 0 ? (
                <img
                  alt={product.name}
                  src={product.image[0]}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="min-h-[180px] flex items-center justify-center">
                  Ảnh chưa được cập nhật
                </div>
              )}
            </div>
          </Col>
        </Row>
      }
    >
      <div className="flex flex-col justify-end h-full flex-1">
        <div className="flex justify-between gap-1">
          {/* phần trái */}
          <div>
            <div className="be-vietnam-pro-medium text-sm sm:text-[16px] mb-1 flex items-center gap-2">
              {(() => {
                const parts = product.name.split(' - ');
                return [parts[2]].filter(Boolean).join(' - ');
              })()}
            </div>
            <div className="font-bold text-base sm:text-[21px] text-[#D65312] leading-none">
              {price && price.toLocaleString('vi-VN')}
              {salePrice <= 0 && oldPrice && (
                <span className="be-vietnam-pro-extrabold text-xs sm:text-[11px] text-[#aaa] ml-2 line-through">
                  {oldPrice.toLocaleString('vi-VN')}
                </span>
              )}
              {salePrice > 0 && (
                <span className="be-vietnam-pro-light text-xs sm:text-base text-[#aaa] ml-0.5 line-through">
                  {price && price.toLocaleString('vi-VN')}
                </span>
              )}
            </div>
            <div
              className="text-[#888] text-sm mt-1 cursor-pointer no-underline"
              onClick={handleGiaThamKhaoClick}
            >
              Giá tham khảo. Chi tiết xin liên hệ zalo
            </div>
          </div>
          {/* phần phải */}
          <div className="flex flex-col">
            <div className="flex gap-1">
              {(product.color || []).map((color, idx) => (
                <span
                  key={idx}
                  title={color}
                  className="inline-block w-4 h-4 rounded-full border border-[#ddd]"
                  style={{
                    background: colorMap[color] || '#ccc',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard