import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'
import Header from '../components/features/Header'
import { useNavigate } from 'react-router-dom'
import routePaths from '../constants/routePath'
import { HomeOutlined } from '@ant-design/icons'
const carouselImages = [
    'https://tiengvangaudio.vn/wp-content/uploads/2023/02/BANNER-DM-JBL.jpg',
    'https://th.bing.com/th/id/OIP.TwEyvv_v8V_eLhG-g21lLgHaDR?rs=1&pid=ImgDetMain',
    'https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg',
]

function ExchangeLayout({ children }) {
    const navigate = useNavigate()
    const [breadcrumbLabel, setBreadcrumbLabel] = useState('Tai nghe nhét tai cũ')
    useEffect(() => {
        const label = localStorage.getItem('selectedSidebarLabel')
        if (label) setBreadcrumbLabel(label)
    }, [])
    return (
        <div>
            <Header />
            <div className="max-w-[1400px] mx-auto px-2 md:px-3 lg:px-0 my-4">
                <div className='mb-3'>
                    <nav className="flex items-center space-x-2 text-[15px]">
                        <button
                            className="flex items-center px-3 py-1 border border-gray-300 rounded-full bg-white hover:bg-gray-100"
                            onClick={() => navigate(routePaths.home)}
                        >
                            <HomeOutlined className="mr-1" />
                            <span>Trang chủ</span>
                        </button>
                        <span className="text-gray-400">{'>'}</span>
                        <span className="px-3 py-1 rounded-full bg-orange-500 text-white font-medium">
                            {breadcrumbLabel}
                        </span>
                    </nav>
                </div>

                <Carousel autoplay arrows>
                    {carouselImages.map((img, idx) => (
                        <div key={idx}>
                            <img
                                src={img}
                                alt={`Banner ${idx + 1}`}
                                style={{
                                    width: '100%',
                                    height: 500,
                                    objectFit: 'cover',
                                    borderRadius: 8,
                                }}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>


            <div className='max-w-[1400px] mx-auto px-2 md:px-3 lg:px-0 my-4'>
                {children}
            </div>
        </div>
    )
}

export default ExchangeLayout