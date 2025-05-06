import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { showSuccess } from '../utils/swal';

function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        isAuthenticated: (() => {
          const token = localStorage.getItem('token');
          return !!token && !isTokenExpired(token);
        })(),
        login: (token: string, userId: string) => {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          set({
            token,
            userId,
            isAuthenticated: !isTokenExpired(token),
          });
        },
        logout: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          set({
            token: null,
            userId: null,
            isAuthenticated: false,
          });
          showSuccess('로그아웃', '로그아웃되었습니다.');
        },
      }),
      {
        name: 'auth-storage', // localStorage에 저장될 키 이름
        partialize: (state) => ({ 
          token: state.token,
          userId: state.userId,
          isAuthenticated: state.isAuthenticated 
        }),
      }
    )
  )
); 