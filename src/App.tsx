import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Info from './pages/Info';
import Blog from './pages/Blog';
import Chat from './pages/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="info" element={<Info />} />
          <Route path="blog" element={<Blog />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
