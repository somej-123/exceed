import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { showSuccess } from '../utils/swal';
import { apiClient } from '../api/client';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  isAuthLoading: boolean;
  checkAuth: () => Promise<void>;
  login: (userId: string) => void;
  logout: () => Promise<void>;
}

// localStorage에서 인증 상태 복원
const getInitialAuthState = () => {
  const stored = localStorage.getItem('auth');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { isAuthenticated: false, userId: null };
    }
  }
  return { isAuthenticated: false, userId: null };
};

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    ...getInitialAuthState(),
    isAuthLoading: true,
    checkAuth: async () => {
      set({ isAuthLoading: true });
      try {
        const res = await apiClient.get('/api/users/me');
        set({ isAuthenticated: true, userId: res.data.userId });
        localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, userId: res.data.userId }));
      } catch {
        set({ isAuthenticated: false, userId: null });
        localStorage.setItem('auth', JSON.stringify({ isAuthenticated: false, userId: null }));
      } finally {
        set({ isAuthLoading: false });
      }
    },
    login: (userId: string) => {
      set({ isAuthenticated: true, userId });
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, userId }));
    },
    logout: async () => {
      try {
        await apiClient.post('/api/users/logout');
      } catch {
        // ignore
      }
      set({ isAuthenticated: false, userId: null });
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: false, userId: null }));
      showSuccess('로그아웃', '로그아웃되었습니다.');
    },
  }))
); 