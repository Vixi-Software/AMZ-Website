import { CarouselBanner } from '@/components/carousel-banner'
import Footer from '@/components/features/footer'
import Header from '@/components/features/header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'

function ProductLayout({ children }) {
    return (
        <main className='md:px-2 px-2'>
            <Header />
            <div className='md:container md:mx-auto px-0 lg:px-0 mb-4'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                    </BreadcrumbList>
                </Breadcrumb>
                <div className=''>
                    <img className='h-[300px] w-full object-cover' src="https://image.anhducdigital.vn/banner/z4832176561324-06a11e349bfae0ba388744f7cf17b482.jpg" alt="" />
                </div>
            </div>
            <div className="md:container md:mx-auto px-0 lg:px-0">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="hidden md:block md:w-1/4">
                        <div className='bg-white shadow-md rounded-4 p-2 mb-4'>
                            <h5 className='mb-3'>Thương hiệu</h5>
                            <div className="grid grid-cols-2 gap-4">
                                <img src="https://cdn.shopify.com/s/files/1/0073/2335/3186/files/JBL_7cfd4ded-cb22-4892-ad91-f691f2e34ca8.png?v=1704897569" alt="Filter 1" className="w-full h-[55px] object-cover rounded-4" />
                                <img src="https://logolook.net/wp-content/uploads/2021/06/Samsung-Logo.svg" alt="Filter 2" className="w-full h-[55px] object-cover rounded-4" />
                                <img src="https://th.bing.com/th/id/OIP.jUnBC6Z11otcS3byW8WS1wHaEO?w=1715&h=980&rs=1&pid=ImgDetMain" alt="Filter 3" className="w-full h-[55px] object-cover rounded-4" />
                                <img src="https://download.logo.wine/logo/Sony_Bank/Sony_Bank-Logo.wine.png" alt="Filter 4" className="w-full h-[55px] object-cover rounded-4" />
                                <img src="https://vectorseek.com/wp-content/uploads/2023/04/Marshall-Logo-Vector.jpg" alt="Filter 1" className="w-full h-[55px] object-cover rounded-4" />
                                <img src="https://th.bing.com/th/id/OIP.WjLYnBDUuZFLxof2nAw78wHaFo?rs=1&pid=ImgDetMain" alt="Filter 2" className="w-full h-[55px] object-cover rounded-4" />
                                <img src="https://www.szthekey.com/wp-content/uploads/2020/11/NJjQZn.jpg" alt="Filter 3" className="w-full h-[55px] object-cover rounded-4" />
                                <img src="https://th.bing.com/th/id/OIP.mdKdyXo98cZi162nfff4tQHaFj?w=800&h=600&rs=1&pid=ImgDetMain" alt="Filter 4" className="w-full h-[55px] object-cover rounded-4" />
                                <img src="https://th.bing.com/th/id/OIP.16C8Tm0pDWF2P7h-dkGZpAHaE8?rs=1&pid=ImgDetMain" alt="Filter 1" className="w-full h-[55px] object-cover rounded-4" />
                                <img src="https://astral.com.mt/wp-content/uploads/2020/09/Bang-Olufsen-logo.jpg" alt="Filter 2" className="w-full h-[55px] object-cover rounded-4" />
                                <img src="https://th.bing.com/th/id/OIP.nPslnZ1Ui-OxReti3CnRxAHaEK?w=700&h=394&rs=1&pid=ImgDetMain" alt="Filter 3" className="w-full h-[55px] object-cover rounded-4" />
                                <img src="https://th.bing.com/th/id/OIP.hH4hB1qyTTaNwPFifGdPhAHaHa?w=768&h=768&rs=1&pid=ImgDetMain" alt="Filter 3" className="w-full h-[55px] object-cover rounded-4" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-3/4">
                        {children}
                        <Footer />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductLayout