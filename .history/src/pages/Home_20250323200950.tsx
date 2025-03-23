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
            <Col md={6} className="mb-md-0">
              <h1 className="display-4 fw-bold ms-md-5 text-center text-md-start">환영합니다</h1>
              <p className="lead mb-4 ms-md-5 text-center text-md-start">Exceed와 함께 새로운 경험을 시작하세요.</p>
              <div className="text-center text-md-start">
                <Button 
                  variant="light" 
                  size="lg" 
                  className="me-3 ms-md-5 custom-btn"
                >
                  시작하기 
                  <span className="ms-2">→</span>
                </Button>
                {/* <Button 
                  variant="outline-light" 
                  size="lg"
                >
                  더 알아보기
                </Button> */}
              </div>
            </Col>
            <Col md={6} className="text-center mt-5">
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

      {/* CSS 스타일 추가 */}
      <style>{`
        .custom-btn {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50px;
          padding: 0.8rem 2rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .custom-btn:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .custom-btn span {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .custom-btn:hover span {
          transform: translateX(5px);
        }
      `}</style>
    </>
  );
};

export default Home; 