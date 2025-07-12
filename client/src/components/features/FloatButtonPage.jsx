import React from 'react'
import { FloatButton } from 'antd'
import { PhoneOutlined } from '@ant-design/icons'

function FloatButtonPage() {
  return (
    <FloatButton.Group shape="circle" style={{ right: 24, bottom: 24 }}>
      <FloatButton
        description={
          <span style={{ fontWeight: 'bold', color: '#0088FF', fontSize: 20 }}>Zalo</span>
        }
        style={{ width: 64, height: 64, fontSize: 28 }}
        tooltip="Liên hệ Zalo"
        onClick={() => window.open('https://zalo.me/0333571236', '_blank')}
      />
      <FloatButton
        description={
          <PhoneOutlined
            style={{
              fontSize: 32,
            }}
          />
        }
        style={{
          width: 64,
          height: 64,
          fontSize: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        tooltip="Gọi điện thoại"
        onClick={() => window.open('tel:0333571236')}
      />
    </FloatButton.Group>
  )
}

export default FloatButtonPage