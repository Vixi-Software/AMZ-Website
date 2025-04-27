import React from 'react'
import Header from '../components/features/header'
import Footer from '../components/features/footer'
import Sidebar from '../components/features/sidebar'

function MainLayout({ children }) {
    const sidebarItems = [
        { icon: "bi bi-earbuds", text: "Tai nghe nhét tai cũ" },
        { icon: "bi bi-headphones", text: "Tai nghe chụp tai cũ" },
        { icon: "bi bi-speaker", text: "Loa di động cũ" },
        { icon: "bi bi-speaker-fill", text: "Loa để bàn cũ" },
        { icon: "bi bi-mic", text: "Loa karaoke cũ" },
        { icon: "bi bi-arrow-repeat", text: "Thu cũ đổi mới" },
    ];

    const sidebarItems2 = [
        { icon: "bi bi-box-seam", text: "Hàng newseal" },
        { icon: "bi bi-fire", text: "Khuyến mãi hot" },   
        { icon: "bi bi-shield-check", text: "Bảo hành" }, 
        { icon: "bi bi-star", text: "Reviews" },         
        { icon: "bi bi-tools", text: "Sửa chữa" },      
    ];

    return (
        <div>
            <Header />
            <div className='container' style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flex: 1, gap: '20px' }}>
                    <div style={{ flex: '0 0 20%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Sidebar 
                            items={sidebarItems} 
                            title="Hàng cũ giá tốt - Sản phẩm chính" 
                        />
                         <Sidebar 
                            items={sidebarItems2} 
                            title="Khám phá thêm" 
                        />
                    </div>
                    <div style={{ flex: '0 0 80%' }}>
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout