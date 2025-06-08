import React from 'react'
import Header from '../components/features/Header'
import Sidebar from '../components/features/Sidebar'
import { Row, Col } from 'antd'
import Footer from '../components/features/Footer'

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="max-w-[1400px] mx-auto px-2 md:px-3 lg:px-0">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={6} md={8} lg={6}>
            <Sidebar />
          </Col>
          <Col xs={24} sm={18} md={16} lg={18}>
            {children}
            <Footer />
          </Col>
        </Row>

      </div>
    </div>
  )
}

export default MainLayout