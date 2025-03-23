import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Exceed</h5>
            <p>최고의 서비스를 제공합니다.</p>
          </Col>
          <Col md={4}>
            <h5>연락처</h5>
            <p>이메일: contact@exceed.com</p>
            <p>전화: 123-456-7890</p>
          </Col>
          <Col md={4}>
            <h5>주소</h5>
            <p>서울특별시 강남구</p>
            <p>123-45</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p className="mb-0">&copy; 2024 Exceed. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 