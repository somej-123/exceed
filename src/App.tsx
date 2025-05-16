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

  const privateRoutes = [
    { path: 'chat', element: <Chat /> },
    { path: 'myinfo', element: <MyInfo /> },
    { path: 'myinfo/edit', element: <MyInfoEdit /> },
    { path: 'myinfo/password', element: <MyInfoChangePassword /> },
    { path: 'blog/write', element: <BlogAddEdit /> },
    { path: 'blog/setting', element: <BlogSetting /> },
    { path: 'blog/setting/category', element: <BlogCategoryList /> },
    { path: 'blog/setting/category/add', element: <BlogCategoryEdit /> },
    { path: 'blog/setting/category/:id', element: <BlogCategoryEdit /> },
  ];

  const publicRoutes = [
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'forgot-password', element: <ForgotPassword /> },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="info" element={<Info />} />
          <Route path="blog" element={<Blog />} />

          {/* Private Routes */}
          {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<PrivateRoute>{element}</PrivateRoute>}
            />
          ))}

          {/* Public Routes */}
          {publicRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<PublicRoute>{element}</PublicRoute>}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
