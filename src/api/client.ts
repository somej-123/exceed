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
    // 401/403 에러 시 강제 리다이렉트 제거 (무한 새로고침 방지)
    // 로그인 상태 변경은 Zustand 스토어와 라우팅 컴포넌트가 처리
    // if (error.response?.status === 401 || error.response?.status === 403) {
    //   window.location.href = '/login'; // 이 코드가 무한 루프를 유발하므로 제거
    // }

    // 처리되지 않은 에러는 그대로 반환
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