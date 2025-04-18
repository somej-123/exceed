# EXCEED Project

React와 TypeScript를 사용한 웹 애플리케이션 프로젝트입니다.

## 기술 스택

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM v7
- React Bootstrap
- Axios
- Yup (폼 유효성 검사)
- React Hook Form
- Zustand (상태 관리)

### AI 통합
- LM Studio API 연동
- WebSocket 실시간 통신
- Stream 응답 처리

### 주요 기능

#### 1. AI 채팅 시스템
- LM Studio 기반 AI 모델과 실시간 대화
- 스트리밍 방식의 응답 처리
- 채팅 히스토리 관리
- 다양한 AI 모델 선택 지원
- 마크다운 형식 지원
- 코드 하이라이팅

#### 2. 인증 시스템
- JWT 기반 인증
- 로그인/로그아웃
- 보호된 라우트
- 인증 상태 관리 (AuthContext)
- 토큰 기반 API 요청 자동화

#### 3. 라우팅 시스템
- 공개 페이지 (로그인, 회원가입)
- 보호된 페이지 (홈, 소개, 블로그, 채팅)
- 레이아웃 시스템
- 조건부 리다이렉션

#### 4. API 통신
- Axios 인터셉터
- 토큰 자동 첨부
- 에러 처리
- 401 에러 시 자동 로그아웃

## 프로젝트 구조

```
src/
├── api/          # API 관련 설정
│   ├── chat/    # 채팅 관련 컴포넌트
│   └── common/  # 공통 컴포넌트
├── components/   # 재사용 가능한 컴포넌트
├── pages/        # 페이지 컴포넌트
│   ├── chat/    # 채팅 관련 페이지
│   └── common/  # 공통 페이지
├── store/        # 상태 관리
│   ├── auth/    # 인증 관련 상태
│   └── chat/    # 채팅 관련 상태
├── styles/       # CSS 모듈
└── utils/        # 유틸리티 함수
```

## 주요 컴포넌트

### Chat 시스템
- 실시간 AI 응답 처리
- 메시지 스트리밍 표시
- 채팅 히스토리 관리
- 다양한 AI 모델 선택 UI
- 마크다운 렌더링
- 코드 블록 하이라이팅

### AuthProvider
- 인증 상태 관리
- 토큰 관리
- 로그인/로그아웃 처리

### PrivateRoute
- 인증된 사용자만 접근 가능한 라우트
- 비인증 사용자 리다이렉션

### PublicRoute
- 비인증 사용자용 라우트
- 인증된 사용자 홈 리다이렉션

### Header
- 네비게이션 바
- 조건부 메뉴 렌더링
- 로그아웃 처리

## 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 빌드
yarn build
```

## 환경 변수

프로젝트 루트에 .env 파일 생성:

```env
VITE_API_URL=http://localhost:8080
VITE_LM_STUDIO_API_URL=http://localhost:1234  # LM Studio API 엔드포인트
```

## API 엔드포인트

### 인증
- POST /api/users/login - 로그인
- POST /api/users/logout - 로그아웃
- POST /api/users/register - 회원가입

### AI 채팅
- POST /api/chat/completions - 채팅 메시지 전송
- GET /api/models - 사용 가능한 AI 모델 목록
- POST /api/chat/stream - 스트리밍 응답

## 보안 고려사항

1. JWT 토큰
   - localStorage에 저장
   - 모든 API 요청에 자동 포함
   - 만료 시 자동 로그아웃

2. 라우트 보호
   - 인증되지 않은 사용자 접근 제한
   - 인증된 사용자 리다이렉션

3. API 보안
   - CORS 설정
   - 토큰 기반 인증
   - 에러 처리

## 향후 개선사항

- [ ] 리프레시 토큰 구현
- [ ] 소셜 로그인 추가
- [ ] 프로필 관리
- [ ] 보안 강화 (httpOnly 쿠키 등)
- [ ] AI 모델 설정 커스터마이징
- [ ] 채팅 히스토리 영구 저장
- [ ] 다크 모드 지원
- [ ] 음성 입력/출력 지원
- [ ] 이미지 생성 AI 통합