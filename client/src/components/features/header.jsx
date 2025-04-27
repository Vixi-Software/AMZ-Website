import React from 'react'
import style from '../../assets/css/header.module.css'

const headerData = [
    {
        icon: 'bi bi-clock-history',
        text: 'THU CŨ ĐỔI MỚI - LÊN ĐỜI SẢN PHẨM',
    },
    {
        icon: 'bi bi-shield-fill',
        text: 'HÀNG CŨ GIÁ RẺ - BẢO HÀNH SIÊU LÂU',
    },
    {
        icon: 'bi bi-shield-fill',
        text: 'BÁN HÀNG CÓ TÂM - VẬN CHUYỂN CÓ TẦM',
    },
];

function Header() {
    return (
        <div>
            <div className={`d-flex align-items-center justify-content-center ${style.app_header_container}`}>
                <div className={`container d-flex align-items-center justify-content-between ${style.app_header_inner}`}>
                    {headerData.map((item, index) => (
                        <div key={index}>
                            <div className={style.app_header_item}>
                                <i className={`${item.icon} ${style.app_header_icon}`}></i>
                                <span>{item.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='container my-2 d-flex justify-content-between align-items-center'>
                <div className={style.app_logo}>
                    <img height={100} width={100} className='rounded-circle' src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/295894461_556396622938076_5074020490480346839_n.png?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQpU6GjqMNdec-M_pbBGGhz4RRT4N3_vHPhFFPg3f-8aWxmKvG4yNBZ7KrMMfNCo9Y4kMFo9Ra5jNWf877xOqB&_nc_ohc=3QK74EnB6oQQ7kNvwHQH2iQ&_nc_oc=Adn1jNFgHeA8264wNM1xolQAFZbDdNNsLXKpi2LNK851ec4aJZA8rOpp2t1Zudtr3GjOepnqxIOKyS_50XwURY9i&_nc_zt=23&_nc_ht=scontent.fdad1-4.fna&_nc_gid=_3xJ-9S0tEu-B1hxXEoc2w&oh=00_AfGKaadl-VX8ttNYs-ysGwSLxlNUkibV6V93nSpITIfWXw&oe=68137F46" alt="logo" />
                </div>
                <div>
                    <div className={style.header_search_nav}>
                        <input
                            type="text"
                            className={style.header_search_nav_input}
                            placeholder="Hôm nay bạn muốn tìm kiếm gì?"
                        />
                        <button className={style.header_search_nav_button}>
                            <i className="bi bi-search"></i> Tìm kiếm
                        </button>
                    </div>
                    <div className={style.header_search_nav_trending}>
                        <span>Từ khóa xu hướng:</span>
                        <a href="#!" className={style.header_search_nav_trending_item}>Sony WF-1000XM5</a>
                        <a href="#!" className={style.header_search_nav_trending_item}>Sony WF-1000XM4</a>
                        <a href="#!" className={style.header_search_nav_trending_item}>Bose QC1</a>
                        <a href="#!" className={style.header_search_nav_trending_item}>Bose QC2</a>
                    </div>
                </div>
                <div>
                    <div className='d-flex gap-3'>
                        <small className={style.store_finder}>
                            <i className="fs-5 bi bi-geo-alt"></i> Tìm cửa hàng
                        </small>
                        <small className={style.store_finder}>
                            <i className="fs-5 bi bi-telephone-fill"></i> Zalo: 0333.571.236
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;