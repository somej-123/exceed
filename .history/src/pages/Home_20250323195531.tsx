import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaRocket, FaBullhorn } from 'react-icons/fa';
import { BsLightbulb, BsBook, BsGear, BsPeople } from 'react-icons/bs';
import '../styles/home.css';

const Home = () => {
  return (
    <>
      {/* 히어로 섹션 */}
      <div className="hero-section text-light py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0" style={{marginLeft:'30px'}}>
              <h1 className="display-4 fw-bold">환영합니다</h1>
              <p className="lead mb-4">Exceed와 함께 새로운 경험을 시작하세요.</p>
              <Button variant="light" size="lg" className="me-3">시작하기</Button>
              <Button variant="outline-light" size="lg">더 알아보기</Button>
            </Col>
            <Col md={6} className="text-center">
              <FaRocket size={200} className="hero-icon" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* 주요 서비스 섹션 */}
      <Container className="py-5">
        <h2 className="text-center mb-5 section-title">주요 서비스</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm hover-card border-0">
              <div className="text-center pt-4">
                <FaBullhorn size={80} className="service-icon" />
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">최신 소식</Card.Title>
                <Card.Text>
                  Exceed의 최신 소식과 업데이트를 확인하세요.
                  새로운 기술과 트렌드를 만나보세요.
                </Card.Text>
                <Button variant="outline-primary" className="mt-3 rounded-pill">
                  자세히 보기 <BsLightbulb className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm hover-card border-0">
              <div className="text-center pt-4">
                <BsGear size={80} className="service-icon" />
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">서비스 소개</Card.Title>
                <Card.Text>
                  Exceed가 제공하는 다양한 서비스를 알아보세요.
                  맞춤형 솔루션으로 비즈니스 성장을 돕습니다.
                </Card.Text>
                <Button variant="outline-primary" className="mt-3 rounded-pill">
                  서비스 보기 <BsPeople className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm hover-card border-0">
              <div className="text-center pt-4">
                <BsBook size={80} className="service-icon" />
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">블로그</Card.Title>
                <Card.Text>
                  Exceed의 블로그에서 다양한 이야기를 읽어보세요.
                  전문가들의 인사이트를 공유합니다.
                </Card.Text>
                <Button variant="outline-primary" className="mt-3 rounded-pill">
                  블로그 가기 <BsLightbulb className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home; 