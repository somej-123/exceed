import axios from 'axios';

// Spring Boot API 클라이언트
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// // AI API 클라이언트
// export const aiClient = axios.create({
//   baseURL: '',  // baseURL을 비워두어 상대 경로 사용
//   headers: {
//     'Content-Type': 'application/json',
//     // 'Accept': 'application/json',
//     // 'Authorization': 'Bearer your-api-key-here'  // API 키가 필요한 경우 여기에 추가
//   },
// }); 