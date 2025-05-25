import { Divider } from "antd";
import images from '../../utils/images';


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
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-xs">
      <div>
        <div className="font-semibold text-gray-700 mb-2">
          Hàng cũ giá tốt - Sản phẩm chính
        </div>
        <ul className="space-y-2">
          {mainItems.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-[15px] text-gray-800 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer transition">
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <Divider className="my-3" />
      <div>
        <div className="font-semibold text-gray-700 mb-2">Khám phá thêm</div>
        <ul className="space-y-2">
          {exploreItems.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-[15px] text-gray-800 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer transition">
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}