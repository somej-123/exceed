import { Container, Row, Col, Table, Button, Badge, Card, Tooltip, OverlayTrigger, Form, InputGroup } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from 'src/api/client';
import CommonTable from 'src/components/CommonTable';
import CommonPaging from 'src/components/CommonPaging';
import { showConfirm, showSuccess } from 'src/utils/swal';

const BlogCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // 실제 API 호출 예시 (주석 처리)

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        size: itemsPerPage,
      };
      if (searchTerm) params.search = searchTerm;
      const response = await apiClient.get('/api/blog/categories', { params });
      setCategories(response.data.categories || response.data.content || response.data); // 서버 구조에 따라 조정
      setTotalPages(response.data.totalPages || response.data.lastPage || 1); // 서버 구조에 따라 조정
    } catch (error) {
      console.error("Error fetching categories:", error);
      // 에러 처리 (e.g., swal)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [currentPage, itemsPerPage]);

  // 임시 로딩 효과
  useEffect(() => {
    setTimeout(() => setLoading(false), 300);
  }, []);

  // TODO: 카테고리 수정/삭제/추가 로직 구현
  const handleEdit = (categoryId: number) => {
    // 수정 모달 또는 페이지 이동 로직
    navigate(`/blog/setting/category/${categoryId}`);
  };

  const handleDelete = (categoryId: number) => {
    // 삭제 확인 모달 후 API 호출 로직
    showConfirm('삭제', '삭제하시겠습니까?').then((result) => {
      if (result.isConfirmed) {
        apiClient.delete(`/api/blog/categories/${categoryId}`).then(() => {
          showSuccess('삭제', '삭제되었습니다.');
          fetchCategories();
        });
      }
    });
  };

  const handleAdd = () => {
    console.log('Add new category');
    // 추가 모달 또는 페이지 이동 로직
    navigate('/blog/setting/category/add');
  };

  // 툴팁 렌더 함수
  const renderTooltip = (props: any, text: string) => (
    <Tooltip id={`tooltip-${text.toLowerCase().replace(' ', '-')}`} {...props}>
      {text}
    </Tooltip>
  );

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: '이름', className: 'text-start' },
    { key: 'description', label: '설명', className: 'text-start' },
    { key: 'post_count', label: '글 수' },
    { key: 'actions', label: '관리' },
  ];

  const renderRow = (category: any) => (
    <tr key={category.blogCategoryId} className="category-row">
      <td>{category.blogCategoryId}</td>
      <td className="text-start fw-medium">{category.name}</td>
      <td className="text-start text-muted small">{category.description}</td>
      <td>
        <Badge pill bg="dark" className="px-2 py-1 category-badge">{category.postCount}</Badge>
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
            onClick={() => handleEdit(category.blogCategoryId)}
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
            onClick={() => handleDelete(category.blogCategoryId)}
          >
            <FaTrashAlt size={17} />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );

  return (
    <Container className="py-5">
      <Row className="mb-3 align-items-end">
        <Col md={4} className="mb-2 mb-md-0">
          <InputGroup>
            <Form.Control
              type="text"
              style={{ borderRadius: 0 }}
              placeholder="카테고리 검색"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="category-search-input"
            />
            <Button
              variant="primary"
              onClick={fetchCategories}
              className="add-category-btn search-button"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: '-1px' }}
            >
              검색
            </Button>
          </InputGroup>
        </Col>
        <Col md={2} className="mb-2 mb-md-0">
          <Form.Select
            value={itemsPerPage}
            onChange={e => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="category-select-dark"
          >
            {[10, 20, 50].map(num => (
              <option key={num} value={num}>{num}개씩 보기</option>
            ))}
          </Form.Select>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleAdd} className="add-category-btn shadow">
            <FaPlus className="me-2" /> 카테고리 추가
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="shadow-lg rounded-4 border-0 overflow-hidden card-dark-theme">
            <Card.Body className="p-0">
              <CommonTable
                columns={columns}
                data={categories}
                loading={loading}
                emptyMessage="등록된 카테고리가 없습니다."
                renderRow={renderRow}
                className="text-center align-middle mb-0 category-table"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <CommonPaging
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="category-pagination-dark"
            pageLinkClassName="page-link-dark"
          />
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
          .category-search-input {
            background: #23242a !important;
            color: #f1f1f1 !important;
            border: 1.5px solid #35365a !important;
            border-radius: 0 !important;
            font-size: 1.05rem;
            padding: 12px 14px;
            box-shadow: 0 2px 8px rgba(20,20,30,0.13);
            transition: border-color 0.2s;
          }
          .category-search-input:focus {
            border-color: #7c5fe6 !important;
            outline: none;
            box-shadow: 0 0 0 2px #7c5fe655;
          }
          .category-search-input::placeholder {
            color: #fff !important;
            opacity: 1 !important;
          }
          .category-select-dark {
            background: #23242a !important;
            color: #f1f1f1 !important;
            border: 1.5px solid #35365a !important;
            border-radius: 12px !important;
            font-size: 1.05rem;
            padding: 12px 14px;
            box-shadow: 0 2px 8px rgba(20,20,30,0.13);
            transition: border-color 0.2s;
          }
          .category-select-dark:focus {
            border-color: #7c5fe6 !important;
            outline: none;
            box-shadow: 0 0 0 2px #7c5fe655;
          }
          .category-pagination-dark .page-link-dark {
            background: #23242a !important;
            color: #f1f1f1 !important;
            border: 1.5px solid #35365a !important;
            border-radius: 8px !important;
            margin: 0 2px;
            min-width: 36px;
            min-height: 36px;
            font-size: 1rem;
            font-weight: 500;
            box-shadow: 0 2px 8px rgba(20,20,30,0.13);
            transition: background 0.2s, color 0.2s, border-color 0.2s;
          }
          .category-pagination-dark .page-link-dark.active,
          .category-pagination-dark .page-link-dark:focus {
            background: linear-gradient(90deg,#4e54c8,#8f94fb) !important;
            color: #fff !important;
            border: none !important;
            outline: none !important;
            box-shadow: 0 0 0 2px #7c5fe655;
          }
          .category-pagination-dark .page-link-dark:hover {
            background: #35365a !important;
            color: #fff !important;
            border-color: #7c5fe6 !important;
          }
        `}
      </style>
    </Container>
  );
};

export default BlogCategoryList;
