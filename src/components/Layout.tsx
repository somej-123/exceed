import { Container } from 'react-bootstrap';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import { Outlet } from 'react-router-dom';
import styles from 'src/styles/Layout.module.css';

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