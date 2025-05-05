import React from 'react'
import HeadPhone from '../assets/img/tainghe.png'
import { Button } from './ui/button'

const promoData = {
    title: "LOA\nTAI NGHE\nHÀNG CŨ\nGIÁ TỐT",
    description: "AMZ TECH – chuyên cung cấp loa và tai nghe đã qua sử dụng với chất lượng được tuyển chọn kỹ càng. Chúng tôi cam kết mang đến trải nghiệm âm thanh tuyệt vời với mức giá hợp lý nhất.",
    buttonText: "Xem tất cả"
}

function PromoBanner() {
    return (
        <div className="relative bg-orange-500 rounded-lg overflow-hidden">
            <img
                src={HeadPhone}
                alt="Tai nghe"
                className="w-full lg:h-[550px] object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-15"></div>
            <div className="absolute inset-0 text-white">
                <div
                    className="absolute top-10 right-10 lg:text-6xl font-bold leading-tight text-right md:text-3xl sm:text-2xl"
                >
                    {promoData.title.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                    ))}
                </div>
                <div className='block sm:hidden'>
                    <div className='p-2 text-orange-700 rounded-3 bg-orange-300 text-xs absolute top-18 left-5' style={{
                        fontSize: '8px',
                    }}>{promoData.buttonText}</div>
                    <p className="w-50 absolute left-5 top-3/5" style={{ fontSize: '8px' }}>
                        {promoData.description}
                    </p>
                </div>
                <Button
                    className="hidden sm:block absolute bottom-50 lg:left-10 md:left-4 lg:bottom-auto lg:top-3/5 md:top-2/5 mt-4 font-semibold shadow-md hover:bg-gray-100 text-orange-700 bg-orange-300 rounded-3"
                >
                    {promoData.buttonText}
                </Button>
                <p className="absolute bottom-10 lg:left-10 md:left-4 lg:top-[67%] md:top-[60%] lg:bottom-auto lg:w-2/5 mt-4 lg:text-base w-95 md:w-80 sm:w-70 md:text-xs hidden sm:block">
                    {promoData.description}
                </p>
            </div>
        </div>
    )
}

export default PromoBanner