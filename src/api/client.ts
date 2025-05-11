import axios from 'axios';

// Spring Boot API 클라이언트
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 쿠키 자동 포함
});

// 요청 인터셉터 (Authorization 헤더 제거)
// 응답 인터셉터 (refresh 토큰 로직도 쿠키 기반이므로 불필요)

// 필요시 에러 핸들링만 유지
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = '/login';
      return Promise.reject(error);
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