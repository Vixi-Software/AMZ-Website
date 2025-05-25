import React from 'react'
import { Button } from 'antd'

function BannerCustom() {
  return (
    <div className="relative bg-orange-400 rounded-xl overflow-hidden flex items-center p-8 min-h-[260px] md:min-h-[350px] lg:min-h-[550px] group">
      {/* Ảnh nền */}
      <img
        src="https://www.gadgetsinnepal.com.np/wp-content/uploads/2022/12/New-Project-90.jpg"
        alt="Tai nghe"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
        style={{ zIndex: 1 }}
      />
      {/* Overlay mờ */}
      <div className="absolute inset-0 bg-black/40 z-5 pointer-events-none"></div>
      {/* Nội dung */}
      <div className="flex-1 flex flex-col justify-center items-start ml-0 z-10 animate-fade-in">
        <div className="w-full flex flex-col gap-4">
          {/* Hàng 1: Chữ bên phải */}
          <div className="flex w-full">
            <div className="ml-auto text-white text-right">
              <h2 className="!font-extrabold text-6xl leading-tight mb-0" style={{ fontFamily: 'inherit' }}>
                <span className="block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 cursor-pointer">LOA</span>
                <span className="block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 cursor-pointer">TAI NGHE</span>
                <span className="block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 cursor-pointer">HÀNG CŨ</span>
                <span className="block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 cursor-pointer">GIÁ TỐT</span>
              </h2>
            </div>
          </div>
          {/* Hàng 2: Nút và mô tả bên trái */}
          <div className="w-full">
            <Button
              type="primary"
              size='large'
              className="!bg-orange-400 border-none text-base !font-semibold rounded-full px-6 py-2 hover:bg-orange-500 transition-all duration-300 shadow-lg whitespace-nowrap btn-shake !mb-2"
            >
              Đổi mới ngay
            </Button>
            <p className="text-sm text-white/80 mt-0 max-w-md">
              AMZ TECH – chuyên cung cấp loa và tai nghe đã qua sử dụng với chất lượng được tuyển chọn kỹ càng. Chúng tôi cam kết mang đến trải nghiệm âm thanh tuyệt vời với mức giá hợp lý nhất.
            </p>
          </div>
        </div>
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeInUp 1s ease;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  )
}

export default BannerCustom