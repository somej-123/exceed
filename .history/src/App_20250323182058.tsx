import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>홈 페이지</div>} />
          <Route path="about" element={<div>소개 페이지</div>} />
          <Route path="contact" element={<div>연락처 페이지</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
