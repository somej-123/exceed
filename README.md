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

## 블로그 프로젝트 작업 내역 (2025-05-12)

> ※ 아래 내역은 2025-05-12(월) 기준 최신 작업 내용입니다.

### 1. 에디터(글 작성/수정)
- **Editor.js** 기반의 블록형 에디터를 적용하여, 사용자가 다양한 형태의 콘텐츠(제목, 리스트, 이미지, 코드, 인용구, 표 등)를 자유롭게 작성할 수 있도록 구현
- **다크모드** 지원: 에디터, 입력창, 버튼, 카드 등 전체 UI를 다크톤으로 통일, 텍스트/포인트 컬러/그림자 등 세련된 스타일 적용
- **제목/카테고리/태그 입력**: 제목과 카테고리는 Form.Control, Form.Select로 구현, 태그는 쉼표(,) 또는 엔터로 입력 시 Chip(뱃지) 형태로 추가 및 삭제 가능
- **태그 UX**: 입력값 중복 방지, Chip 옆 X 버튼으로 삭제, 입력창 placeholder 안내 등 UX 세부 개선
- **폼 제출 시**: Editor.js의 save() 결과와 제목/카테고리/태그를 함께 서버로 전송하도록 설계

### 2. 이미지 업로드
- **@editorjs/image** 플러그인 사용, uploader.uploadByFile 옵션에 직접 업로드 로직 구현
- **axios 기반 apiClient**로 /api/blog/upload-image 엔드포인트에 FormData로 파일 전송, 서버에서 업로드된 이미지의 URL을 반환받아 Editor.js에 삽입
- **업로드 성공 시**: 본문에 이미지가 즉시 미리보기로 표시됨(에디터 내 자동 처리)
- **서버**: Express+multer 등으로 파일 저장, 정적 파일 서빙 또는 S3/Cloudinary 등 외부 스토리지 연동 가능
- **실무 팁**: 업로드 중 에러/로딩 처리, 파일 확장자/용량 제한, URL 접근성(정적 경로, CORS 등) 고려

### 3. LinkTool(링크 미리보기)
- **@editorjs/link** 플러그인 사용, 외부 링크 입력 시 썸네일/제목 등 메타데이터 미리보기 지원
- **CORS 문제**: 프론트엔드에서 직접 외부 사이트 메타데이터를 가져올 수 없으므로, Express 기반 프록시 API(/api/link-metadata) 구현하여 endpoint로 연결
- **실무 팁**: 무료 API 쿼터 초과, CORS, 네트워크 에러 등 예외 처리, 서버에서 open-graph-scraper 등 활용

### 4. DB 설계 및 저장 방식
- **PostgreSQL 기준**: 본문(content)은 JSONB 타입, 태그는 TEXT[] 배열, 카테고리/제목/작성자 등은 일반 컬럼
- **저장 예시**:
  - title: "새로운 기술 트렌드"
  - category_id: 1
  - tags: ["AI", "트렌드"]
  - content: { blocks: [...], ... } (Editor.js JSON)
- **불러오기**: DB에서 content 컬럼을 그대로 Editor.js data 옵션에 넣으면 본문 복원 가능
- **실무 팁**: XSS 방지, JSONB 인덱스, 태그 배열 검색, 마이그레이션 등 고려

### 5. 상세 페이지(글 보기)
- **Editor.js readOnly 모드**로 본문(이미지 포함) 렌더링, 글 상세 페이지에서 DB에서 불러온 JSON 데이터를 그대로 Editor.js에 전달
- **HTML 변환**: editorjs-html 등 라이브러리로 HTML 변환 후 SSR/CSR로 렌더링 가능, SEO 대응에 유리
- **이미지/코드/인용구 등 다양한 블록이 실제 서비스처럼 자연스럽게 노출됨**

### 6. SEO/검색엔진 대응
- **DB 저장 방식(json/jsonb/text 등)은 SEO에 영향 없음**
- **SEO 핵심**: 최종적으로 HTML에 의미 있는 태그(h1, p, img 등)로 노출, SSR/메타태그/OG태그 등 최적화 필요
- **실무 팁**: Editor.js 데이터를 HTML로 변환, SSR 적용, robots.txt/sitemap.xml 관리, 접근성(alt 등) 신경쓰기

### 7. 기타
- **TypeScript 타입 에러**: @ts-expect-error, declare module 등으로 임시 처리, 추후 타입 정의 추가 예정
- **UI/UX**: 반응형, 애니메이션, 포인트 컬러, 그림자 등 최신 트렌드 반영, 실서비스 수준의 완성도 추구
- **문제 해결 경험**: CORS, 이미지 업로드, LinkTool, DB 마이그레이션, SEO 등 실무에서 자주 마주치는 이슈와 해결법을 경험적으로 정리

---
## 블로그 프로젝트 작업 내역 (2025-05-14)

