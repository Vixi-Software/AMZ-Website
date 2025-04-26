import React from 'react'
import Header from '../components/features/header'
import Footer from '../components/features/footer'

function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <div className='container'>{children}</div>
            <Footer />
        </div>
    )
}

export default MainLayout