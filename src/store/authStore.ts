import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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
        isAuthenticated: !!localStorage.getItem('token'),
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        
        login: (token: string, userId: string) => {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          set({
            token,
            userId,
            isAuthenticated: true,
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