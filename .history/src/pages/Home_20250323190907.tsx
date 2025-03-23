import { Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <h1 className="text-center">환영합니다</h1>
          <p className="text-center">Exceed와 함께 새로운 경험을 시작하세요.</p>
        </Col>
      </Row>
      
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>최신 소식</Card.Title>
              <Card.Text>
                Exceed의 최신 소식과 업데이트를 확인하세요.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>서비스 소개</Card.Title>
              <Card.Text>
                Exceed가 제공하는 다양한 서비스를 알아보세요.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>블로그</Card.Title>
              <Card.Text>
                Exceed의 블로그에서 다양한 이야기를 읽어보세요.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home; 