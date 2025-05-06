import { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import { useAuthStore } from 'src/store/authStore';
import { apiClient } from 'src/api/client';
import { FaUser, FaEnvelope, FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import { BsCalendar, BsPersonBadge } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


const MyInfo = () => {
  const userId = useAuthStore((state) => state.userId ?? null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    if (!userId) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.get('/api/users/me', { params: { userId } });
      setUserInfo(response.data);
    } catch (err: any) {
      console.error(err);
      setError('사용자 정보를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="d-flex justify-content-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  // 프로필 이니셜
  const profileInitial = userInfo?.nickname?.[0] || userInfo?.userId?.[0] || '?';

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
        <div className="profile-avatar mx-auto">
          <div className="profile-initial">
            {profileInitial}
          </div>
        </div>
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
            내 정보
          </Card.Title>
          <ul className="list-unstyled text-start mb-0 px-2">
            <li className="mb-3 d-flex align-items-center info-item">
              <span className="info-icon bg-primary bg-gradient me-3">
                <FaUser />
              </span>
              <span><strong>아이디:</strong> {userInfo?.userId || '-'}</span>
            </li>
            <li className="mb-3 d-flex align-items-center info-item">
              <span className="info-icon bg-success bg-gradient me-3">
                <FaEnvelope />
              </span>
              <span><strong>이메일:</strong> {userInfo?.email || '-'}</span>
            </li>
            <li className="mb-3 d-flex align-items-center info-item">
              <span className="info-icon bg-info bg-gradient me-3">
                <FaUser />
              </span>
              <span><strong>닉네임:</strong> {userInfo?.nickname || '-'}</span>
            </li>
            <li className="mb-3 d-flex align-items-center info-item">
              <span className="info-icon bg-warning bg-gradient me-3">
                <BsCalendar />
              </span>
              <span><strong>가입일:</strong> {userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : '-'}</span>
            </li>
            <li className="mb-3 d-flex align-items-center info-item">
              <span className="info-icon bg-secondary bg-gradient me-3">
                <BsCalendar />
              </span>
              <span><strong>수정일:</strong> {userInfo?.updatedAt ? new Date(userInfo.updatedAt).toLocaleDateString() : '-'}</span>
            </li>
            <li className="mb-3 d-flex align-items-center info-item">
              <span className="info-icon bg-gradient me-3" style={{ background: userInfo?.isActive ? 'linear-gradient(90deg,#43e97b 0%,#38f9d7 100%)' : 'linear-gradient(90deg,#ff5858 0%,#f09819 100%)' }}>
                <span className="dot-animate" style={{
                  display: 'inline-block',
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: userInfo?.isActive ? '#43e97b' : '#ff5858',
                  boxShadow: userInfo?.isActive ? '0 0 8px #43e97b88' : '0 0 8px #ff585888',
                  animation: 'pulse 1.2s infinite'
                }} />
              </span>
              <span>
                <strong>활성 상태:</strong>{' '}
                <Badge bg={userInfo?.isActive ? 'success' : 'danger'}>
                  {userInfo?.isActive ? '활성' : '비활성'}
                </Badge>
              </span>
            </li>
            <li className="d-flex align-items-center info-item">
              <span className="info-icon bg-dark bg-gradient me-3">
                <BsPersonBadge />
              </span>
              <span><strong>권한:</strong> {userInfo?.role || '-'}</span>
            </li>
          </ul>
          <div className="profile-action-bar mt-4">
            <button onClick={() => navigate('/myinfo/edit')} type="button" className="profile-action-btn change">
              <FaUserEdit className="me-2" />
              회원수정
            </button>
            <button onClick={() => navigate('/myinfo/withdraw')} type="button" className="profile-action-btn withdraw">
              <FaTrashAlt className="me-2" />
              회원탈퇴
            </button>
          </div>
        </Card.Body>
      </Card>
      <style>{`
        .profile-card {
          margin-top: 0;
        }
        .profile-avatar {
          position: absolute;
          top: -45px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }
        .profile-initial {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #232526 0%, #a18cd1 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(160, 140, 210, 0.18);
          border: 4px solid #444;
          font-size: 40px;
          color: #fff;
          font-weight: 700;
          letter-spacing: 2px;
        }
        .info-item {
          transition: background 0.2s, box-shadow 0.2s;
          border-radius: 12px;
          padding: 0.7rem 1rem;
          margin-bottom: 1.1rem;
          background: rgba(40,40,60,0.7);
          box-shadow: 0 2px 8px rgba(30,0,60,0.10);
          color: #f1f1f1;
        }
        .info-item:last-child {
          margin-bottom: 0;
        }
        .info-item:hover {
          background: linear-gradient(90deg, #3a2d5d 0%, #232526 100%);
          box-shadow: 0 4px 16px rgba(160,140,210,0.18);
        }
        .info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          font-size: 1.2rem;
          color: #fff;
          box-shadow: 0 2px 8px rgba(160,140,210,0.12);
        }
        .info-item strong {
          color: #fbc2eb;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(67,233,123,0.7); }
          70% { box-shadow: 0 0 0 10px rgba(67,233,123,0); }
          100% { box-shadow: 0 0 0 0 rgba(67,233,123,0); }
        }
        @media (max-width: 576px) {
          .profile-initial {
            width: 70px;
            height: 70px;
            font-size: 28px;
          }
          .profile-card {
            padding-top: 40px !important;
          }
        }
        .profile-action-bar {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
          margin-top: 2.2rem;
          margin-bottom: 0.5rem;
          flex-wrap: nowrap;
        }
        .profile-action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 140px;
          padding: 0.7rem 1.5rem;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          border-radius: 12px;
          background: linear-gradient(90deg, #5ee7df 0%, #b490ca 100%);
          color: #23272b;
          box-shadow: 0 2px 12px rgba(160,140,210,0.13);
          transition: all 0.18s;
          cursor: pointer;
          letter-spacing: 0.5px;
        }
        .profile-action-btn.change {
          background: linear-gradient(90deg, #374151 0%, #6366f1 100%);
          color: #f1f1f1;
        }
        .profile-action-btn.withdraw {
          background: linear-gradient(90deg, #4b5563 0%, #ef4444 100%);
          color: #fff;
        }
        .profile-action-btn:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 6px 24px rgba(160,140,210,0.18);
          filter: brightness(1.08);
        }
        @media (max-width: 576px) {
          .profile-action-bar {
            flex-direction: row;
            gap: 0.8rem;
          }
          .profile-action-btn {
            width: auto;
            min-width: 0;
            flex: 1 1 0;
            justify-content: center;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </Container>
  );
};

export default MyInfo;