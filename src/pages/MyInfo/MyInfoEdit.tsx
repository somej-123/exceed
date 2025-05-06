import { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { useAuthStore } from 'src/store/authStore';
import { apiClient } from 'src/api/client';
import { FaUser, FaEnvelope, FaArrowLeft, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { showSuccess, showError } from 'src/utils/swal';

const schema = yup.object().shape({
  nickname: yup.string().required('닉네임을 입력해주세요').max(20, '최대 20자까지 입력 가능합니다.'),
  email: yup.string().required('이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
});

type FormData = yup.InferType<typeof schema>;

const MyInfoEdit = () => {
  const userId = useAuthStore((state) => state.userId ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<FormData | null>(null);
  const navigate = useNavigate();

  // 주석 추가 테스트
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }
      try {
        const response = await apiClient.get('/api/users/me', { params: { userId } });
        setInitialData({
          nickname: response.data.nickname || '',
          email: response.data.email || '',
        });
        reset({
          nickname: response.data.nickname || '',
          email: response.data.email || '',
        });
      } catch (err: any) {
        console.log(err);
        setError('사용자 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, reset]);

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const response = await apiClient.put('/api/users/me', {
        userId,
        nickname: data.nickname,
        email: data.email,
      });
      if (response.status === 200) {
        showSuccess('수정 완료', '회원정보가 성공적으로 수정되었습니다.');
        navigate('/myinfo');
      } else {
        showError('수정 실패', '회원정보 수정에 실패했습니다.');
      }
    } catch (err: any) {
      setError('회원정보 수정에 실패했습니다.');
      console.log(err);
      showError('수정 실패', '회원정보 수정에 실패했습니다.');
    }
  };

  if (loading) return <div className="d-flex justify-content-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', background: '#212529' }}>
      <Card
        style={{
          maxWidth: 400,
          width: '100%',
          border: 'none',
          borderRadius: 24,
          boxShadow: '0 8px 32px 0 rgba(160, 140, 210, 0.18), 0 1.5px 8px 0 #a18cd1',
          background: 'linear-gradient(135deg, #23272b 0%, #343a40 100%)',
          position: 'relative',
          overflow: 'visible',
          paddingTop: 64,
          paddingBottom: 24,
          paddingLeft: 8,
          paddingRight: 8
        }}
        className="profile-card"
      >
        <Card.Body className="text-center pt-2">
          <Card.Title
            className="mb-4"
            style={{
              fontWeight: 800,
              fontSize: '1.5rem',
              background: 'linear-gradient(90deg, #a18cd1, #fbc2eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            회원정보 수정
          </Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-4 text-start">
              <Form.Label><FaUser className="me-2" />닉네임</Form.Label>
              <Form.Control
                type="text"
                placeholder="닉네임을 입력하세요"
                {...register('nickname')}
                isInvalid={!!errors.nickname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nickname?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4 text-start">
              <Form.Label><FaEnvelope className="me-2" />이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일을 입력하세요"
                {...register('email')}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-between gap-2 mt-4">
              <Button variant="secondary" type="button" onClick={() => navigate(-1)} className="flex-fill">
                <FaArrowLeft className="me-2" />취소
              </Button>
              <Button variant="primary" type="submit" className="flex-fill" disabled={isSubmitting}>
                <FaSave className="me-2" />저장
              </Button>
            </div>
          </Form>
          <div className="mt-4">
            <Button
              variant="success"
              type="button"
              onClick={() => navigate('/myinfo/password')}
              className="w-100 py-2"
              style={{
                fontWeight: 600,
                borderRadius: 10,
                fontSize: '0.97rem',
                boxShadow: '0 2px 8px rgba(67,233,123,0.08)'
              }}
            >
              <FaArrowLeft className="me-2" />
              비밀번호 변경
            </Button>
          </div>
        </Card.Body>
      </Card>
      <style>{`
        .profile-card {
          margin-top: 0;
        }
      `}</style>
    </Container>
  );
};

export default MyInfoEdit;