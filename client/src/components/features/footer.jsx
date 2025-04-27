import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../assets/css/footer.module.css';

function Footer() {
  return (
    <footer className={`${styles.app_footer_text_dark} ${styles.app_footer_py_4}`}>
      <Container>
        <Row>
          <Col md={4}>
            <h6 className={styles.app_footer_title}>Thông tin và chính sách</h6>
            <ul className="list-unstyled">
              <li className={styles.app_footer_list_item}>Mua hàng và thanh toán</li>
              <li className={styles.app_footer_list_item}>Mua hàng trả góp</li>
              <li className={styles.app_footer_list_item}>Chính sách giao hàng</li>
              <li className={styles.app_footer_list_item}>Chính sách vận chuyển</li>
              <li className={styles.app_footer_list_item}>Chính sách kiểm hàng</li>
              <li className={styles.app_footer_list_item}>Chính sách bảo hành</li>
              <li className={styles.app_footer_list_item}>Chính sách bảo mật</li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className={styles.app_footer_title}>Loa</h6>
            <ul className="list-unstyled">
              <li className={styles.app_footer_list_item}>Loa mini</li>
              <li className={styles.app_footer_list_item}>Loa bluetooth cầm tay</li>
              <li className={styles.app_footer_list_item}>Loa để bàn</li>
              <li className={styles.app_footer_list_item}>Loa decor</li>
              <li className={styles.app_footer_list_item}>Loa cao cấp</li>
              <li className={styles.app_footer_list_item}>Loa di động trợ giảng</li>
              <li className={styles.app_footer_list_item}>Loa hát karaoke</li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className={styles.app_footer_title}>Tai nghe</h6>
            <ul className="list-unstyled">
              <li className={styles.app_footer_list_item}>Tai nghe true wireless</li>
              <li className={styles.app_footer_list_item}>Tai nghe nhét tai</li>
              <li className={styles.app_footer_list_item}>Tai nghe chụp tai</li>
              <li className={styles.app_footer_list_item}>Tai nghe tập gym</li>
              <li className={styles.app_footer_list_item}>Tai nghe chống ồn</li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className={styles.app_footer_title}>Kết nối với AMZ TECH</h6>
            <p className={styles.app_footer_paragraph}>
              Đà Nẵng: <strong>0935.241.243</strong><br />
              Địa chỉ: 14 Nguyễn Thông - An Hải Tây - Sơn Trà - Đà Nẵng
            </p>
            <p className={styles.app_footer_paragraph}>
              Hà Nội: <strong>0933.571.236</strong><br />
              Địa chỉ: Số 25, Ngõ 92 Láng Hạ - Đống Đa - Hà Nội
            </p>
            <h6 className={`${styles.app_footer_title} ${styles.app_footer_padding_left}`}>Liên Kết MXH</h6>
            <div className={`${styles.app_footer_social_icons} d-flex`}>
              <i className="bi bi-facebook" style={{ color: '#3b5998', fontSize: '36px', paddingLeft: '20px' }}></i>
              <i className="bi bi-instagram" style={{ color: '#E1306C', fontSize: '36px', paddingLeft: '20px' }}></i>
              <i className="bi bi-youtube" style={{ color: '#FF0000', fontSize: '36px', paddingLeft: '20px' }}></i>
              <i className="bi bi-twitter" style={{ color: '#1DA1F2', fontSize: '36px', paddingLeft: '20px' }}></i>
              <i className="bi bi-tiktok" style={{ color: '#000000', fontSize: '36px', paddingLeft: '20px' }}></i>
            </div>
          </Col>
          <Col md={4}>
            <h6 className={styles.app_footer_title}>Google maps</h6>
            <div className="d-flex gap-2">
              <div className={styles.app_footer_map}></div>
              <div className={styles.app_footer_map}></div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;