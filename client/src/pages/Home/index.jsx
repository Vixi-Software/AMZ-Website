import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import HeadPhone from '../../assets/img/tainghe.png';
import CardProduct from '../../components/features/card-product';
import Banner from '../../assets/img/banner.jpg';
import ProductList from './Product-List';
import CountSale from '../../components/features/countSale';
function Home() {
  return (
    <div>
      <Carousel fade className='mb-3'>
        <Carousel.Item>
          <img
            height={566}
            className="d-block w-100 rounded-3 object-fit-cover"
            src={Banner}
            alt="First slide"
          />
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 rounded-3 object-fit-cover"
            height={566}
            src="https://th.bing.com/th/id/R.753da1a99b5f9f3776df253c94001549?rik=22tZgw0Jw2nwKg&pid=ImgRaw&r=0"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            height={566}
            className="d-block w-100 rounded-3 object-fit-cover"
            src="https://th.bing.com/th/id/R.4714b438536399e1bf2c5fb1fc0622bc?rik=ueh6kCEBszU%2f9w&pid=ImgRaw&r=0"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Row>
        <Col md={4}>
          <CountSale targetDate="2025-05-04T12:00:00" />
        </Col>
        <Col md={8} className='text-center'>
          AMZ TECH - chuyên cung cấp loa và tai nghe đã qua sử dụng với chất lượng được tuyển chọn kỹ càng. Chúng tôi cam kết mang đến trải nghiệm âm thanh tuyệt vời với mức giá hợp lý nhất. Bên cạnh đó AMZ TECH còn mang tới dịch vụ thu cũ đổi mới, giúp bạn tiếp cận sản phẩm yêu thích một cách dễ dàng hơn
        </Col>
      </Row>

      <div
        className='banner-page d-flex align-items-center justify-content-center text-center mb-3'
        style={{
          backgroundImage: `url(${HeadPhone})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '646px',
          color: '#fff',
          position: 'relative',
          padding: '20px',
        }}
      >
        <div style={{ zIndex: 2, textAlign: 'center' }}>
          <h1
            className='fw-bolder'
            style={{
              lineHeight: '1.2',
              textAlign: 'right',
              fontSize: '80px',
            }}
          >
            LOA<br />TAI NGHE<br />HÀNG CŨ<br />GIÁ TỐT
          </h1>
          <div style={{ textAlign: 'left' }}>
            <button className='btn btn-light fw-bold' style={{ color: '#D65312', fontSize: '21px', fontWeight: '500', backgroundColor: '#FFE8D3' }}>
              Xem tất cả
            </button>
          </div>

          <p className='' style={{ marginTop: '20px', fontSize: '1.2rem', textAlign: 'left', width: '60%' }}>
            AMZ TECH - chuyên cung cấp loa và tai nghe đã qua sử dụng với chất lượng được tuyển chọn kỹ càng. Chúng tôi cam kết mang đến trải nghiệm âm thanh tuyệt vời với mức giá hợp lý nhất.
          </p>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        ></div>
      </div>


      <div className='best-seller bg-white ' style={{ padding: '20px' }}>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <div className='d-flex align-items-center gap-2 fs-5'>
            <h5 className='text-center fw-bold m-0'>Sản phẩm bán chạy</h5>
            <i className="bi bi-cart-plus"></i>
          </div>
          <div className='d-flex gap-2'>
            <Button style={{ backgroundColor: '#D65312', color: '#fff', border: 'none', }}>
              Top bán chạy
            </Button>
            <Button style={{ backgroundColor: '#ffff', color: 'black', border: '1px solid #999999', }}>
              Top loa
            </Button>
          </div>
        </div>

<ProductList />
      </div>
    </div>
  )
}

export default Home