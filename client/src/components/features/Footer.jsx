import { FacebookFilled, InstagramFilled, TikTokFilled, TwitterOutlined, WhatsAppOutlined, YoutubeFilled } from '@ant-design/icons'
import React from 'react'


function Footer() {
    return (
        <div className="bg-white py-8 mt-4 rounded-4">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <h6 className="font-bold text-lg mb-4">Thông tin và chính sách</h6>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Mua hàng và thanh toán</li>
                            <li>Mua hàng trả góp</li>
                            <li>Chính sách giao hàng</li>
                            <li>Chính sách vận chuyển</li>
                            <li>Chính sách kiểm hàng</li>
                            <li>Chính sách đổi trả</li>
                            <li>Chính sách bảo hành</li>
                            <li>Chính sách bảo mật</li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="font-bold text-lg mb-4">Loa</h6>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Loa mini</li>
                            <li>Loa bluetooth cầm tay</li>
                            <li>Loa cắm điện</li>
                            <li>Loa để bàn</li>
                            <li>Loa decor</li>
                            <li>Loa cao cấp</li>
                            <li>Loa đi cắm trại</li>
                            <li>Loa hát karaoke</li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="font-bold text-lg mb-4">Tai nghe</h6>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Tai nghe true wireless</li>
                            <li>Tai nghe nhét tai</li>
                            <li>Tai nghe chụp tai</li>
                            <li>Tai nghe tập gym</li>
                            <li>Tai nghe chống ồn</li>
                        </ul>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-5'>
                    <div className=''>
                        <h6 className="font-bold text-lg mb-4">Kết nối với AMZ TECH</h6>
                        <p className="text-sm text-gray-600">
                            Đà Nẵng: <span className="font-bold">0935.241.243</span><br />
                            Địa chỉ: 14 Nguyễn Thông - An Hải Tây - Sơn Trà - Đà Nẵng
                        </p>
                        <p className="text-sm text-gray-600 mt-4">
                            Hà Nội: <span className="font-bold">0333.571.236</span><br />
                            Địa chỉ: Số 2, Ngõ 92 Láng Hạ - Đống Đa - Hà Nội
                        </p>
                    </div>
                    <div >
                        <h6 className="font-bold text-lg mt-8">Google maps</h6>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="bg-gray-300 h-24"></div>
                            <div className="bg-gray-300 h-24"></div>
                        </div>
                    </div>
                </div>

                <div>
                    <h6 className="font-bold text-lg">Liên kiết mạng xã hội</h6>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <a href="#" style={{ color: '#1877F3', fontSize: '2rem' }}><FacebookFilled /></a>
                        <a href="#" style={{ color: '#E4405F', fontSize: '2rem' }}><InstagramFilled /></a>
                        <a href="#" style={{ color: '#000000', fontSize: '2rem' }}><TikTokFilled /></a>
                        <a href="#" style={{ color: '#25D366', fontSize: '2rem' }}><WhatsAppOutlined /></a>
                        <a href="#" style={{ color: '#FF0000', fontSize: '2rem' }}><YoutubeFilled /></a>
                        <a href="#" style={{ color: '#1DA1F2', fontSize: '2rem' }}><TwitterOutlined /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer