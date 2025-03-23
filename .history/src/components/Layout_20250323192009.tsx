import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      <Header />
      <Container className="flex-grow-1 py-4">
        <Outlet />
      </Container>
      <Footer />
      
      {/* 다크모드 전역 스타일 */}
      <style>{`
        body {
          background-color: #1a1a1a;
          color: #ffffff;
        }

        .card {
          background-color: #2a2a2a;
          border: none;
          color: #ffffff;
        }

        .card .card-title {
          color: #ffffff;
        }

        .card .card-text {
          color: #d1d1d1;
        }

        .btn-outline-primary {
          color: #7eb9ff;
          border-color: #7eb9ff;
        }

        .btn-outline-primary:hover {
          background-color: #7eb9ff;
          color: #1a1a1a;
        }

        .text-muted {
          color: #b0b0b0 !important;
        }

        .section-title {
          color: #ffffff !important;
        }

        .section-title::after {
          background: linear-gradient(to right, #7eb9ff, #c850c0);
        }
      `}</style>
    </div>
  );
};

export default Layout; 