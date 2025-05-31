import { useEffect, useState, useMemo, useCallback } from "react";
import { Divider } from "antd";
import images from '../../utils/images';
import { useNavigate } from "react-router-dom";
import routePath from "../../constants/routePath";
import { getCategoriesFromFirebase } from "../../utils/database";

// Memoize iconList để tránh tạo lại mỗi lần render
const iconListData = [
  'item1.png', 'item2.png', 'item3.png', 'item4.png', 'item5.png', 'item6.png',
  'item7.png', 'item8.png', 'item9.png', 'item10.png', 'item11.png'
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Memoize iconList
  const iconList = useMemo(
    () => iconListData.map(name => <img src={images[name]} alt="" width={30} height={30} />),
    [images]
  );

  // Memoize exploreItems
  const exploreItems = useMemo(() => [
    { icon: <img src={images['item5.png']} alt="" width={30} height={30} />, label: "Hàng newseal" },
    { icon: <img src={images['item4.png']} alt="" width={30} height={30} />, label: "Khuyến mãi hot" },
    { icon: <img src={images['item3.png']} alt="" width={30} height={30} />, label: "Bảo hành" },
    { icon: <img src={images['item2.png']} alt="" width={30} height={30} />, label: "Reviews" },
    { icon: <img src={images['item1.png']} alt="" width={30} height={30} />, label: "Sửa chữa" },
  ], [images]);

  useEffect(() => {
    getCategoriesFromFirebase().then(setCategories);
  }, []);

  // Memoize handleItemClick
  const handleItemClick = useCallback((label) => {
    localStorage.setItem('selectedSidebarLabel', label);
    navigate(routePath.product);
  }, [navigate]);

  // Memoize getRandomIcon
  const getRandomIcon = useCallback(() => {
    const idx = Math.floor(Math.random() * iconList.length);
    return iconList[idx];
  }, [iconList]);

  return (
    <>
      {/* Sidebar desktop */}
      <div className="bg-white rounded-xl shadow-xl p-4 w-full max-w-xs transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hidden md:block">
        <div>
          <div className="font-semibold text-gray-700 mb-2 tracking-wide">
            Danh mục sản phẩm
          </div>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat}
                className="flex items-center gap-3 text-[15px] text-gray-800 rounded px-2 py-1 cursor-pointer transition-all duration-200 group hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:scale-[1.03] hover:shadow-md"
                onClick={() => handleItemClick(cat)}
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {getRandomIcon()}
                </span>
                <span className="transition-colors duration-200 group-hover:text-blue-700 font-medium">
                  {cat}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Divider className="my-3" />
        <div>
          <div className="font-semibold text-gray-700 mb-2 tracking-wide">Khám phá thêm</div>
          <ul className="space-y-2">
            {exploreItems.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-[15px] text-gray-800 rounded px-2 py-1 cursor-pointer transition-all duration-200 group hover:bg-gradient-to-r hover:from-pink-100 hover:to-yellow-100 hover:scale-[1.03] hover:shadow-md"
                onClick={() => handleItemClick(item.label)}
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="transition-colors duration-200 group-hover:text-pink-700 font-medium">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sidebar mobile: chỉ icon dạng grid 3 cột */}
      <div className="md:hidden grid grid-cols-6 gap-4 bg-white rounded-xl shadow-xl p-2 w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 transition"
            onClick={() => handleItemClick(cat)}
          >
            <span className="w-10 h-10 flex items-center justify-center">{getRandomIcon()}</span>
          </button>
        ))}
      </div>
    </>
  );
}