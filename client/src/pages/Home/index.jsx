import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useProductHelper } from '../../utils/productHelper'
import { Row, Col, Card, Tag, Tooltip } from 'antd'

function ProductCard({ product }) {
  // Giả sử có các trường: product.discount, product.price, product.oldPrice, product.status, product.color
  const salePrice = product.salePrice 
  const price = product.Ban_Le
  const oldPrice = product.oldPrice || ''
  const status = product.status || 'Newseal'
  // const colors = Array.isArray(product.color) ? product.color : []; 
  return (
    <Card
      hoverable
      style={{
        width: '100%',
        marginBottom: 16,
        borderRadius: 16,
        boxShadow: '0 2px 8px #f0f1f2',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flex: 1, // Thêm dòng này để Card co giãn đều
        height: '100%' // Thêm dòng này để Card cao bằng Col
      }}
      bodyStyle={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}
      cover={
        <div style={{ position: 'relative' }}>
          {salePrice > 0 && (
            <Tag
              color="#ff9c5a"
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                zIndex: 2,
                fontWeight: 600,
                borderRadius: 6,
                padding: '2px 12px',
                fontSize: 14
              }}
            >
              Giảm {salePrice}%
            </Tag>
          )}
          <Tag
            color="#fff7e6"
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 2,
              color: '#ff9c5a',
              border: '1px solid #ff9c5a',
              fontWeight: 500,
              borderRadius: 6,
              padding: '2px 12px',
              fontSize: 14
            }}
          >
            {status}
          </Tag>
          {product.image && product.image.length > 0 ? (
            <img
              alt={product.name}
              src={product.image[0]}
              style={{
                height: 180,
                objectFit: 'cover',
                width: '100%',
                borderRadius: '0 0 0 0'
              }}
            />
          ) : (
            <div style={{ height: 180, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              No Image
            </div>
          )}
        </div>
      }
    >
      <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
        {product.name}
        {/* {colors.map((color, idx) => (
          <span
            key={color + idx}
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: color,
              border: '1px solid #ddd',
              marginLeft: 4
            }}
          />
        ))} */}
      </div>
      <div style={{ fontWeight: 700, fontSize: 26, color: '#ff7a00', lineHeight: 1 }}>
        {price && price.toLocaleString('vi-VN')}
        <span style={{ fontWeight: 400, fontSize: 16, color: '#aaa', marginLeft: 8, textDecoration: 'line-through' }}>
          {oldPrice && oldPrice.toLocaleString('vi-VN')}
        </span>
      </div>
      <div style={{ color: '#888', fontSize: 14, marginTop: 2 }}>
        Giá tham khảo. Chi tiết xin liên hệ zalo
      </div>
    </Card>
  )
}

function Home() {

  const { getProductsByCategory } = useProductHelper();
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsByCategory('Loa di động');
      setProducts(products || []);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Row gutter={[16, 16]} align="stretch" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={8} style={{ display: 'flex' }}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Home