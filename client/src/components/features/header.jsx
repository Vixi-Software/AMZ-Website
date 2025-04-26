import React from 'react'

function Header() {
    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '50px', gap: '20px', backgroundColor: '#FF9231' }}>
            <div className='container d-flex align-items-center justify-content-center'>
                <div>
                    <div style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}><i class="bi bi-clock-history"></i> THU CŨ ĐỔI MỚI - LÊN ĐỜI SẢN PHẨM </div>
                </div>
                <div>
                    <div style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}><i class="bi bi-shield-fill"></i> HÀNG CŨ GIÁ RẺ - BẢO HÀNH SIÊU LÂU </div>
                </div>
                <div>
                    <div style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}><i class="bi bi-shield-fill"></i> BÁN HÀNG CÓ TÂM - VẬN CHUYỂN CÓ TẦM </div>
                </div>
            </div>
        </div>
    )
}

export default Header   