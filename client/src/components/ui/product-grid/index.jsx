import React, { useState, useEffect, useMemo } from 'react'
import ProductCard from './ProductCard'
import { Flex, Space, Button } from 'antd'

function ProductGrid({ title, products = [], banners = [], extraButtons = [], viewAllButton }) {
  const [activeBtn, setActiveBtn] = useState(0);

  useEffect(() => {
    if (extraButtons[0]?.onClick) {
      extraButtons[0].onClick();
    }
  }, [extraButtons]);

  // Tối ưu hóa merge items bằng useMemo
  const mergedItems = useMemo(() => {
    const items = [];
    let productIdx = 0;
    for (let i = 0; i < products.length + banners.length; i++) {
      const banner = banners.find(b => b.bannerIndex === i);
      if (banner) {
        items.push({ ...banner, type: 'banner' });
      } else if (productIdx < products.length) {
        items.push({ ...products[productIdx], type: 'product' });
        productIdx++;
      }
    }
    return items;
  }, [products, banners]);

  return (
    <div className='bg-white p-5 rounded-lg'>
      <Flex justify="space-between" className="mb-4">
        <h2 className="text-2xl !font-bold mb-4">{title}</h2>
        <div className='button-group mb-4'>
          <Space>
            {/* Render buttons từ JSON */}
            {extraButtons.map((btn, idx) => (
              <Button
                className='!font-semibold !text-base'
                key={btn.key || idx}
                type={activeBtn === idx ? "primary" : (btn.type || "default")}
                size={btn.size || "large"}
                onClick={e => {
                  setActiveBtn(idx);
                  btn.onClick?.(e);
                }}
                style={activeBtn === idx ? { background: '#fa8c16', color: '#fff', borderColor: '#fa8c16' } : {}}
                {...btn.props}
              >
                {btn.label}
              </Button>
            ))}
          </Space>
        </div>
      </Flex>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mergedItems.map((item, idx) =>
          item.type === 'banner' ? (
            <div
              key={item.bannerIndex ?? `banner-${idx}`}
              className="col-span-1 md:col-span-2 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-91.5 transition-transform duration-300 hover:scale-105 shadow-[0_5px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] cursor-pointer"
            >
              <img
                src={item.bannerImg}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <ProductCard
              key={item.id}
              name={item.name}
              price={item.price}
              oldPrice={item.oldPrice}
              discount={item.discount}
              tag={item.tag}
              image={item.image}
              colors={item.colors}
              description={item.description}
            />
          )
        )}
      </div>
      <div className="flex justify-center mt-8">
        <Button
          type="default"
          size="large"
          className="border border-black bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-200 !font-semibold !text-base shadow-none"
          {...(typeof viewAllButton === 'function' && { onClick: viewAllButton })}
        >
          Xem tất cả
        </Button>
      </div>
    </div>
  )
}

export default ProductGrid