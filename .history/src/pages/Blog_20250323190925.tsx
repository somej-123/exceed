import { Container, Row, Col, Card } from 'react-bootstrap';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "새로운 기술 트렌드",
      date: "2024-03-23",
      excerpt: "최신 기술 트렌드와 Exceed의 미래 방향성을 소개합니다.",
      category: "기술"
    },
    {
      id: 2,
      title: "고객 성공 사례",
      date: "2024-03-22",
      excerpt: "Exceed와 함께 성장한 고객들의 이야기를 공유합니다.",
      category: "고객사례"
    },
    {
      id: 3,
      title: "회사 문화 이야기",
      date: "2024-03-21",
      excerpt: "Exceed의 특별한 회사 문화와 일하는 방식에 대해 소개합니다.",
      category: "문화"
    }
  ];

  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <h1 className="text-center">블로그</h1>
          <p className="text-center">Exceed의 다양한 이야기를 만나보세요.</p>
        </Col>
      </Row>

      <Row>
        {blogPosts.map(post => (
          <Col md={4} key={post.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {post.date} | {post.category}
                </Card.Subtitle>
                <Card.Text>
                  {post.excerpt}
                </Card.Text>
                <Card.Link href="#" className="text-decoration-none">자세히 보기 →</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog; 