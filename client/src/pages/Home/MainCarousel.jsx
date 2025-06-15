// src/pages/Home/MainCarousel.jsx
import React from 'react'
import { Carousel } from 'antd'
import { useSelector } from 'react-redux';



const carouselError = [
  "https://th.bing.com/th/id/OIP.EpBZaK5D9zRRY8kD4ifgAwHaEr?rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3",
  "https://th.bing.com/th/id/OIP.YQz2GkHGIa82AOn9n8atUgHaEK?rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3",
  "https://th.bing.com/th/id/OIP.w7SmH1vC1Z_FjjQfa9ZICQHaEK?rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3"
]

function MainCarousel() {
  const home = useSelector(state => state.settings.home);
  return (
    <Carousel autoplay arrows>
      {(home.slideBanners || carouselError).map(image => (
        <img
          src={image}
          alt=""
          className="
            w-full object-cover
            h-[180px]
            md:h-[400px]
            lg:h-[560px]
            rounded-lg
            mt-2 md:mt-0
          "
        />
      ))}
    </Carousel>
  )
}

export default MainCarousel
