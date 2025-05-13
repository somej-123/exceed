import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from 'src/store/authStore';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  if (isAuthLoading) return null; // 인증 체크 중에는 아무것도 렌더링하지 않음

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}; 