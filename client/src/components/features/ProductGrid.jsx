import { useState } from 'react'
import { Row, Col, Button } from 'antd'
import ProductCard from './ProductCard'


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

function ProductGrid({ products, banners = [], title , buttons = [], activeCategory }) {
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
      {(title || (buttons && buttons.length > 0)) && (
        <div className='flex justify-between items-center mb-4'>
          {title && <h2 className="text-2xl font-bold mb-0">{title}</h2>}
          {(buttons && buttons.length > 0) && (
            <div className="flex gap-2">
              {buttons.map((btn, idx) => (
                <Button
                  key={idx}
                  type="default"
                  size={btn.size || "large"}
                  className={
                    "!font-semibold " +
                    (activeCategory === btn.category
                      ? "!bg-[#D65312] !text-white"
                      : "!bg-white !text-[#D65312] border-[#D65312]")
                  }
                  onClick={btn.onClick}
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
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