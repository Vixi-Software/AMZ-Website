import React from 'react'
import { Carousel, Space } from 'antd'
import 'antd/dist/reset.css'
import CountSale from './CountSale'

const carouselImages = [
  'https://tiengvangaudio.vn/wp-content/uploads/2023/02/BANNER-DM-JBL.jpg',
  'https://th.bing.com/th/id/OIP.TwEyvv_v8V_eLhG-g21lLgHaDR?rs=1&pid=ImgDetMain',
  'https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg',
]

function Home() {
  return (
    <div className="w-full">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Carousel autoplay arrows>
          {carouselImages.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`carousel-${idx}`}
                className="
                  w-full object-cover
                  h-[300px]
                  md:h-[400px]
                  lg:h-[560px]
                  rounded-lg
                "
              />
            </div>
          ))}
        </Carousel>

        <CountSale />
      </Space>
    </div>
  )
}

export default Home