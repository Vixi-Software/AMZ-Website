import React from 'react'
import Header from '../components/features/Header'
import Sidebar from '../components/features/Sidebar'
import { Row, Col } from 'antd'

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="max-w-[1400px] mx-auto px-2 md:px-3 lg:px-0">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={6} md={5} lg={6}>
            <Sidebar />
          </Col>
          <Col xs={24} sm={18} md={19} lg={18}>
            {children}
          </Col>
        </Row>
      </div>
      <footer>
        <p>Main Layout Footer</p>
      </footer>
    </div>
  )
}

export default MainLayout