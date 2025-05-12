import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Button, Form, InputGroup } from 'react-bootstrap';
import { FaCog, FaEdit, FaSearch } from 'react-icons/fa';
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
    <Container className="py-5 blog-dark-theme">
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="fw-bold display-5 page-title">블로그</h1>
          <p className="lead page-subtitle">Exceed의 다양한 이야기를 만나보세요.</p>
        </Col>
      </Row>
      <Row className="mb-4 align-items-center">
        <Col md={7} lg={8} className="mb-3 mb-md-0">
          <InputGroup>
            <Form.Select
              className="form-control-dark category-select"
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
              className="form-control-dark search-input"
            />
            <Button onClick={handleSearch} className="btn-submit-dark search-button">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
        <Col md={5} lg={4} className="text-md-end text-center">
          <Button onClick={() => navigate('/blog/write')} className="btn-submit-dark me-2">
             글 작성 <FaEdit />
          </Button>
          <Button onClick={() => navigate('/blog/setting')} className="btn-secondary-dark">
             설정 <FaCog />
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredPosts.map(post => (
          <Col key={post.blog_post_id}>
            <Card className="h-100 shadow border-0 rounded-4 overflow-hidden blog-card-dark">
              {post.thumbnail_url ? (
                <Card.Img variant="top" src={post.thumbnail_url} alt={post.title} className="blog-card-img"/>
              ) : (
                 <div className="card-img-top blog-card-img-placeholder"></div>
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold h5 mb-2 card-title-dark">{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 card-subtitle-dark">
                  {post.created_at} | {post.blog_category?.name}
                </Card.Subtitle>
                <div className="mb-2">
                  {post.tags && post.tags.map((tag: any) => (
                    <Badge key={tag.name} className="me-1 tag-badge-dark">#{tag.name}</Badge>
                  ))}
                </div>
                <Card.Text className="card-text-dark flex-grow-1">
                  {post.summary}
                </Card.Text>
                <div className="mb-2 card-meta-dark">
                  작성자: {post.author?.nickname}
                </div>
                <div className="mb-3 card-meta-dark">
                  조회수 {post.view_count} · 좋아요 {post.like_count} · 댓글 {post.comment_count}
                </div>
                <a href={`/blog/${post.slug}`} className="btn-link-dark text-decoration-none p-0 mt-auto align-self-start">
                  자세히 보기 →
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {filteredPosts.length === 0 && !loading && (
          <Col xs={12} className="text-center py-5">
            <p className="text-muted fs-5">표시할 게시글이 없습니다.</p>
          </Col>
        )}
      </Row>

       <style>{`
         .blog-dark-theme {
           /* Base styles for the page if needed */
         }
         .page-title {
           color: #e9ecef; /* Light title color */
         }
          .page-subtitle {
           color: #adb5bd; /* Lighter subtitle color */
         }

         /* Form Controls Dark */
         .form-control-dark, .form-control-dark:focus {
            background-color: #2a2d3a !important;
            color: #f1f1f1 !important;
            border: 1px solid #454954 !important;
            box-shadow: none !important; /* Remove default focus shadow */
         }
         .form-control-dark::placeholder {
           color: #6c757d !important;
           opacity: 0.8;
         }
         .category-select {
           max-width: 150px; /* Adjust width */
           border-top-right-radius: 0 !important;
           border-bottom-right-radius: 0 !important;
         }
         .search-input {
           border-radius: 0 !important;
           border-left: none !important;
           border-right: none !important;
         }
         .search-button {
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            padding: 0.375rem 0.9rem !important; /* Adjust padding to align height */
         }
         .search-button svg {
             vertical-align: middle;
         }

          /* Button Styles (copied from previous examples) */
          .btn-secondary-dark {
            color: #adb5bd !important;
            background-color: #343a40 !important; /* Slightly darker secondary */
            border-color: #495057 !important;
            border-radius: 0.375rem !important;
            font-weight: 500 !important;
            padding: 0.5rem 1rem; /* Consistent padding */
            transition: all 0.2s ease-in-out;
            display: inline-flex; /* Align icon and text */
            align-items: center;
            gap: 0.4rem; /* Space between icon and text */
          }
          .btn-secondary-dark:hover {
            background-color: #495057 !important;
            border-color: #495057 !important;
            color: #f1f1f1 !important;
            transform: translateY(-1px);
          }
          .btn-submit-dark {
            background: linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%) !important;
            border: none !important;
            border-radius: 0.375rem !important;
            transition: all 0.3s ease !important;
            font-weight: 500 !important; /* Adjusted weight slightly */
            color: #fff !important;
            padding: 0.5rem 1rem; /* Consistent padding */
            display: inline-flex; /* Align icon and text */
            align-items: center;
            gap: 0.4rem; /* Space between icon and text */
          }
          .btn-submit-dark:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 4px 10px rgba(143, 148, 251, 0.25) !important;
          }
          .btn-link-dark {
             color: #a8c7ff !important; /* Light blue link color */
             font-weight: 500;
          }
           .btn-link-dark:hover {
             color: #c0d8ff !important; /* Lighter blue on hover */
             text-decoration: underline !important;
           }

          /* Card Styles */
          .blog-card-dark {
            background-color: #1e2028 !important; /* Darker card background */
            color: #f1f1f1 !important;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          }
          .blog-card-dark:hover {
             transform: translateY(-5px);
             box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3) !important;
          }
          .card-title-dark {
             color: #e9ecef !important;
          }
           .card-subtitle-dark {
             color: #868e96 !important; /* Subdued subtitle */
             font-size: 0.85rem;
           }
           .card-text-dark {
              color: #adb5bd !important; /* Lighter text */
              font-size: 0.95rem;
              min-height: 65px; /* Ensure consistent height */
           }
            .card-meta-dark {
              font-size: 0.8rem !important;
              color: #6c757d !important;
            }
           .blog-card-img {
             height: 200px; /* Consistent image height */
             object-fit: cover;
           }
            .blog-card-img-placeholder {
              height: 200px;
              background-color: #2a2d3a; /* Placeholder background */
            }

           /* Badge Styles */
           .tag-badge-dark {
              background-color: #35365a !important; /* Darker badge */
              color: #e0e0ff !important; /* Light text on badge */
              font-weight: 500;
              font-size: 0.75rem;
              padding: 0.3em 0.6em;
           }
       `}</style>
    </Container>
  );
};

export default Blog;