import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { FaGithub, FaEnvelope, FaReact, FaNodeJs, FaCamera, FaBook, FaPlane } from 'react-icons/fa';

const profileImg = 'https://avatars.githubusercontent.com/u/9919?s=200&v=4'; // 임시 프로필 이미지

const Info = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col xs="auto" className="text-center">
          <img
            src={profileImg}
            alt="프로필"
            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '4px solid #eee', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
          />
          <h2 className="mt-3 mb-1 fw-bold">somej</h2>
          <div className="mb-2 text-muted">초보 개발자 & 블로거</div>
          <p className="mb-3" style={{ maxWidth: 400, margin: '0 auto' }}>
            안녕하세요! 새로운 기술과 글쓰기를 좋아하는 개발자입니다.<br />
            초보 개발자로서 많은 것을 배우고 있습니다.
          </p>
          <div className="mb-4 d-flex justify-content-center">
            <Button
              variant="secondary"
              size="sm"
              className="me-2 rounded-pill"
              href="https://github.com/somej-123"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="me-1" /> GitHub
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="me-2 rounded-pill"
              href="mailto:somej@naver.com"
            >
              <FaEnvelope className="me-1" /> Email
            </Button>
            <Button
              style={{ background: '#8e44ad', border: 'none', color: '#fff' }}
              size="sm"
              className="rounded-pill"
              href="https://evuela.tistory.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} className="text-center">
          <h5 className="fw-bold mb-3">관심 기술</h5>
          <Badge bg="info" className="me-2 mb-2"><FaReact className="me-1" />React</Badge>
          <Badge bg="success" className="me-2 mb-2"><FaNodeJs className="me-1" />Node.js</Badge>
          <Badge bg="primary" className="me-2 mb-2">TypeScript</Badge>
          <Badge bg="secondary" className="me-2 mb-2">AI</Badge>
          <Badge bg="warning" text="dark" className="mb-2">UI/UX</Badge>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} className="text-center">
          <h5 className="fw-bold mb-3">연혁</h5>
          <ul className="list-unstyled mb-0" style={{ lineHeight: 2 }}>
            {/* <li><strong>2020 ~ 현재</strong>: 프리랜서 개발자</li> */}
            {/* <li><strong>2018 ~ 2020</strong>: 스타트업 프론트엔드 엔지니어</li> */}
            {/* <li><strong>2016 ~ 2018</strong>: 대학생(컴퓨터공학)</li> */}
            <li><strong>2020 ~ 현재</strong>: 작성중...</li>
          </ul>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-center">
          <h5 className="fw-bold mb-3">취미 & 라이프</h5>
          <Badge bg="light" text="dark" className="me-2 mb-2"><FaBook className="me-1" />테크 장비 구경</Badge>
          <Badge bg="light" text="dark" className="me-2 mb-2"><FaPlane className="me-1" />휴식추구</Badge>
          <Badge bg="light" text="dark" className="me-2 mb-2"><FaCamera className="me-1" />꾸준함</Badge>
        </Col>
      </Row>

      <style>{`
        .about-section {
          background: #f8fafc;
          border-radius: 16px;
          padding: 2rem 1rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
      `}</style>
    </Container>
  );
};

export default Info; 