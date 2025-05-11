import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// mock 카테고리 목록
const mockCategories = [
  { blog_category_id: 0, name: '전체' },
  { blog_category_id: 1, name: '기술' },
  { blog_category_id: 2, name: '고객사례' },
  { blog_category_id: 3, name: '문화' },
];

// 실제로는 API에서 받아옴 (DB 구조 반영)
const mockPosts = [
  {
    blog_post_id: 1,
    title: "새로운 기술 트렌드",
    summary: "최신 기술 트렌드와 Exceed의 미래 방향성을 소개합니다.",
    created_at: "2024-03-23",
    blog_category: { name: "기술" },
    author: { nickname: "홍길동" },
    tags: [{ name: "AI" }, { name: "트렌드" }],
    thumbnail_url: "https://cdn.pixabay.com/photo/2021/04/24/18/07/road-6204694_1280.jpg",
    slug: "new-tech-trend",
    view_count: 123,
    like_count: 10,
    comment_count: 5
  },
  {
    blog_post_id: 2,
    title: "고객 성공 사례",
    summary: "Exceed와 함께 성장한 고객들의 이야기를 공유합니다.",
    created_at: "2024-03-22",
    blog_category: { name: "고객사례" },
    author: { nickname: "김철수" },
    tags: [{ name: "고객" }, { name: "성공" }],
    thumbnail_url: "",
    slug: "customer-success",
    view_count: 88,
    like_count: 7,
    comment_count: 2
  },
  {
    blog_post_id: 3,
    title: "고객 성공 사례",
    summary: "Exceed와 함께 성장한 고객들의 이야기를 공유합니다.",
    created_at: "2024-03-22",
    blog_category: { name: "고객사례" },
    author: { nickname: "김철수" },
    tags: [{ name: "고객" }, { name: "성공" }],
    thumbnail_url: "",
    slug: "customer-success",
    view_count: 88,
    like_count: 7,
    comment_count: 2
  },
  {
    blog_post_id: 4,
    title: "고객 성공 사례",
    summary: "Exceed와 함께 성장한 고객들의 이야기를 공유합니다.",
    created_at: "2024-03-22",
    blog_category: { name: "고객사례" },
    author: { nickname: "김철수" },
    tags: [{ name: "고객" }, { name: "성공" }],
    thumbnail_url: "",
    slug: "customer-success",
    view_count: 88,
    like_count: 7,
    comment_count: 2
  },
  {
    blog_post_id: 5,
    title: "고객 성공 사례",
    summary: "Exceed와 함께 성장한 고객들의 이야기를 공유합니다.",
    created_at: "2024-03-22",
    blog_category: { name: "고객사례" },
    author: { nickname: "김철수" },
    tags: [{ name: "고객" }, { name: "성공" }],
    thumbnail_url: "",
    slug: "customer-success",
    view_count: 88,
    like_count: 7,
    comment_count: 2
  }
];

const Blog = () => {
  // 실제로는 useEffect에서 API 호출
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchCategory = category === '전체' || post.blog_category?.name === category;
    const matchSearch =
      post.title.includes(search) ||
      post.summary.includes(search) ||
      post.blog_category?.name.includes(search) ||
      post.tags?.some((tag: any) => tag.name.includes(search));
    return matchCategory && matchSearch;
  });

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <h1 className="text-center">블로그</h1>
          <p className="text-center">Exceed의 다양한 이야기를 만나보세요.</p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={8} className="mb-2 mb-md-0">
          <InputGroup>
            <Form.Select
              style={{ maxWidth: 160 }}
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {mockCategories.map(cat => (
                <option key={cat.blog_category_id} value={cat.name}>{cat.name}</option>
              ))}
            </Form.Select>
            <Form.Control
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="primary" onClick={handleSearch}>검색</Button>
          </InputGroup>
        </Col>
        <Col md={4} className="text-md-end text-center">
          <Button variant="primary" onClick={() => navigate('/blog/write')}>글 작성</Button>
        </Col>
      </Row>
      <Row>
        {filteredPosts.map(post => (
          <Col md={4} key={post.blog_post_id} className="mb-4">
            <Card>
              {post.thumbnail_url && (
                <Card.Img variant="top" src={post.thumbnail_url} alt={post.title} style={{ height: 180, objectFit: 'cover' }} />
              )}
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.95rem' }}>
                  {post.created_at} | {post.blog_category?.name}
                </Card.Subtitle>
                <div className="mb-2">
                  {post.tags && post.tags.map((tag: any) => (
                    <Badge bg="secondary" key={tag.name} className="me-1">#{tag.name}</Badge>
                  ))}
                </div>
                <Card.Text style={{ minHeight: 60 }}>
                  {post.summary}
                </Card.Text>
                <div className="mb-2" style={{ fontSize: '0.9rem', color: '#888' }}>
                  작성자: {post.author?.nickname}
                </div>
                <div className="mb-2" style={{ fontSize: '0.9rem', color: '#888' }}>
                  조회수 {post.view_count} · 좋아요 {post.like_count} · 댓글 {post.comment_count}
                </div>
                <Button variant="link" href={`/blog/${post.slug}`} className="text-decoration-none p-0">자세히 보기 →</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog; 