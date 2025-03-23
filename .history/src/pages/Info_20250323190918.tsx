import { Container, Row, Col, Card } from 'react-bootstrap';

const Info = () => {
  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <h1 className="text-center">회사 소개</h1>
          <p className="text-center">Exceed에 대해 더 자세히 알아보세요.</p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>비전</Card.Title>
              <Card.Text>
                Exceed는 혁신적인 솔루션을 통해 더 나은 미래를 만들어갑니다.
                우리는 고객의 성공을 위해 끊임없이 노력하고 있습니다.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>미션</Card.Title>
              <Card.Text>
                최고의 서비스와 솔루션을 제공하여 고객의 비즈니스 성장을 돕습니다.
                기술 혁신과 고객 만족을 최우선으로 합니다.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>연혁</Card.Title>
              <Card.Text>
                2020: 회사 설립<br />
                2021: 시리즈 A 투자 유치<br />
                2022: 해외 진출<br />
                2023: 기술 혁신상 수상<br />
                2024: 글로벌 확장
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>조직</Card.Title>
              <Card.Text>
                - 경영지원팀<br />
                - 개발팀<br />
                - 디자인팀<br />
                - 마케팅팀<br />
                - 영업팀
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>위치</Card.Title>
              <Card.Text>
                서울특별시 강남구<br />
                테헤란로 123<br />
                Exceed 빌딩 15층
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Info; 