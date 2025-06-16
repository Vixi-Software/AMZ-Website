<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Checkbox, Divider, Typography, Radio } from 'antd';

const { Title } = Typography;

=======
import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBrands, setPriceRanges, setNeeds, resetFilter } from '../../store/features/filterProduct/filterProductSlice';
import { Grid } from 'antd';
>>>>>>> fix-admin
function SideBarProduct({

  brands = [],
  priceRanges = [],
  needs = [],
<<<<<<< HEAD
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
=======
  forceShow = false
}) {
  const screens = Grid.useBreakpoint()
  const dispatch = useDispatch();
  const { brands: selectedBrands, priceRanges: selectedPrices, needs: selectedNeeds } = useSelector(
    (state) => state.filterProduct
  );

  const memoBrands = useMemo(() => brands, [brands]);

  const handleBrandClick = (brand) => {
    if (selectedBrands.includes(brand)) {
      dispatch(setBrands(selectedBrands.filter((b) => b !== brand)));
    } else {
      dispatch(setBrands([...selectedBrands, brand]));
    }
  };

  const handleReset = () => {
    dispatch(resetFilter());
  };

  const handlePriceChange = (value) => {
    // Nếu đã chọn thì bỏ chọn, chưa chọn thì thêm vào
    const exists = selectedPrices.some(
      (v) => v[0] === value[0] && v[1] === value[1]
    );
    if (exists) {
      dispatch(setPriceRanges(selectedPrices.filter(
        (v) => !(v[0] === value[0] && v[1] === value[1])
      )));
    } else {
      dispatch(setPriceRanges([...selectedPrices, value]));
    }
  };

  const handleNeedChange = (value) => {
    if (selectedNeeds.includes(value)) {
      dispatch(setNeeds(selectedNeeds.filter((v) => v !== value)));
    } else {
      dispatch(setNeeds([...selectedNeeds, value]));
    }
  };

  useEffect(() => {
    // Cleanup khi component unmount
    return () => {
      dispatch(resetFilter());
    };
  }, [dispatch]);

  if (!screens.sm && !forceShow) return null;

  return (
    <div>
>>>>>>> fix-admin
      <div>
        <Title level={5} style={{ marginBottom: 8 }}>Thương hiệu</Title>
        <div className="grid grid-cols-2 gap-2">
          {memoBrands.map((brand) => (
            <div
              key={brand}
              onClick={() => handleBrandClick(brand)}
              className={`w-full h-8 rounded-md flex items-center justify-center cursor-pointer font-medium transition-all duration-200
                ${filter.brands.includes(brand)
                  ? 'border-2 border-orange-500 font-semibold bg-orange-50 scale-105 shadow-md'
                  : 'border border-gray-200 font-normal bg-white hover:bg-orange-100 hover:scale-105'}
              `}
            >
              <span
                className={`
                  transition-colors duration-200
                  font-bold
<<<<<<< HEAD
                  bg-gradient-to-r from-pink-500 via-yellow-400 to-orange-500
                  bg-clip-text text-transparent
                  drop-shadow-md
                  group-hover:from-orange-400 group-hover:to-pink-500
                  ${filter.brands.includes(brand) ? 'from-orange-500 to-pink-500' : ''}
=======
                  text-black
                  ${screens.md ? 'text-[10px]' : ''}
                  ${screens.lg ? '!text-[14px]' : ''}
>>>>>>> fix-admin
                `}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

<<<<<<< HEAD
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
=======
      <div className="mt-6">
        <div className="font-semibold mb-2 text-orange-600 tracking-wide">Khoảng giá</div>
        {priceRanges.map((range) => (
          <div key={range.label} className="mb-1">
            <label className="cursor-pointer flex items-center group transition-all duration-200">
              <input
                type="checkbox"
                checked={selectedPrices.some(
                  (v) => v[0] === range.value[0] && v[1] === range.value[1]
                )}
                onChange={() => handlePriceChange(range.value)}
                className="accent-orange-500 !mr-1.5 scale-110 transition-transform duration-200 group-hover:scale-125"
              />
              <span className={`transition-colors duration-200 ${
                selectedPrices.some(
                  (v) => v[0] === range.value[0] && v[1] === range.value[1]
                )
                  ? 'text-orange-500 font-semibold'
                  : 'group-hover:text-orange-400'
              }`}>
                {range.label}
              </span>
            </label>
          </div>
        ))}
        {/* Hiển thị khoảng giá tổng hợp nếu có chọn */}
        {/* {selectedPrices.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            Đã chọn: {(() => {
              const all = selectedPrices.flat();
              const min = Math.min(...all);
              const max = Math.max(...all);
              return `${min.toLocaleString()}₫ - ${max.toLocaleString()}₫`;
            })()}
          </div>
        )} */}
      </div>

      {/* <div className="mt-6">
        <div className="font-semibold mb-2 text-orange-600 tracking-wide">Nhu cầu sử dụng</div>
        {needs.map((need) => (
          <div key={need.value} className="mb-1">
            <label className="cursor-pointer flex items-center group transition-all duration-200">
              <input
                type="checkbox"
                checked={selectedNeeds.includes(need.value)}
                onChange={() => handleNeedChange(need.value)}
                className="accent-orange-500 !mr-1.5 scale-110 transition-transform duration-200 group-hover:scale-125"
              />
              <span className={`transition-colors duration-200 ${selectedNeeds.includes(need.value) ? 'text-orange-500 font-semibold' : 'group-hover:text-orange-400'}`}>
                {need.label}
              </span>
            </label>
          </div>
        ))}
      </div> */}

       <button
          className="mt-4 w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded transition"
          onClick={handleReset}
        >
          Đặt lại bộ lọc
        </button>
>>>>>>> fix-admin
    </div>
  );
}

export default SideBarProduct;
