import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apiClient } from 'src/api/client';
import { showError, showSuccess } from 'src/utils/swal';
// import apiClient from '../../api/apiClient'; // 실제 API 클라이언트 import 필요

const BlogCategoryEdit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(name, description)

    if (!name.trim()) {
      showError('실패', '카테고리 이름을 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 실제 API 호출 (POST 요청)
      const response = await apiClient.post('/api/blog/categories', { name, description });
      console.log('API 호출 시뮬레이션:', { name, description }); // 시뮬레이션 로그

      console.log("response", response);

      if (response.status === 200) {
        showSuccess('성공', '카테고리가 성공적으로 생성되었습니다.');
        navigate('/blog/setting/category'); // 카테고리 목록 페이지로 이동
      } else {
        showError('오류', '카테고리 생성 중 오류가 발생했습니다.');
      } 
    //   navigate('/blog/setting/category'); // 카테고리 목록 페이지로 이동

    } catch (error) {
      console.error("Error creating category:", error);
      showError('오류', '카테고리 생성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden card-dark-theme">
            <Card.Header className="border-bottom-dark py-3 px-4">
              <h3 className="mb-0 fw-bold">새 카테고리 생성</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="categoryName">
                  <Form.Label>카테고리 이름 <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="예: 기술, 일상"
                    autoComplete='off'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={50} // DB 제약 조건에 맞춰 설정 (가정)
                    className="form-control-dark"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="categoryDescription">
                  <Form.Label>설명</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="카테고리에 대한 간단한 설명을 입력하세요 (선택 사항)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={200} // DB 제약 조건에 맞춰 설정 (가정)
                    className="form-control-dark"
                  />
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                   <Button
                     variant="outline-secondary"
                     type="button"
                     onClick={() => navigate('/blog/categories')}
                     disabled={isSubmitting}
                     className="btn-cancel-dark"
                   >
                     취소
                   </Button>
                   <Button
                     variant="primary"
                     type="submit"
                     disabled={isSubmitting}
                     className="btn-submit-dark"
                   >
                     {isSubmitting ? '생성 중...' : '생성하기'}
                   </Button>
                 </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style>
        {`
          .card-dark-theme {
            background-color: rgba(30, 32, 40, 0.98) !important;
            color: #f1f1f1 !important;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5) !important;
          }
          .card-dark-theme .card-header {
            background-color: #23252c !important;
            border-bottom: 1px solid #333742 !important;
            color: #e9ecef !important;
          }
          .card-dark-theme .form-label {
            color: #adb5bd !important;
            font-weight: 500;
          }
          .card-dark-theme .form-control-dark {
            background-color: #2a2d3a !important;
            color: #f1f1f1 !important;
            border: 1px solid #454954 !important;
            border-radius: 0.375rem; /* Bootstrap default */
          }
          .card-dark-theme .form-control-dark::placeholder {
            color: #6c757d !important;
            opacity: 0.8;
          }
          .card-dark-theme .form-control-dark:focus {
            background-color: #2a2d3a !important;
            color: #f1f1f1 !important;
            border-color: #8f94fb !important;
            box-shadow: 0 0 0 0.25rem rgba(143, 148, 251, 0.25) !important;
          }
          .btn-cancel-dark {
             color: #adb5bd !important;
             background-color: transparent !important; /* Keep background transparent */
             border: 1px solid #5a6067 !important;  /* Slightly adjust border color */
             border-radius: 0.375rem !important; /* Add border radius */
             font-weight: 500 !important;
             padding: 0.5rem 1rem !important; /* Adjust padding for consistency */
             transition: all 0.2s ease-in-out !important; /* Add transition */
          }
          .btn-cancel-dark:hover {
             background-color: #343a40 !important;
             border-color: #343a40 !important;
             color: #f1f1f1 !important;
             transform: translateY(-1px); /* Add subtle lift effect */
          }
          .btn-submit-dark {
            background: linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%) !important;
            border: none !important;
            border-radius: 0.375rem !important; /* Ensure consistent radius */
            transition: all 0.3s ease !important;
            font-weight: 600 !important;
            color: #fff !important;
            padding: 0.5rem 1rem !important; /* Ensure consistent padding */
          }
          .btn-submit-dark:hover {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 6px 12px rgba(143, 148, 251, 0.3) !important;
          }
           .btn-submit-dark:disabled {
             background: #495057 !important;
             opacity: 0.65;
             transform: none;
             box-shadow: none;
           }
        `}
      </style>
    </Container>
  );
};

export default BlogCategoryEdit;
