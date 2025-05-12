import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaListAlt, FaTags, FaUserCircle, FaPalette } from 'react-icons/fa';

const settingList = [
  {
    key: 'category',
    title: '카테고리 관리',
    description: '블로그 글의 카테고리를 추가/수정/삭제할 수 있습니다.',
    path: '/blog/setting/category',
    icon: <FaListAlt size={22} className="text-primary me-3" />,
  },
  {
    key: 'tag',
    title: '태그 관리',
    description: '태그를 추가/수정/삭제할 수 있습니다.',
    path: '/blog/setting/tag',
    icon: <FaTags size={22} className="text-success me-3" />,
  },
  {
    key: 'profile',
    title: '블로그 프로필',
    description: '블로그 소개, 프로필 이미지를 수정할 수 있습니다.',
    path: '/blog/setting/profile',
    icon: <FaUserCircle size={22} className="text-info me-3" />,
  },
  {
    key: 'design',
    title: '디자인/테마',
    description: '블로그의 테마, 색상, 레이아웃을 변경할 수 있습니다.',
    path: '/blog/setting/design',
    icon: <FaPalette size={22} className="text-warning me-3" />,
  },
  // 필요에 따라 항목 추가 가능
];

const BlogSetting = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center fw-bold">블로그 설정</h2>
          <p className="text-center text-muted">블로그의 다양한 설정을 관리할 수 있습니다.</p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow rounded-4 border-0 blog-setting-card">
            <ListGroup variant="flush">
              {settingList.map(item => (
                <ListGroup.Item
                  key={item.key}
                  className="d-flex justify-content-between align-items-center py-3 px-3 border-0 setting-list-item"
                  style={{ transition: 'background 0.2s' }}
                >
                  <div className="d-flex align-items-center flex-grow-1" style={{ minWidth: 0 }}>
                    {item.icon}
                    <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                      <div className="fw-semibold">{item.title}</div>
                      <div
                        className="text-muted mt-1 setting-desc"
                        style={{
                          fontSize: '0.95rem',
                          whiteSpace: 'normal',
                          wordBreak: 'break-all'
                        }}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="rounded-pill px-3 ms-3 flex-shrink-0"
                    style={{ minWidth: 56 }}
                    onClick={() => navigate(item.path)}
                  >
                    이동
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <style>
        {`
          .blog-setting-card {
            background: rgba(255,255,255,0.95);
            color: #222;
          }
          .setting-list-item:not(:last-child) {
            border-bottom: 1px solid #f0f0f0 !important;
          }
          .setting-list-item:hover {
            background: #f8f9fa;
          }
          .setting-desc {
            // max-width: 320px;
            max-width: 100% !important;
            transition: max-width 0.2s;
          }
          @media (prefers-color-scheme: dark) {
            .blog-setting-card {
              background: rgba(30,32,40,0.98) !important;
              color: #f1f1f1 !important;
              box-shadow: 0 2px 16px 0 rgba(0,0,0,0.7) !important;
            }
            .setting-list-item {
              background: transparent !important;
              color: #e0e0e0 !important;
            }
            .setting-list-item:not(:last-child) {
              border-bottom: 1px solid #333 !important;
            }
            .setting-list-item:hover {
              background: #23242a !important;
            }
            .setting-list-item .text-muted {
              color: #b0b0b0 !important;
            }
            .blog-setting-card .btn-outline-primary {
              color: #bdaaff;
              border-color: #bdaaff;
              background: transparent;
            }
            .blog-setting-card .btn-outline-primary:hover {
              background: #bdaaff;
              color: #23242a;
              border-color: #bdaaff;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default BlogSetting;
