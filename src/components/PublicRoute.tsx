import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from 'src/store/authStore';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  if (isAuthLoading) return null; // 인증 체크 중에는 아무것도 렌더링하지 않음

  // 이미 인증된 사용자는 홈으로 리다이렉트
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
}; 