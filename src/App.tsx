import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Info from './pages/Info/Info';
import Blog from './pages/Blog/Blog';
import BlogAddEdit from './pages/Blog/BlogAddEdit';
import Chat from './pages/Chat/Chat';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import MyInfo from './pages/MyInfo/MyInfo';
import MyInfoEdit from './pages/MyInfo/MyInfoEdit';
import MyInfoChangePassword from './pages/MyInfo/MyInfoChangePassword';
import BlogCategoryList from './pages/Blog/BlogCategoryList';
import BlogCategoryEdit from './pages/Blog/BlogCategoryEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';
import BlogSetting from './pages/Blog/BlogSetting';

function App() {
  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []);

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
          <Route path="myinfo/password" element={
            <PrivateRoute>
              <MyInfoChangePassword />
            </PrivateRoute>
          } />
          <Route path="blog/write" element={
            <PrivateRoute>
              <BlogAddEdit />
            </PrivateRoute>
          } />
          <Route path="blog/setting" element={
            <PrivateRoute>
              <BlogSetting />
            </PrivateRoute>
          } />
          <Route path="blog/setting/category" element={
            <PrivateRoute>
              <BlogCategoryList />
            </PrivateRoute>
          } />
          <Route path="blog/setting/category/edit" element={
            <PrivateRoute>
              <BlogCategoryEdit />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
