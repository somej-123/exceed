import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Info from './pages/Info/Info';
import Blog from './pages/Blog/Blog';
import Chat from './pages/Chat/Chat';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import MyInfo from './pages/MyInfo/MyInfo';
import MyInfoEdit from './pages/MyInfo/MyInfoEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="info" element={<Info />} />
          <Route path="blog" element={<Blog />} />
          <Route path="chat" element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } />
          <Route path="login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path="forgot-password" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="myinfo" element={
            <PrivateRoute>
              <MyInfo />
            </PrivateRoute>
          } />
          <Route path="myinfo/edit" element={
            <PrivateRoute>
              <MyInfoEdit />
            </PrivateRoute>
          } />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