### 1. `BlogCategoryList.tsx` (카테고리 목록 페이지)
- **다크 테마 스타일 일관성 강화**:
    - 테이블 헤더(`<thead>`) 배경색, 글자색, 하단 경계선 색상을 전체 다크 테마와 어울리도록 여러 차례 미세 조정했습니다.
    - 테이블 본문(`<tbody>`) 각 행(`<tr>`)의 상단 구분선 색상을 사용자의 피드백에 따라 여러 번 수정하여 최종적으로 헤더와의 통일성을 맞추고, 너무 밝거나 어둡지 않도록 조정했습니다. (예: `#333742`, `#2a2d3a`, `#1f2128`, `#353941`, `#30333a` 등의 색상 값들을 시도하며 최적의 값을 찾았습니다.)
    - CSS 우선순위 문제를 해결하기 위해 `<td>`에 적용했던 `border-top` 스타일을 `<tr>` 요소 자체에 적용하는 방식으로 변경하여 스타일 적용을 강화했습니다.

### 2. `BlogCategoryEdit.tsx` (카테고리 생성/수정 페이지)
- **페이지 신규 생성 및 기본 폼 구현**:
    - `mcp_postgres_query`를 사용해 데이터베이스의 `blog_category` 테이블 컬럼(`blog_category_id`, `name`, `description`, `created_at`)을 확인했습니다.
    - `name`과 `description`을 입력받는 기본 폼 컴포넌트를 생성했습니다.
- **다크 테마 디자인 적용**:
    - 페이지 전체에 다크 테마를 적용하여 카드 배경, 카드 헤더, 폼 레이블, 입력 필드(`Form.Control`)의 배경색, 글자색, 테두리, 플레이스홀더 색상 등을 일관되게 디자인했습니다.
    - 입력 필드 포커스 시 테두리 색상 및 그림자 효과도 다크 테마에 맞게 조정했습니다.
    - '생성하기' 버튼(`btn-submit-dark`)에 그라데이션 배경 및 호버 효과를 적용했습니다.
    - '취소' 버튼(`btn-cancel-dark`)의 스타일을 개선하여 둥근 모서리, 적절한 패딩, 테두리 색상 조정 및 호버 시 배경색 변경 및 미세한 이동 효과를 추가하여 사용성을 높였습니다.
    - `SweetAlert2` 팝업창에도 다크 모드 배경색과 텍스트 색상을 적용하여 전체적인 UI 통일성을 유지했습니다.
- **`trim()` 메소드 관련 설명 제공**:
    - `handleSubmit` 함수 내 `if (!name.trim())` 코드와 관련하여, JavaScript/TypeScript의 `trim()` 문자열 메소드가 문자열의 앞뒤 공백을 제거하는 기능과, 해당 조건문이 입력값 유효성 검사에 어떻게 활용되는지 설명했습니다.

### 3. `BlogAddEdit.tsx` (블로그 글 작성/수정 페이지)
- **버튼 스타일 개선**:
    - '임시 저장' 버튼과 '등록' 버튼에 각각 `.btn-secondary-dark`, `.btn-submit-dark` 클래스를 적용하여 다른 페이지의 버튼들과 일관된 다크 테마 스타일을 적용했습니다.
    - '등록' 버튼에는 그라데이션 배경과 호버 시 입체감 효과를, '임시 저장' 버튼에는 다크 테마에 어울리는 보조 버튼 스타일(테두리, 호버 효과)을 적용했습니다.

### 4. `Blog.tsx` (블로그 메인 페이지)
- **페이지 전체 다크 테마 스타일 적용**:
    - 페이지 타이틀, 부제목, 검색/필터 영역의 `Form.Select` 및 `Form.Control` (입력창) 스타일을 다크 테마에 맞게 조정했습니다. (배경색, 글자색, 테두리, 플레이스홀더 색상 등)
    - 블로그 게시글을 표시하는 카드(`Card`)의 배경색, 그림자, 제목/부제목/본문/메타 정보 텍스트 색상, 썸네일 이미지 플레이스홀더 배경색 등을 다크 테마로 통일했습니다.
    - 카드 호버 시 미세한 이동 및 그림자 효과를 추가했습니다.
    - 태그 뱃지(`Badge`) 스타일도 다크 테마에 맞게 변경했습니다.
- **버튼 스타일 개선**:
    - '검색', '글 작성' 버튼에 `.btn-submit-dark` 클래스를 적용하여 그라데이션 배경과 아이콘 정렬을 포함한 스타일을 적용했습니다.
    - '설정' 버튼에 `.btn-secondary-dark` 클래스를 적용하여 다크 테마 보조 버튼 스타일을 적용했습니다.
    - '자세히 보기' 버튼이 레이아웃 문제로 깨져 보이는 현상을 해결하기 위해, 기존 `Button` 컴포넌트 대신 일반 `<a>` HTML 태그로 변경하고 `.btn-link-dark` 클래스를 적용하여 텍스트 링크 스타일로 자연스럽게 표시되도록 수정했습니다.

---

> 추가 구현/배포/연동/UX 개선 등은 README를 계속 업데이트하며 관리할 것!
