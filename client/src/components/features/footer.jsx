import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-dark py-4">
      <Container>
        <Row>
          <Col md={3}>
            <h6>Thông tin và chính sách</h6>
            <ul className="list-unstyled">
              <li>Mua hàng và thanh toán</li>
              <li>Mua hàng trả góp</li>
              <li>Chính sách giao hàng</li>
              <li>Chính sách vận chuyển</li>
              <li>Chính sách kiểm hàng</li>
              <li>Chính sách bảo hành</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Loa</h6>
            <ul className="list-unstyled">
              <li>Loa mini</li>
              <li>Loa bluetooth cầm tay</li>
              <li>Loa để bàn</li>
              <li>Loa decor</li>
              <li>Loa cao cấp</li>
              <li>Loa di động trợ giảng</li>
              <li>Loa hát karaoke</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Tai nghe</h6>
            <ul className="list-unstyled">
              <li>Tai nghe true wireless</li>
              <li>Tai nghe nhét tai</li>
              <li>Tai nghe chụp tai</li>
              <li>Tai nghe tập gym</li>
              <li>Tai nghe chống ồn</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Kết nối với AMZ TECH</h6>
            <p>
              Đà Nẵng: <strong>0935.241.243</strong><br />
              Địa chỉ: 14 Nguyễn Thông - An Hải Tây - Sơn Trà - Đà Nẵng
            </p>
            <p>
              Hà Nội: <strong>0933.571.236</strong><br />
              Địa chỉ: Số 25, Ngõ 92 Láng Hạ - Đống Đa - Hà Nội
            </p>
            <h6>Liên Kết MXH</h6>
            <div className="d-flex gap-2">
              <i className="bi bi-facebook" style={{ fontSize: '24px' }}></i>
              <i className="bi bi-instagram" style={{ fontSize: '24px' }}></i>
              <i className="bi bi-youtube" style={{ fontSize: '24px' }}></i>
              <i className="bi bi-twitter" style={{ fontSize: '24px' }}></i>
              <i className="bi bi-tiktok" style={{ fontSize: '24px' }}></i>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h6>Google maps</h6>
            <div className="d-flex gap-2">
              <div className="bg-secondary" style={{ width: '100px', height: '100px' }}></div>
              <div className="bg-secondary" style={{ width: '100px', height: '100px' }}></div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;