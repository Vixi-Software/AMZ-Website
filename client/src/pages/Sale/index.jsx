import React from 'react'
import MainCarousel from '../Home/MainCarousel'
import { Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom';
import routePath from '../../constants/routePath';

function Sale() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="mb-4">
                <nav className="flex items-center gap-2 text-sm">
                    {/* Home icon */}
                    <span className="flex items-center gap-1 text-black border-2 p-2 rounded-full border-black" onClick={() => navigate(routePath.home)}>
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <path d="M3 10.75L12 4l9 6.75" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.5 10.75V19a1 1 0 001 1h3.5v-4.25a1 1 0 011-1h2a1 1 0 011 1V20H18.5a1 1 0 001-1v-8.25" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Trang chủ</span>
                    </span>

                    {/* Divider */}
                    <span className="mx-1 text-black">{'>'}</span>
                    {/* Product name */}
                    <span className="flex items-center gap-1 bg-orange-500 text-white font-semibold p-2 rounded-full border-2 border-orange-500">
                        {'Khuyến mãi hot'}
                    </span>
                </nav>
            </div>
            <MainCarousel />

            {/* Phần sản phẩm khuyến mãi */}
            <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">Khuyến mãi nổi bật <span role="img" aria-label="fire">🔥</span></h2>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={16}>
                        <img src="https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg" alt="Sale 1" style={{ width: '100%', borderRadius: 8 }} />
                    </Col>
                    <Col xs={24} md={8}>
                        <Row gutter={[0, 16]}>
                            <Col span={24}>
                                <img src="https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg" alt="Sale 2" style={{ width: '100%', borderRadius: 8 }} />
                            </Col>
                            <Col span={24}>
                                <img src="https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg" alt="Sale 3" style={{ width: '100%', borderRadius: 8 }} />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <h2 className="text-lg font-bold mt-8 mb-2">Mở bán siêu rẻ <span role="img" aria-label="fire">🔥</span></h2>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <img src="https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg" alt="Sale 4" style={{ width: '100%', borderRadius: 8 }} />
                    </Col>
                    <Col xs={24} md={8}>
                        <img src="https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg" alt="Sale 5" style={{ width: '100%', borderRadius: 8 }} />
                    </Col>
                    <Col xs={24} md={8}>
                        <img src="https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg" alt="Sale 6" style={{ width: '100%', borderRadius: 8 }} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Sale