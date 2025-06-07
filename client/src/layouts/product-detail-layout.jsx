import React, { useEffect, useState } from 'react'
import Header from '../components/features/Header'
import { useNavigate } from 'react-router-dom'
import routePaths from '../constants/routePath'
import { HomeOutlined } from '@ant-design/icons'
function ProductDetailLayout({ children }) {
    const [breadcrumbLabel, setBreadcrumbLabel] = useState('Tai nghe nhét tai cũ')
    const navigate = useNavigate()

    useEffect(() => {
        const label = localStorage.getItem('selectedSidebarLabel')
        if (label) setBreadcrumbLabel(label)
    }, [])
    return (
        <div>
            <Header />
            <div className='max-w-[1400px] mx-auto px-2 md:px-3 lg:px-0'>
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
                <div className='my-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ProductDetailLayout