import React from 'react'
<<<<<<< HEAD
import { Button } from 'antd'

function BannerCustom() {
  return (
    <div className="relative bg-orange-400 rounded-xl overflow-hidden flex items-center p-8 min-h-[260px] md:min-h-[350px] lg:min-h-[550px] group">
      {/* Ảnh nền */}
      <img
        src="https://www.gadgetsinnepal.com.np/wp-content/uploads/2022/12/New-Project-90.jpg"
=======
import { Button, Grid } from 'antd' // Thêm Grid
import bannerCutom from '../../assets/bannercustom1.png'
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/features/filterProduct/filterProductSlice";
import { useNavigate } from "react-router-dom";
import routePath from "../../constants/routePath";

const { useBreakpoint } = Grid;

function BannerCustom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const home = useSelector(state => state.settings.home);

  // const isMobile = screens.xs;
  // const isTablet = screens.md;
  const isDesktop = screens.lg;


  return (
    <div
      className="relative bg-orange-400 rounded-xl overflow-hidden flex items-center p-8 min-h-[260px] md:min-h-[350px] lg:min-h-[550px] group"
      style={isDesktop ? { height: 549 } : {}}
    >
      <img
        src={home.banner1 || bannerCutom}
>>>>>>> fix-admin
        alt="Tai nghe"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
        style={{ zIndex: 1 }}
      />
<<<<<<< HEAD
      {/* Overlay mờ */}
      <div className="absolute inset-0 bg-black/40 z-5 pointer-events-none"></div>
      {/* Nội dung */}
      <div className="flex-1 flex flex-col justify-center items-start ml-0 z-10 animate-fade-in">
        <div className="w-full flex flex-col gap-4">
          {/* Hàng 1: Chữ bên phải */}
          <div className="flex w-full">
            <div className="ml-auto text-white text-right">
              <h2 className="!font-extrabold text-6xl leading-tight mb-0" style={{ fontFamily: 'inherit' }}>
=======
      <div className="flex-1 flex flex-col justify-center items-start ml-0 z-10 animate-fade-in">
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full">
            <div className="ml-auto text-white text-right">
              <h2
                className="!font-extrabold text-xl lg:!text-6xl md:!text-3xl sm:!text-xl leading-tight mb-0"
                style={{ fontFamily: 'inherit' }}
              >
>>>>>>> fix-admin
                <span className="block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 cursor-pointer">LOA</span>
                <span className="block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 cursor-pointer">TAI NGHE</span>
                <span className="block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 cursor-pointer">HÀNG CŨ</span>
                <span className="block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 cursor-pointer">GIÁ TỐT</span>
              </h2>
            </div>
          </div>
<<<<<<< HEAD
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
=======
          <div className="w-full">
            <Button
              type="primary"
              size="large"
              className="!bg-[#FFE8D3] border-none !text-[#D65312] !font-semibold rounded-full px-6 py-2 hover:bg-orange-500 transition-all duration-300 shadow-lg whitespace-nowrap btn-shake !mb-2
    lg:!text-[21px] md:!text-[18px] sm:!text-[16px] 
    lg:px-[10px] sm:px-4 sm:py-1"
              onClick={() => {
                dispatch(setCategory(""));
                navigate(routePath.product);
              }}
            >
              Xem tất cả
            </Button>
            <div className="text-base text-white/80 mt-0 max-w-md font-normal md:text-base sm:text-[8px]">
              AMZ TECH – chuyên cung cấp loa và tai nghe đã qua sử dụng với chất lượng được tuyển chọn kỹ càng. Chúng tôi cam kết mang đến trải nghiệm âm thanh tuyệt vời với mức giá hợp lý nhất.
            </div>
>>>>>>> fix-admin
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