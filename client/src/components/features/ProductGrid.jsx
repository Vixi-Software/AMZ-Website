import React, { useState } from 'react'
import { Row, Col, Card, Tag, Button } from 'antd'
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
    </Card>
  );
}

function BannerCol({ image }) {
  return (
    <Col xs={24} sm={24} md={24} lg={16}>
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <img
          src={image}
          alt="Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
      </div>
    </Col>
  );
}

function ProductGrid({ products, banners = [], title = <span>Sản phẩm mới</span>, buttons = [] }) {
  // banners: [{ index: 2, image: 'link' }, ...]
  const [showAll, setShowAll] = useState(false);
  const initialCount = 8;
  const visibleProducts = showAll ? products : products.slice(0, initialCount);

  const items = [];
  let productIdx = 0;

  for (let i = 0; i < visibleProducts.length + banners.length; i++) {
    const banner = banners.find(b => b.index === i);
    if (banner) {
      items.push(
        <BannerCol key={`banner-${i}`} image={banner.image} />
      );
    } else if (productIdx < visibleProducts.length) {
      items.push(
        <Col key={visibleProducts[productIdx].id} xs={24} sm={12} md={12} lg={8} style={{ display: 'flex' }}>
          <ProductCard product={visibleProducts[productIdx]} />
        </Col>
      );
      productIdx++;
    }
  }

  return (
    <div className='p-5 bg-white rounded-lg shadow-md'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-2xl font-bold mb-0">{title}</h2>
        <div className="flex gap-2">
          {buttons.length > 0 ? (
            buttons.map((btn, idx) => (
              <Button
                key={idx}
                type={btn.type || "default"}
                size={btn.size || "large"}
                className={btn.className}
                onClick={btn.onClick}
              >
                {btn.label}
              </Button>
            ))
          ) : (
            <>
              <Button type="primary" size='large' className='!font-semibold !bg-[#D65312]'>Top tai nghe</Button>
              <Button size='large' className='!font-semibold'>Top loa</Button>
            </>
          )}
        </div>
      </div>
      <Row gutter={[16, 16]} align="stretch" style={{ display: 'flex', flexWrap: 'wrap', borderRadius: '8px' }}>
        {items}
        {!showAll && products.length > initialCount && (
          <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <Button type="default" size="large" onClick={() => setShowAll(true)}>
              Xem tất cả
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default ProductGrid