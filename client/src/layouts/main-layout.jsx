import React from 'react'
import Header from '../components/features/Header'
import Sidebar from '../components/features/Sidebar'
import { Flex, Grid } from 'antd'
import Footer from '../components/features/Footer'

const { useBreakpoint } = Grid

function MainLayout({ children }) {
  const screens = useBreakpoint()

  // screens.sm, screens.md, screens.lg là boolean
  // Ví dụ: screens.sm === true nếu màn hình >= sm

  return (
    <div>
      <Header />
      <div className="max-w-[1400px] mx-auto px-2 md:pe-0 md:pl-4 lg:px-0">
        <Flex gap={16} style={{ alignItems: 'flex-start' }}>
          <div
            className='hidden sm:block'
            style={{
              flex: `0 0 ${
                screens.lg ? 303 : screens.md ? 180 : 250
              }px`,
              maxWidth: screens.lg ? 303 : screens.md ? 180 : 250,
              width: '100%'
            }}
          >
            <Sidebar />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {children}
            <Footer />
          </div>
        </Flex>
      </div>
    </div>
  )
}

export default MainLayout