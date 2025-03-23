import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import styles from '../styles/Layout.module.css';

const Layout = () => {
  return (
    <div className={`d-flex flex-column min-vh-100 bg-dark text-light ${styles.layoutContainer}`}>
      <Header />
      <Container className="flex-grow-1 py-4">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout; 