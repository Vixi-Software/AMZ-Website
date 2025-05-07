import { CarouselBanner } from '@/components/carousel-banner'
import Footer from '@/components/features/footer'
import Header from '@/components/features/header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'

function ProductLayout({ children }) {
    return (
        <main className='md:px-2 px-2'>
            <Header />
            <div className='md:container md:mx-auto px-0 lg:px-0'>
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
                        Filter Area
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