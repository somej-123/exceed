import React, { useRef } from 'react';
import { Container, Card, Form, Button, Row, Col, Badge, CloseButton } from 'react-bootstrap';
import { FaSave, FaRegEdit } from 'react-icons/fa';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Code from '@editorjs/code';
import Quote from '@editorjs/quote';
// import LinkTool from '@editorjs/link';
// import Checklist from '@editorjs/checklist';
import Table from '@editorjs/table';

// mock 카테고리 목록
const mockCategories = [
  { blog_category_id: 1, name: '기술' },
  { blog_category_id: 2, name: '고객사례' },
  { blog_category_id: 3, name: '문화' },
];


const BlogAddEdit = () => {
  const editorRef = useRef<any>(null);
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState('');

  React.useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: '/api/blog/upload-image'
              }
            }
          },
          code: Code,
          quote: Quote,
          table: Table,
        },
        autofocus: true,
        minHeight: 200,
      });
    }
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('handleSubmit');
    // console.log(editorRef.current);
    // console.log(editorRef.current?.save());
    if (editorRef.current) {
      const output = await editorRef.current.save();
      console.log(output);
      // TODO: 제목, 카테고리 등과 함께 서버로 전송
      alert('저장된 데이터: ' + JSON.stringify(output));
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,$/, '');
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (removeTag: string) => {
    setTags(tags.filter(tag => tag !== removeTag));
  };

  return (
    <Container style={{ maxWidth: 900 }} className="py-5">
      <Card style={{ borderRadius: 18, boxShadow: '0 8px 32px 0 rgba(33,37,41,0.13)' }}>
        <Card.Body className="p-2 p-md-3">
          <h2 className="mb-4 fw-bold text-gradient" style={{ fontSize: '2rem', background: 'linear-gradient(90deg,#a18cd1,#fbc2eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>블로그 글 작성</h2>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3 align-items-center mb-3">
              <Col xs={12} md={8}>
                <Form.Label visuallyHidden>제목</Form.Label>
                <Form.Control type="text" placeholder="제목을 입력하세요" required style={{ fontSize: '1.15rem', fontWeight: 600, padding: '14px 18px', borderRadius: 12, background: '#23242a', color: '#f5f5fa', border: '1.5px solid #35365a' }} />
              </Col>
              <Col xs={12} md={4}>
                <Form.Label visuallyHidden>카테고리</Form.Label>
                <Form.Select required style={{ fontSize: '1.05rem', padding: '14px 12px', borderRadius: 12, background: '#23242a', color: '#f5f5fa', border: '1.5px solid #35365a' }}>
                  <option value="">카테고리를 선택하세요</option>
                  {mockCategories.map(cat => (
                    <option key={cat.blog_category_id} value={cat.name}>{cat.name}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">본문</Form.Label>
              <div
                id="editorjs"
                style={{
                  border: '1.5px solid #35365a',
                  borderRadius: 14,
                  minHeight: 260,
                  background: '#23242a',
                  padding: 18,
                  marginTop: 6,
                  marginBottom: 2,
                  width: '100%',
                  color: '#f5f5fa',
                  boxShadow: '0 2px 8px rgba(20,20,30,0.13)'
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">태그</Form.Label>
              <Form.Control
                type="text"
                placeholder="태그를 입력 후 Enter 또는 쉼표(,)로 구분하세요"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                style={{ borderRadius: 12, fontSize: '1.05rem', padding: '12px 14px', background: '#23242a', color: '#f5f5fa', border: '1.5px solid #35365a' }}
              />
              <div className="mt-2" style={{ minHeight: 32 }}>
                {tags.map(tag => (
                  <Badge bg="dark" key={tag} className="me-2 mb-1" style={{ fontSize: '1em', display: 'inline-flex', alignItems: 'center', background: '#35365a', color: '#f5f5fa', border: '1px solid #444' }}>
                    #{tag}
                    <CloseButton onClick={() => handleTagRemove(tag)} variant="white" style={{ marginLeft: 6, fontSize: '0.9em', filter: 'invert(0.8)' }} />
                  </Badge>
                ))}
              </div>
            </Form.Group>
            <Row className="mt-4 g-2">
              <Col xs={6} className="text-start">
                <Button variant="outline-secondary" type="button" style={{ borderRadius: 10, fontWeight: 600 }}>
                  <FaSave className="me-2" />임시 저장
                </Button>
              </Col>
              <Col xs={6} className="text-end">
                <Button variant="primary" type="submit" style={{ borderRadius: 10, fontWeight: 600 }}>
                  <FaRegEdit className="me-2" />등록
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <style>{`
        @media (max-width: 768px) {
          .p-md-3 { padding: 1rem !important; }
        }
        .text-gradient {
          background: linear-gradient(90deg,#a18cd1,#fbc2eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        /* 다크모드 input placeholder */
        input::placeholder, textarea::placeholder {
          color: #aaa !important;
          opacity: 1;
        }
        select, input, textarea {
          background: #23242a !important;
          color: #f5f5fa !important;
          border: 1.5px solid #35365a !important;
        }
        /* Editor.js 내부 다크 스타일 오버라이드 */
        #editorjs, #editorjs .ce-block, #editorjs .ce-block__content, #editorjs .ce-toolbar__content, #editorjs .ce-paragraph, #editorjs .ce-header, #editorjs .ce-block__content, #editorjs .ce-block__content * {
          background: #23242a !important;
          color: #f5f5fa !important;
        }
        #editorjs .ce-block__content {
          border-radius: 10px;
        }
        #editorjs .ce-toolbar__content {
          background: #23242a !important;
        }
        #editorjs .ce-paragraph {
          color: #f5f5fa !important;
        }
        #editorjs .cdx-block {
          background: transparent !important;
        }
        #editorjs .ce-block--selected .ce-block__content {
          box-shadow: 0 0 0 2px #7c5fe6;
        }
        /* Editor.js 툴바/플러스(+) 버튼 흰색 오버라이드 */
        #editorjs .ce-toolbar__plus, #editorjs .ce-toolbar__plus svg,
        #editorjs .ce-toolbar__settings-btn, #editorjs .ce-toolbar__settings-btn svg,
        #editorjs .ce-toolbar__plus:hover, #editorjs .ce-toolbar__settings-btn:hover {
          color: #fff !important;
          fill: #fff !important;
          opacity: 1 !important;
        }
        #editorjs .ce-toolbar__plus:focus, #editorjs .ce-toolbar__settings-btn:focus {
          outline: none !important;
        }
      `}</style>
    </Container>
  );
};

export default BlogAddEdit;
