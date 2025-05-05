export default function CountdownBanner() {
  const data = {
    countdown: {
      title: "Kết thúc sau:",
      time: "7 ngày : 12 giờ : 35 phút"
    },
    description: {
      text: "AMZ TECH - chuyên cung cấp loa và tai nghe đã qua sử dụng với chất lượng được tuyển chọn kỹ càng. Chúng tôi cam kết mang đến trải nghiệm âm thanh tuyệt vời với mức giá hợp lý nhất. Bên cạnh đó AMZ TECH còn mang tới dịch vụ thu cũ đổi mới, giúp bạn tiếp cận sản phẩm yêu thích một cách dễ dàng hơn"
    }
  };

  return (
    <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden mt-4 mb-6 gap-3">
      <div className="bg-[#FFE8D3] p-4 lg:p-6 text-center lg:text-left lg:w-1/3 rounded-lg">
        <div className="text-orange-600 font-medium mb-2">{data.countdown.title}</div>
        <div className="text-xl lg:text-2xl font-bold text-orange-600">{data.countdown.time}</div>
      </div>
      <div className="p-0 lg:w-2/3 rounded-lg flex justify-center items-center bg-white">
        <div className="text-sm text-gray-700 leading-relaxed text-center font-semibold lg:text-base lg:leading-6 px-4">
          <p className="m-0 lg:text-base">
            {data.description.text}
          </p>
        </div>
      </div>
    </div>
  )
}