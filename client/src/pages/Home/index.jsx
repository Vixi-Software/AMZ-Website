import { CarouselBanner } from '@/components/carousel-banner'
import CountdownBanner from '@/components/countdown-banner'
import React from 'react'

function Home() {
  return (
    <div>
      <CarouselBanner />
      <CountdownBanner />
    </div>
  )
}

export default Home