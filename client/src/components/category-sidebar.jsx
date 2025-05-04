import { ShoppingBag, Headphones, Monitor, Smartphone, Music, Package, Star, Tag, Award, Shield, Settings2Icon } from "lucide-react";

const categoryData = [
  {
    icon: ShoppingBag,
    color: "bg-orange-500",
    label: "Tai nghe nhét tai cũ"
  },
  {
    icon: Package,
    color: "bg-red-500",
    label: "Tai nghe chụp tai cũ"
  },
  {
    icon: Smartphone,
    color: "bg-blue-500",
    label: "Loa di động cũ"
  },
  {
    icon: Monitor,
    color: "bg-green-500",
    label: "Loa để bàn cũ"
  },
  {
    icon: Headphones,
    color: "bg-purple-500",
    label: "Loa karaoke cũ"
  },
  {
    icon: Music,
    color: "bg-yellow-500",
    label: "Thu cũ đổi mới"
  }
];

const exploreMoreData = [
  {
    icon: Star,
    color: "bg-yellow-400",
    label: "Hàng newseal"
  },
  {
    icon: Tag,
    color: "bg-red-400",
    label: "Khuyến mãi hot"
  },
  {
    icon: Award,
    color: "bg-blue-400",
    label: "Bảo hành"
  },
  {
    icon: Shield,
    color: "bg-green-400",
    label: "Reviews"
  },
  {
    icon: Settings2Icon,
    color: "bg-green-400",
    label: "Sửa chữa"
  }
];
export default function CategorySidebar() {
  return (
    <div className="bg-white rounded-lg lg:p-4 md:p-2 sticky top-4">
      <p className="font-medium mb-1 text-base md:text-sm lg:text-base">Hàng cũ giá tốt - Sản phẩm chính</p>

      <div className="space-y-4 md:space-y-3 md:pl-1 pl-2">
        {categoryData.map((item, index) => (
          <div key={index} className="flex items-center gap-2 hover:bg-gray-50 lg:p-2 md:pb-1 m-0 rounded transition-colors cursor-pointer">
            <div className={`w-[30px] h-[30px] rounded-full ${item.color} flex items-center justify-center text-white`}>
              <item.icon className="w-4 h-4" />
            </div>
            <span className="font-semibold text-base lg:text-base md:text-xs">{item.label}</span>
          </div>
        ))}
      </div>

      <hr className="my-2 md:my-1" />

      <p className="font-medium text-base md:text-sm mb-1 lg:text-base">Khám phá thêm</p>
      <div className="space-y-3 md:space-y-2 md:pl-1 pl-2">
        {exploreMoreData.map((item, index) => (
          <div key={index} className="flex items-center gap-3 hover:bg-gray-50 lg:p-2 md:pb-1 m-0 rounded transition-colors cursor-pointer">
            <div className={`w-[30px] h-[30px] rounded-full ${item.color} flex items-center justify-center text-white`}>
              <item.icon className="w-4 h-4" />
            </div>
            <span className="font-semibold text-base lg:text-base md:text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}