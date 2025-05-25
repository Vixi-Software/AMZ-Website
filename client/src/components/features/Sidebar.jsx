import { Divider } from "antd";
import images from '../../utils/images';
import { useNavigate } from "react-router-dom";
import routePath from "../../constants/routePath";

const mainItems = [
  {
    icon: <img src={images['item11.png']} alt="" width={30} height={30} />,
    label: "Tai nghe nhét tai cũ",
  },
  {
    icon: <img src={images['item10.png']} alt="" width={30} height={30} />,
    label: "Tai nghe chụp tai cũ",
  },
  {
    icon: <img src={images['item9.png']} alt="" width={30} height={30} />,
    label: "Loa di động cũ",
  },
  {
    icon: <img src={images['item8.png']} alt="" width={30} height={30} />,
    label: "Loa để bàn cũ",
  },
  {
    icon: <img src={images['item7.png']} alt="" width={30} height={30} />,
    label: "Loa karaoke cũ",
  },
  {
    icon: <img src={images['item6.png']} alt="" width={30} height={30} />,
    label: "Thu cũ đổi mới",
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
  const navigate = useNavigate();
  const handleItemClick = (label) => {
    localStorage.setItem('selectedSidebarLabel', label);
    navigate(routePath.product)
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-4 w-full max-w-xs transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div>
        <div className="font-semibold text-gray-700 mb-2 tracking-wide">
          Hàng cũ giá tốt - Sản phẩm chính
        </div>
        <ul className="space-y-2">
          {mainItems.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-[15px] text-gray-800 rounded px-2 py-1 cursor-pointer transition-all duration-200 group hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:scale-[1.03] hover:shadow-md"
              onClick={() => handleItemClick(item.label)}
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                {item.icon}
              </span>
              <span className="transition-colors duration-200 group-hover:text-blue-700 font-medium">
                {item.label}
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
  );
}