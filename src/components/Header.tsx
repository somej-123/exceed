import HeaderCss from '../styles/Header.module.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from 'src/store/authStore';
import { apiClient } from 'src/api/client';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  const isActive = (path: string) => {
    return location.pathname === path ? HeaderCss.activeLink : '';
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // 서버에 로그아웃 요청 (선택사항)
      await apiClient.post('/api/users/logout');
      logout();
      // 추가: 성공 메시지 표시 (선택사항)
      // toast.success('로그아웃되었습니다') 등
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // 실패해도 일단 로컬에서는 로그아웃 처리
      logout();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className={`${HeaderCss.logoText}`}>EXCEED</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              className={`me-4 ${isActive('/')}`} 
              to="/"
              data-text="홈"
            >홈</Nav.Link>
            <Nav.Link 
              as={Link} 
              className={`me-4 ${isActive('/info')}`} 
              to="/info"
              data-text="소개"
            >소개</Nav.Link>
            <Nav.Link 
              as={Link} 
              className={`me-4 ${isActive('/blog')}`} 
              to="/blog"
              data-text="블로그"
            >블로그</Nav.Link>
            <Nav.Link 
              as={Link} 
              className={`me-4 ${isActive('/chat')}`} 
              to="/chat"
              data-text="채팅"
            >채팅</Nav.Link>
            {isAuthenticated ? (
              <Nav.Link 
                onClick={handleLogout}
                className="me-4"
                href="#"
                data-text="로그아웃"
              >로그아웃</Nav.Link>
            ) : (
              <Nav.Link 
                as={Link} 
                className={`me-4 ${isActive('/login')}`} 
                to="/login"
                data-text="로그인"
              >로그인</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 