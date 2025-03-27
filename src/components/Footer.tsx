import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">&copy; 2025 Exceed. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="mailto:contact@exceed.com" className="text-light text-decoration-none me-3">
              wkdalxpfl12@gmail.com
            </a>
            <a href="tel:123-456-7890" className="text-light text-decoration-none">
              010-6272-6430
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 