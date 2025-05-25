import React from 'react';
import { Checkbox, Divider, Typography } from 'antd';

const { Title } = Typography;

function SideBarProduct({
  brands = [],
  priceRanges = [],
  needs = [],
  selectedBrands = [],
  selectedPrices = [],
  selectedNeeds = [],
  onBrandChange,
  onPriceChange,
  onNeedChange,
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      <div>
        <Title level={5} style={{ marginBottom: 8 }}>Thương hiệu</Title>
        <div className="grid grid-cols-2 gap-2">
          {brands.map((brand) => (
            <div
              key={brand}
              onClick={() => onBrandChange && onBrandChange(brand)}
              className={`w-full h-8 rounded-md flex items-center justify-center cursor-pointer font-medium transition-all duration-200
                ${selectedBrands.includes(brand)
                  ? 'border-2 border-orange-500 font-semibold bg-orange-50 scale-105 shadow-md'
                  : 'border border-gray-200 font-normal bg-gray-100 hover:bg-orange-100 hover:scale-105'}
              `}
            >
              <span
                className={`
                  transition-colors duration-200
                  font-bold
                  bg-gradient-to-r from-pink-500 via-yellow-400 to-orange-500
                  bg-clip-text text-transparent
                  drop-shadow-md
                  group-hover:from-orange-400 group-hover:to-pink-500
                  ${selectedBrands.includes(brand) ? 'from-orange-500 to-pink-500' : ''}
                `}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div>
        <Title level={5} style={{ marginBottom: 8 }}>Khoảng giá</Title>
        <Checkbox.Group
          value={selectedPrices}
          onChange={onPriceChange}
          style={{ width: '100%' }}
        >
          {priceRanges.map((range) => (
            <div key={range.value} className="mb-1">
              <Checkbox value={range.value}>{range.label}</Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      </div>

      <Divider />

      <div>
        <Title level={5} style={{ marginBottom: 8 }}>Nhu cầu sử dụng</Title>
        <Checkbox.Group
          value={selectedNeeds}
          onChange={onNeedChange}
          style={{ width: '100%' }}
        >
          {needs.map((need) => (
            <div key={need.value} className="mb-1">
              <Checkbox value={need.value}>{need.label}</Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      </div>
    </div>
  );
}

export default SideBarProduct;