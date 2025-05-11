import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { showSuccess } from '../utils/swal';
import { apiClient } from '../api/client';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  checkAuth: () => Promise<void>;
  login: (userId: string) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    isAuthenticated: false,
    userId: null,
    checkAuth: async () => {
      try {
        const res = await apiClient.get('/api/users/me');
        set({ isAuthenticated: true, userId: res.data.userId });
      } catch {
        set({ isAuthenticated: false, userId: null });
      }
    },
    login: (userId: string) => {
      set({ isAuthenticated: true, userId });
    },
    logout: async () => {
      try {
        await apiClient.post('/api/users/logout');
      } catch {
        // ignore
      }
      set({ isAuthenticated: false, userId: null });
      showSuccess('로그아웃', '로그아웃되었습니다.');
    },
  }))
); 