// src/pages/Home/MainCarousel.jsx
import React from 'react'
import { Carousel } from 'antd'

const carouselImages = [
  'https://tiengvangaudio.vn/wp-content/uploads/2023/02/BANNER-DM-JBL.jpg',
  'https://th.bing.com/th/id/OIP.TwEyvv_v8V_eLhG-g21lLgHaDR?rs=1&pid=ImgDetMain',
  'https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg',
]

function MainCarousel() {
  return (
    <Carousel autoplay arrows>
      {carouselImages.map((img, idx) => (
        <div key={idx}>
          <img
            src={img}
            alt={`carousel-${idx}`}
            className="
              w-full object-cover
              h-[180px]
              md:h-[400px]
              lg:h-[560px]
              rounded-lg
              mt-2 md:mt-0
            "
          />
        </div>
      ))}
    </Carousel>
  )
}

export default MainCarousel
