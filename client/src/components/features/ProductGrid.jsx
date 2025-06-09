import React from 'react'
import { Row, Col, Card, Tag } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProduct } from '../../store/features/product/productSlice' // Đường dẫn có thể cần chỉnh lại
import routePath from '../../constants/routePath'

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const salePrice = product.salePrice;
  const price = product.Ban_Le;
  const oldPrice = product.oldPrice || '';
  const status = product.Product_condition || 'Newseal';

  console.log('ProductCard', product);

  // Hàm xử lý click card
  const handleCardClick = () => {
    dispatch(setProduct(product)); 
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
      className="w-full mb-4 !rounded-2xl shadow-lg flex flex-col flex-1 h-full overflow-hidden"
      bodyStyle={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}
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
                color="#ff9c5a"
                style={{
                  fontWeight: 600,
                  borderRadius: 6,
                  padding: '2px 12px',
                  fontSize: 14,
                  margin: 0
                }}
              >
                Giảm {salePrice}%
              </Tag>
            )}
            <Tag
              color="#fff7e6"
              style={{
                color: '#ff9c5a',
                border: '1px solid #ff9c5a',
                fontWeight: 500,
                borderRadius: 6,
                padding: '2px 12px',
                fontSize: 14,
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
                  height: 280,
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
      <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
        {
          (() => {
            const parts = product.name.split(' - ');
            // Lấy phần 1 và phần 3 nếu có, nối lại bằng " - "
            return [parts[0], parts[2]].filter(Boolean).join(' - ');
          })()
        }
      </div>
      <div className="font-bold text-[26px] text-[#ff7a00] leading-none">
        {price && price.toLocaleString('vi-VN')}
        {salePrice <= 0 && oldPrice && (
          <span className="font-normal text-base text-[#aaa] ml-2 line-through">
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
    </Card>
  );
}

function BannerCol({ image }) {
  return (
    <Col xs={24} sm={24} md={24} lg={16} className="flex h-full">
      <img src={image} alt="Banner" className="w-full h-[446px] object-cover rounded-xl" />
    </Col>
  );
}

function ProductGrid({ products, banners = [] }) {
  // banners: [{ index: 2, image: 'link' }, ...]
  const items = [];
  let productIdx = 0;

  for (let i = 0; i < products.length + banners.length; i++) {
    const banner = banners.find(b => b.index === i);
    if (banner) {
      items.push(
        <BannerCol key={`banner-${i}`} image={banner.image} />
      );
    } else if (productIdx < products.length) {
      items.push(
        <Col key={products[productIdx].id} xs={24} sm={12} md={12} lg={8} style={{ display: 'flex' }}>
          <ProductCard product={products[productIdx]} />
        </Col>
      );
      productIdx++;
    }
  }

  return (
    <Row gutter={[16, 16]} align="stretch" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {items}
    </Row>
  );
}

export default ProductGrid