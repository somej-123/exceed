import axios from 'axios';

// Spring Boot API 클라이언트
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 처리
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// // AI API 클라이언트
// export const aiClient = axios.create({
//   baseURL: '',  // baseURL을 비워두어 상대 경로 사용
//   headers: {
//     'Content-Type': 'application/json',
//     // 'Accept': 'application/json',
//     // 'Authorization': 'Bearer your-api-key-here'  // API 키가 필요한 경우 여기에 추가
//   },
// }); 