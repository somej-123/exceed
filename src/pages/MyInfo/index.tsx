import { useEffect } from 'react';
import { useAuthStore } from 'src/store/authStore';
import { useNavigate } from 'react-router-dom';

const MyInfo = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // ...기존 컴포넌트 코드...
}

export default MyInfo; 