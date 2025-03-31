import HeaderCss from '../styles/Header.module.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? HeaderCss.activeLink : '';
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
            <Nav.Link 
              as={Link} 
              className={`me-4 ${isActive('/login')}`} 
              to="/login"
              data-text="로그인"
            >로그인</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 