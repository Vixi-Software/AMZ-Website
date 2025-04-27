import React from 'react'
import Speaker from '../../assets/img/loa.png'

function CardProduct() {
    return (
        <div
            className='card-product rounded-4 p-3 mb-3'
            style={{
                boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.35)',
                height: '370px'
            }}
        >
            <div className='d-flex justify-content-between mb-2'>
                <div className='badge fw-normal' style={{
                    backgroundColor: '#FFE8D3',
                    color: '#D65312',
                    fontSize: '12px',
                }}>Giảm 19%</div>
                <div style={{
                    border: '1px solid #FF9231',
                    color: '#D65312',
                    fontSize: '12px',
                }} className='badge fw-normal'>Newseal</div>
            </div>
            <img style={{
                    height: '240px',
                    objectFit: 'cover',
                }} src={Speaker} alt="Product" className='img-fluid' />
            <div className='card-body d-flex justify-content-between align-items-center'>
                <div>
                    <p className='card-title fw-normal'>Harman Kardon Go Play 3</p>
                    <p className='card-text fw-semibold mb-0' style={{ fontSize: '21px' }}>
                        2.000.000đ <span style={{
                            fontSize: '12px',
                        }} className='text-decoration-line-through fw-light'>2.500.000đ</span>
                    </p>
                    <div style={{
                        fontSize: '12px',
                        color: '#696868',
                        fontWeight: '300',
                    }}>
                        Giá tham khảo. Chi tiết xin liên hệ zalo
                    </div>
                </div>
                <div>
                    <div
                        className='dot'
                        style={{
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#FF0000',
                            borderRadius: '50%',
                            margin: '5px',
                        }}
                    ></div>
                    <div
                        className='dot'
                        style={{
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#00FF00',
                            borderRadius: '50%',
                            margin: '5px',
                        }}
                    ></div>
                    <div
                        className='dot'
                        style={{
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#0000FF',
                            borderRadius: '50%',
                            margin: '5px',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default CardProduct