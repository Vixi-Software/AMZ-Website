import React from 'react'
import Header from '../components/features/header'
import Footer from '../components/features/footer'
import CategorySidebar from '@/components/category-sidebar'

function MainLayout({ children }) {
    return (
        <main className='md:px-2 px-2'>
            <Header />
            <div className="md:container md:mx-auto px-0 lg:px-0">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="hidden md:block md:w-1/4">
                        <CategorySidebar />
                    </div>
                    
                    <div className="w-full md:w-3/4">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default MainLayout