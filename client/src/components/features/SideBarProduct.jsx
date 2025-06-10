import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBrands, setPriceRanges, setNeeds, resetFilter } from '../../store/features/filterProduct/filterProductSlice';

function SideBarProduct({
  brands = [],
  priceRanges = [],
  needs = [],
}) {
  const dispatch = useDispatch();
  const { brands: selectedBrands, priceRanges: selectedPrices, needs: selectedNeeds } = useSelector(
    (state) => state.filterProduct
  );

  // Memo hóa brands để tránh render lại không cần thiết
  const memoBrands = useMemo(() => brands, [brands]);

  // Toggle logic
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
    dispatch(setPriceRanges([value]));
  };

  const handleNeedChange = (value) => {
    if (selectedNeeds.includes(value)) {
      dispatch(setNeeds(selectedNeeds.filter((v) => v !== value)));
    } else {
      dispatch(setNeeds([...selectedNeeds, value]));
    }
  };

  return (
    <div className=" bg-white rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      <div>
        <div className="font-semibold mb-2 text-orange-600 tracking-wide">Thương hiệu</div>
        <div className="grid grid-cols-2 gap-2">
          {memoBrands.map((brand) => (
            <div
              key={brand}
              onClick={() => handleBrandClick(brand)}
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

      <div className="mt-6">
        <div className="font-semibold mb-2 text-orange-600 tracking-wide">Khoảng giá</div>
        {priceRanges.map((range) => (
          <div key={range.label} className="mb-1">
            <label className="cursor-pointer flex items-center group transition-all duration-200">
              <input
                type="radio"
                name="price-range"
                checked={selectedPrices.some(
                  (v) => v[0] === range.value[0] && v[1] === range.value[1]
                )}
                onChange={() => handlePriceChange(range.value)}
                className="accent-orange-500 mr-2 scale-110 transition-transform duration-200 group-hover:scale-125"
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
      </div>

      <div className="mt-6">
        <div className="font-semibold mb-2 text-orange-600 tracking-wide">Nhu cầu sử dụng</div>
        {needs.map((need) => (
          <div key={need.value} className="mb-1">
            <label className="cursor-pointer flex items-center group transition-all duration-200">
              <input
                type="checkbox"
                checked={selectedNeeds.includes(need.value)}
                onChange={() => handleNeedChange(need.value)}
                className="accent-orange-500 mr-2 scale-110 transition-transform duration-200 group-hover:scale-125"
              />
              <span className={`transition-colors duration-200 ${selectedNeeds.includes(need.value) ? 'text-orange-500 font-semibold' : 'group-hover:text-orange-400'}`}>
                {need.label}
              </span>
            </label>
          </div>
        ))}
      </div>

       <button
          className="mt-4 w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded transition"
          onClick={handleReset}
        >
          Đặt lại bộ lọc
        </button>
    </div>
  );
}

export default SideBarProduct;