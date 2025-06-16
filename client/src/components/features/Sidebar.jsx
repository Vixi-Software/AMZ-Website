import { useMemo, useCallback } from "react";
import { Divider } from "antd";
import images from '../../utils/images';
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import routePath from "../../constants/routePath";

// Danh mục sản phẩm cố định với icon tương ứng
const fixedCategories = [
  { label: "Bộ sạc", icon: "item1.png" },
  { label: "C-Lightning", icon: "item2.png" },
  { label: "Dock sạc", icon: "item3.png" },
  { label: "Headphones", icon: "item4.png" },
  { label: "Loa di động", icon: "item5.png" },
  { label: "Loa để bàn", icon: "item6.png" },
  { label: "Phụ kiện khác", icon: "item7.png" },
  { label: "Tai nghe True Wireless", icon: "item8.png" },
  { label: "Tai nghe Wireless", icon: "item9.png" },
  { label: "Tai nghe cắm dây", icon: "item10.png" },
  { label: "USB - C", icon: "item11.png" },
  { label: "USB-Lightning", icon: "item1.png" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  // Memoize exploreItems
  const exploreItems = useMemo(() => [
    { icon: <img src={images['item5.png']} alt="" width={30} height={30} />, label: "Hàng newseal" },
    { icon: <img src={images['item4.png']} alt="" width={30} height={30} />, label: "Khuyến mãi hot" },
    { icon: <img src={images['item3.png']} alt="" width={30} height={30} />, label: "Bảo hành" },
    { icon: <img src={images['item2.png']} alt="" width={30} height={30} />, label: "Reviews" },
    { icon: <img src={images['item1.png']} alt="" width={30} height={30} />, label: "Sửa chữa" },
  ], []);

  // Memoize handleItemClick
  const handleItemClick = useCallback((label) => {
    localStorage.setItem('selectedSidebarLabel', label);
    navigate(routePath.product);
  }, [navigate]);

  return (
    <>
      {/* Sidebar desktop */}
      <div className="bg-white rounded-xl shadow-xl p-4 w-full max-w-xs transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hidden md:block">
        <div>
          <div className="font-semibold text-gray-700 mb-2 tracking-wide">
            Danh mục sản phẩm
          </div>
          <ul className="space-y-2">
            {fixedCategories.map((cat) => (
              <li
                key={cat.label}
                className="flex items-center gap-3 text-[15px] text-gray-800 rounded px-2 py-1 cursor-pointer transition-all duration-200 group hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:scale-[1.03] hover:shadow-md"
                onClick={() => handleItemClick(cat.label)}
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  <img src={images[cat.icon]} alt="" width={30} height={30} />
                </span>
                <span className="transition-colors duration-200 group-hover:text-blue-700 font-medium">
                  {cat.label}
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
        {fixedCategories.map((cat) => (
          <button
            key={cat.label}
            className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 transition"
            onClick={() => handleItemClick(cat.label)}
          >
            <span className="w-10 h-10 flex items-center justify-center">
              <img src={images[cat.icon]} alt="" width={30} height={30} />
            </span>
          </button>
        ))}
=======
import { useDispatch } from "react-redux";
import { setCategory } from "../../store/features/filterProduct/filterProductSlice";
import { useNavigate } from "react-router-dom";
import routePath from "../../constants/routePath";

const mainItems = [
  {
    icon: <img src={images['item11.png']} alt="" width={30} height={30} />,
    label: "Tai nghe nhét tai cũ",
    value: "Tai nghe nhét tai cũ",
  },
  {
    icon: <img src={images['item10.png']} alt="" width={30} height={30} />,
    label: "Tai nghe chụp tai cũ",
    value: "Tai nghe chụp tai cũ",
  },
  {
    icon: <img src={images['item9.png']} alt="" width={30} height={30} />,
    label: "Loa di động cũ",
    value: "Loa di động cũ",
  },
  {
    icon: <img src={images['item8.png']} alt="" width={30} height={30} />,
    label: "Loa để bàn cũ",
    value: "Loa để bàn cũ",
  },
  {
    icon: <img src={images['item7.png']} alt="" width={30} height={30} />,
    label: "Loa karaoke cũ",
    value: "Loa",
  },
  {
    icon: <img src={images['item6.png']} alt="" width={30} height={30} />,
    label: "Thu cũ đổi mới",
    value: "thu-cu-doi-moi",
  },
];

const exploreItems = [
  {
    icon: <img src={images['item5.png']} alt="" width={30} height={30} />,
    label: "Hàng newseal",
  },
  {
    icon: <img src={images['item4.png']} alt="" width={30} height={30} />,
    label: "Khuyến mãi hot",
  },
  {
    icon: <img src={images['item3.png']} alt="" width={30} height={30} />,
    label: "Bảo hành",
  },
  {
    icon: <img src={images['item2.png']} alt="" width={30} height={30} />,
    label: "Reviews",
  },
  {
    icon: <img src={images['item1.png']} alt="" width={30} height={30} />,
    label: "Sửa chữa",
  },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white rounded-lg shadow p-3 mb-4">
        <div className="font-semibold text-[13px] text-gray-700 mb-2 tracking-wide hidden md:block lg:hidden">
          Hàng cũ giá tốt
        </div>
        <div className="font-semibold text-[16px] text-gray-700 mb-2 tracking-wide hidden lg:block">
          Hàng cũ giá tốt - Sản phẩm chính
        </div>
        <div className="flex flex-col pb-4">
          <div className="flex flex-col gap-3">
            {mainItems.map((item, idx) => (
              <div
                key={idx}
                className="w-full flex items-center gap-3 text-[15px] text-gray-800 rounded py-1 cursor-pointer transition-all duration-200 group hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:scale-[1.03] hover:shadow-md"
                onClick={() => {
                  if (item.value === "thu-cu-doi-moi") {
                    navigate(routePath.exchange);
                  } else {
                    dispatch(setCategory(item.value));
                    navigate(routePath.product);
                  }
                }}
              >
                <span className="transition-transform duration-200 group-hover:scale-110 lg:pl-6 md:pl-0">
                  {item.icon}
                </span>
                <span className="transition-colors duration-200 group-hover:text-blue-700 font-semibold lg:text-[16px] md:text-[11px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-3">
        <div className="font-semibold text-[13px] text-gray-700 mb-2 tracking-wide hidden md:block lg:hidden">
          Khám phá thêm
        </div>
        <div className="font-semibold text-[16px] text-gray-700 mb-2 tracking-wide hidden lg:block">
          Khám phá thêm
        </div>
        <div className="flex flex-col pb-4">
          <div className="flex flex-col gap-3">
            {exploreItems.map((item, idx) => (
              <div
                key={idx}
                className="w-full flex items-center gap-3 text-[15px] text-gray-800 rounded py-1 cursor-pointer transition-all duration-200 group hover:bg-gradient-to-r hover:from-pink-100 hover:to-yellow-100 hover:scale-[1.03] hover:shadow-md"
                onClick={() => {
                  if (item.label === "Khuyến mãi hot") {
                    navigate(routePath.sale);
                  }
                }}
              >
                <span className="transition-transform duration-200 group-hover:scale-110 lg:pl-6 md:pl-0">
                  {item.icon}
                </span>
                <span className="transition-colors duration-200 group-hover:text-pink-700 font-semibold lg:text-[16px] md:text-[11px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
>>>>>>> fix-admin
      </div>
    </>
  );
}