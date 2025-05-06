import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from 'src/store/authStore';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  // 이미 인증된 사용자는 홈으로 리다이렉트
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
}; 