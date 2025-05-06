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

# 프로덕션 빌드
yarn build

# 프리뷰 서버 실행
yarn preview
```

## 최근 업데이트 (2025-04-21)

### 프록시 설정 개선
- `vite.config.ts` 파일의 프록시 설정을 수정하여 preview 모드에서도 API 요청이 정상적으로 작동하도록 개선
- CORS 관련 설정 최적화

### 환경 변수 설정
- `.env.preview` 파일에 API URL 설정 추가
- 개발 환경과 프리뷰 환경의 API 엔드포인트 통일

### 로그인 기능 개선
- preview 모드에서의 로그인 기능 안정화
- API 요청 경로 통일

### 기타 수정사항
- 불필요한 Java 백엔드 파일 제거
- 프로젝트 구조 정리

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

# EXCEED 프로젝트 작업 내역 (2024-06-13)

## 1. JWT 인증 및 만료/로그아웃 처리
- JWT accessToken, refreshToken을 로그인 시 localStorage에 저장
- accessToken 만료(401/403) 시 refreshToken으로 /api/users/refresh 호출, 새 토큰으로 갱신 후 재시도
- refreshToken도 만료/불일치 시 자동 로그아웃 및 /login 이동 처리
- 로그아웃 시 /api/users/logout 요청 후 localStorage 및 상태 초기화
- axios 인터셉터로 모든 요청에 accessToken 자동 포함
- JWT 토큰 만료, 갱신, 로그아웃 등 인증/보안 실무 패턴 적용
- 보안상 localStorage 대신 httpOnly 쿠키 사용도 고려 필요(실무 권장)
- DB user_info 테이블에 refresh_token 컬럼 추가 필요(백엔드와 연동)

## 2. 주요 API 엔드포인트 예시
- **로그인:** POST /api/users/login  
  요청: { "userId": "...", "password": "..." }  
  응답: { "token": "...", "refreshToken": "...", "userId": "..." }
- **토큰 갱신:** POST /api/users/refresh  
  요청: { "refreshToken": "..." }  
  응답: { "accessToken": "...", "refreshToken": "...", "userId": "..." }
- **로그아웃:** POST /api/users/logout  
  헤더: Authorization: Bearer {JWT_TOKEN}
- **내 정보:** GET /api/users/me  
  헤더: Authorization: Bearer {JWT_TOKEN}

## 3. DB 연동 참고
- user_info 테이블에 refresh_token 컬럼 추가 필요
```sql
ALTER TABLE public.user_info ADD COLUMN refresh_token VARCHAR(512);
```

## 4. 폴더 구조/경로 정리
- pages, components, store, api, utils 등 폴더 구조를 실무적으로 정리
- import 경로를 상대경로로 통일 및 linter 에러 해결

## 5. 회원정보 수정/보호
- MyInfoEdit.tsx에서 회원정보(닉네임, 이메일) 수정 폼 구현
- yup + react-hook-form을 통한 유효성 검사 적용
- 저장/취소/비밀번호 변경 버튼 UI 개선 및 위치 조정
- 비밀번호 변경 버튼은 카드 하단에 전체 너비로 배치

## 6. 다크모드 UI/UX 개선
- 카드, 버튼, 리스트 등 전체적으로 다크모드에 어울리는 색상/그라데이션/그림자/애니메이션 적용
- 반응형 레이아웃, 버튼 hover 효과, 아이콘 등 세련된 디자인 적용

## 7. 실무 팁/문제 해결
- 403/401 에러 원인 분석 및 서버 로그 미출력 시 대처법 안내
- 크롬 확장 프로그램 등에서 발생하는 콘솔 에러(메시지 채널 closed) 안내
- JWT 만료, refresh, 로그아웃 등 인증/보안 실무 패턴 설명

---

### 추가로 궁금한 점이나, 더 개선하고 싶은 부분이 있으면 언제든 문의해 주세요!
