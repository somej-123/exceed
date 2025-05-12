import { Container, Row, Col, Table, Button, Badge, Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 실제로는 API에서 받아올 카테고리 목록 데이터 (mock)
const mockCategoriesData = [
  {
    blog_category_id: 1,
    name: '기술',
    description: '개발, IT, 프로그래밍 관련 글',
    post_count: 15,
  },
  {
    blog_category_id: 2,
    name: '고객사례',
    description: 'Exceed 솔루션 도입 성공 사례',
    post_count: 8,
  },
  {
    blog_category_id: 3,
    name: '문화',
    description: 'Exceed의 조직 문화, 이야기',
    post_count: 5,
  },
];

const BlogCategoryList = () => {
  const [categories, setCategories] = useState(mockCategoriesData);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 실제 API 호출 예시 (주석 처리)
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       setLoading(true);
  //       // const response = await apiClient.get('/api/blog/categories');
  //       // setCategories(response.data);
  //       setCategories(mockCategoriesData); // 임시 목업 사용
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //       // 에러 처리 (e.g., swal)
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  // 임시 로딩 효과
  useEffect(() => {
    setTimeout(() => setLoading(false), 300);
  }, []);

  // TODO: 카테고리 수정/삭제/추가 로직 구현
  const handleEdit = (categoryId: number) => {
    console.log('Edit category:', categoryId);
    // 수정 모달 또는 페이지 이동 로직
  };

  const handleDelete = (categoryId: number) => {
    console.log('Delete category:', categoryId);
    // 삭제 확인 모달 후 API 호출 로직
  };

  const handleAdd = () => {
    console.log('Add new category');
    // 추가 모달 또는 페이지 이동 로직
    navigate('/blog/setting/category/edit');
  };

  // 툴팁 렌더 함수
  const renderTooltip = (props: any, text: string) => (
    <Tooltip id={`tooltip-${text.toLowerCase().replace(' ', '-')}`} {...props}>
      {text}
    </Tooltip>
  );

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="fw-bold display-6 category-title">카테고리 관리</h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleAdd} className="add-category-btn shadow">
            <FaPlus className="me-2" /> 카테고리 추가
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="shadow-lg rounded-4 border-0 overflow-hidden card-dark-theme">
            <Card.Body className="p-0">
              <Table hover responsive className="text-center align-middle mb-0 category-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th className="text-start">이름</th>
                    <th className="text-start">설명</th>
                    <th>글 수</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="category-row">
                      <td colSpan={5} className="text-muted py-5">로딩 중...</td>
                    </tr>
                  ) : categories.length === 0 ? (
                    <tr className="category-row">
                      <td colSpan={5} className="text-muted py-5 fs-5">등록된 카테고리가 없습니다.</td>
                    </tr>
                  ) : (
                    categories.map(category => (
                      <tr key={category.blog_category_id} className="category-row">
                        <td>{category.blog_category_id}</td>
                        <td className="text-start fw-medium">{category.name}</td>
                        <td className="text-start text-muted small">{category.description}</td>
                        <td>
                          <Badge pill bg="dark" className="px-2 py-1 category-badge">{category.post_count}</Badge>
                        </td>
                        <td>
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(props) => renderTooltip(props, '수정')}
                          >
                            <Button
                              variant="link"
                              className="p-1 me-1 action-icon edit-icon"
                              onClick={() => handleEdit(category.blog_category_id)}
                            >
                              <FaEdit size={18} />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(props) => renderTooltip(props, '삭제')}
                          >
                            <Button
                              variant="link"
                              className="p-1 action-icon delete-icon"
                              onClick={() => handleDelete(category.blog_category_id)}
                            >
                              <FaTrashAlt size={17} />
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Custom CSS Styles - Always Deep Dark Theme (Reinforced) */}
      <style>
        {`
          /* Ensure high specificity */
          .card-dark-theme {
             background-color: rgba(30, 32, 40, 0.98) !important;
             color: #f1f1f1 !important;
             box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5) !important;
          }
          .card-dark-theme .category-title {
            color: #e9ecef !important;
          }
          /* Add button styles remain the same */
          .add-category-btn {
            background: linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%);
            border: none;
            transition: all 0.3s ease;
            font-weight: 600;
            color: #fff;
          }
          .add-category-btn:hover {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 6px 12px rgba(143, 148, 251, 0.3);
          }

          /* Table specific styles with higher specificity */
          .card-dark-theme .category-table thead {
            /* Ensure background color and gradient are applied */
            background-color: #23252c !important; 
            background: linear-gradient(90deg, #23252c 0%, #2a2d3a 100%) !important;
            /* Adjust border color to be visible but dark */
            border-bottom: 2px solid #333742 !important; 
            color: #adb5bd !important;
            background-image: none !important; /* Remove potential Bootstrap image */
          }
          .card-dark-theme .category-table th {
            padding: 1rem 0.75rem !important;
            vertical-align: middle !important;
            border: none !important;
            border-color: #333742 !important;
            color: #adb5bd !important; /* Ensure text color */
            background-color: transparent !important; /* Prevent individual cell background override */
          }
          .card-dark-theme .category-table .category-row td {
            padding: 1rem 0.75rem !important;
            vertical-align: middle !important;
            /* Revert border color to #333742 - REMOVED FROM HERE */
            /* border-top: 1px solid #333742 !important; */
            border-bottom: 1px solid #333742 !important;
            color: #d1d1d1 !important;
            transition: background-color 0.2s ease !important;
            background-color: transparent !important; /* Override potential bootstrap light backgrounds */
          }
          /* Apply border to the row itself */
          .card-dark-theme .category-table tr.category-row {
            border-top: 1px solid #333742 !important; 
          }
          .card-dark-theme .category-table .category-row:hover td {
            background-color: #23242a !important; /* Dark hover background */
            color: #f1f1f1 !important; /* Ensure text is light on hover */
          }
          .card-dark-theme .category-table .category-row .text-muted {
            color: #868e96 !important;
          }
          .card-dark-theme .category-table .category-badge {
            background-color: #495057 !important;
            color: #e9ecef !important;
            font-size: 0.8rem !important;
            font-weight: 600 !important;
          }
          
          /* Action icons styles remain the same */
          .action-icon {
            transition: all 0.2s ease-in-out;
            opacity: 0.7;
          }
          .action-icon:hover {
            transform: scale(1.2);
            opacity: 1;
          }
          .edit-icon {
            color: #8cb4ff !important;
          }
          .delete-icon {
            color: #ff7b7b !important;
          }
           .edit-icon:hover {
            color: #a8c7ff !important;
          }
          .delete-icon:hover {
            color: #ffa5a5 !important;
          }
          .tooltip .tooltip-inner {
            background-color: #222;
            color: #fff;
          }
          .tooltip .tooltip-arrow::before {
            border-top-color: #222;
          }
        `}
      </style>
    </Container>
  );
};

export default BlogCategoryList;
