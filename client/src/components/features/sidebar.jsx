import React from 'react'
import style from '../../assets/css/sidebar.module.css'

function Sidebar({ items, title }) {
    return (
        <div className={style.sidebar}>
            <div className={style.sidebar_title}>
                {title}
            </div>
            <div className='d-flex flex-column align-items-center'>
                {items.map((item, index) => (
                    <div key={index} className={style.sidebar_content}>
                        <i className={`${item.icon} ${style.icon}`}></i> {item.text}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar