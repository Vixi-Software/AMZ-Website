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
  const price = product.pricesBanLe;
  const oldPrice = product.oldPrice || '';
  const status = Array.isArray(product.statusSell) && product.statusSell.length > 0
  ? product.statusSell[0]
  : 'Newseal';
  console.log('ProductCard:', product);

  useEffect(() => {
    const checkScreen = () => setIsSmall(window.innerWidth < 640);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleCardClick = () => {
    console.log('Card clicked:', product);
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
    'Xanh lục': '#32CD32',
    'Xanh ngọc': '#00CED1',
    'Xanh navy': '#001F54',
    'Xanh rêu': '#556B2F',
    'Xanh pastel': '#A7FFEB',
    'Đỏ': '#FF0000',
    'Đỏ đô': '#8B0000',
    'Đỏ tươi': '#FF6347',
    'Hồng': '#FF69B4',
    'Hồng pastel': '#FFD1DC',
    'Tím': '#800080',
    'Tím pastel': '#D1B3FF',
    'Tím than': '#4B006E',
    'Xám': '#888',
    'Xám bạc': '#B0B0B0',
    'Xám lông chuột': '#A9A9A9',
    'Nâu': '#8B4513',
    'Nâu đất': '#A0522D',
    'Nâu nhạt': '#DEB887',
    'Bạc': '#C0C0C0',
    'Be': '#F5F5DC',
    'Vàng đồng': '#B8860B',
    'Vàng chanh': '#FFF700',
    'Vàng nhạt': '#FFFACD',
    'Cam đất': '#FF8C42',
    'Cam nhạt': '#FFDAB9',
    'Xanh mint': '#AAF0D1',
    'Xanh lam': '#4682B4',
    'Xanh biển': '#5F9EA0',
    'Xanh cốm': '#B2FF66',
    'Trắng ngà': '#FFFFF0',
    'Đen nhám': '#1A1A1A',
    'Đen bóng': '#333333',
    'Hồng nude': '#FADADD',
    'Hồng cam': '#FFB6B9',
    'Hồng đất': '#C08081',
    'Tím khói': '#B39EB5',
    'Xám xanh': '#7B8D8E',
    'Xám tro': '#BEBEBE',
    'Nâu đỏ': '#A0522D',
    'Nâu socola': '#381819',
    // ...bạn có thể bổ sung thêm nếu cần...
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
              {product.images && product.images.length > 0 ? (
                <img
                  alt={product.name}
                  src={product.images[0]} // Lấy ảnh đầu tiên
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
              {product.name}
            </div>
            <div className="font-bold text-base sm:text-[21px] text-[#D65312] leading-none">
              {salePrice > 0 ? (
                <>
                  {/* Giá đã giảm */}
                  {(price - (price * salePrice) / 100).toLocaleString('vi-VN')}
                  {/* Giá gốc bị gạch ngang */}
                  <span className="be-vietnam-pro-light text-xs sm:text-base text-[#aaa] ml-1 line-through">
                    {price.toLocaleString('vi-VN')}
                  </span>
                </>
              ) : (
                <>
                  {/* Giá bình thường */}
                  {price && price.toLocaleString('vi-VN')}
                  {/* Nếu có oldPrice thì hiển thị gạch ngang */}
                  {oldPrice && (
                    <span className="be-vietnam-pro-extrabold text-xs sm:text-[11px] text-[#aaa] ml-2 line-through">
                      {oldPrice.toLocaleString('vi-VN')}
                    </span>
                  )}
                </>
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
          <div className="flex flex-row items-center">
            {(Array.isArray(product.colors) ? product.colors : [product.colors]).filter(Boolean).map((color) => (
              <span
                key={color}
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
    </Card>
  );
}

export default ProductCard