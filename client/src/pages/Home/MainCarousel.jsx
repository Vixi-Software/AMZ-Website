// src/pages/Home/MainCarousel.jsx
import React from 'react'
import { Carousel } from 'antd'
import { useSelector } from 'react-redux';


function MainCarousel() {
     const home = useSelector(state => state.settings.home);
  return (
    <Carousel autoplay arrows>
      {home.slideBanners.map((img, idx) => (
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
