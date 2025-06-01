import React, { useState, useEffect } from 'react';
import { Checkbox, Divider, Typography, Radio } from 'antd';

const { Title } = Typography;

function SideBarProduct({
  brands = [],
  priceRanges = [],
  needs = [],
}) {
  // Lấy brands đã lưu từ localStorage khi load component
  const [filter, setFilter] = useState(() => {
    const savedBrands = localStorage.getItem('selectedBrands');
    const savedPrices = localStorage.getItem('selectedPrices');
    return {
      brands: savedBrands ? JSON.parse(savedBrands) : [],
      prices: savedPrices ? JSON.parse(savedPrices) : '',
    };
  });

  // Hàm chuyển đổi value sang số/mảng số
  function priceValueToNumber(value) {
    switch (value) {
      case 'duoi1tr':
        return [0, 1000000];
      case '1-2tr':
        return [1000000, 2000000];
      case '2-3tr':
        return [2000000, 3000000];
      case '3-5tr':
        return [3000000, 5000000];
      case 'tren5tr':
        return [5000000, Infinity];
      default:
        return value;
    }
  }
  const [selectedNeeds, setSelectedNeeds] = useState([]);

  // Cập nhật localStorage và dispatch event khi filter thay đổi
  useEffect(() => {
    localStorage.setItem('selectedBrands', JSON.stringify(filter.brands));
    localStorage.setItem('selectedPrices', JSON.stringify(filter.prices));
    const convertedPrices = filter.prices ? priceValueToNumber(filter.prices) : null;
    const event = new CustomEvent('filterChange', { 
      detail: { brands: filter.brands, prices: convertedPrices }
    });
    window.dispatchEvent(event);
  }, [filter]);

  // Handler chọn brand (chỉ chọn 1 brand duy nhất)
  const handleBrandClick = (brand) => {
    setFilter((prev) => ({
      ...prev,
      brands: prev.brands[0] === brand ? [] : [brand]
    }));
  };
  const handlePriceChange = (value) => {
    setFilter((prev) => ({
      ...prev,
      prices: value
    }));
  };
  const handleNeedChange = (values) => {
    setSelectedNeeds(values);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      <div>
        <Title level={5} style={{ marginBottom: 8 }}>Thương hiệu</Title>
        <div className="grid grid-cols-2 gap-2">
          {brands.map((brand) => (
            <div
              key={brand}
              onClick={() => handleBrandClick(brand)}
              className={`w-full h-8 rounded-md flex items-center justify-center cursor-pointer font-medium transition-all duration-200
                ${filter.brands.includes(brand)
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
                  ${filter.brands.includes(brand) ? 'from-orange-500 to-pink-500' : ''}
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
        <Radio.Group
          value={filter.prices}
          onChange={e => handlePriceChange(e.target.value)}
          style={{ width: '100%' }}
        >
          {priceRanges.map((range) => (
            <div key={range.value} className="mb-1">
              <Radio value={range.value}>{range.label}</Radio>
            </div>
          ))}
        </Radio.Group>
      </div>
      

      <Divider />

      <div>
        <Title level={5} style={{ marginBottom: 8 }}>Nhu cầu sử dụng (X)</Title>
        <Checkbox.Group
          value={selectedNeeds}
          onChange={handleNeedChange}
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
