import React, { useState } from 'react'
import { Card, Rate, Button, Avatar } from 'antd'
import Review from '../../assets/review.gif'
const feedbacks = [
  {
    name: 'Mạnh Đức',
    date: '21/02/2015',
    location: 'AMZ TECH Hà Nội',
    rating: 5,
    content:
      'Lorem ipsum dolor sit amet consectetur. Aenean massa consequat eget diam et purus donec senectus. Laoreet urna hendrerit sit egestas. Consequat pharetra nisl mauris orci at elemen torto...',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Mạnh Đức',
    date: '21/02/2015',
    location: 'AMZ TECH Hà Nội',
    rating: 5,
    content:
      'Lorem ipsum dolor sit amet consectetur. Aenean massa consequat eget diam et purus donec senectus. Laoreet urna hendrerit sit egestas. Consequat pharetra nisl mauris orci at elemen torto...',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Mạnh Đức',
    date: '21/02/2015',
    location: 'AMZ TECH Hà Nội',
    rating: 5,
    content:
      'Lorem ipsum dolor sit amet consectetur. Aenean massa consequat eget diam et purus donec senectus. Laoreet urna hendrerit sit egestas. Consequat pharetra nisl mauris orci at elemen torto...',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
]

function Feeback() {
  const [isHover, setIsHover] = useState(false)

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Khách hàng nói gì về Amz Tech <span role="img" aria-label="emoji">🫶</span>
        </h2>
        <div className="flex flex-col md:flex-col flex-wrap gap-4 justify-center mb-6">
          {feedbacks.map((fb, idx) => (
            <Card
              key={idx}
              className="flex-1 rounded-xl shadow-md transition transform hover:-translate-y-2 hover:shadow-xl"
              bodyStyle={{ padding: '20px' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Avatar src={fb.avatar} size={48} />
                <div>
                  <div className="font-semibold">{fb.name}</div>
                  <Rate disabled defaultValue={fb.rating} className="text-yellow-400 text-sm" />
                </div>
              </div>
              <div className="text-gray-500 text-sm mb-2">
                {fb.date} - Mua hàng tại {fb.location}
              </div>
              <div className="text-gray-700 text-sm">
                {fb.content}
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <Button className="rounded-full px-8 !font-semibold" type="default" size='large'>
            Xem tất cả
          </Button>
          <Button
            className="rounded-full px-8 !font-semibold"
            type="default"
            size="large"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isHover ? (
              <span className="flex items-center gap-2">
                Đánh giá ngay
                <img src={Review} alt="review" className="h-6" />
              </span>
            ) : (
              'Đánh giá Amz Tech'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Feeback