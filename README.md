# Exceed Project

React + TypeScript + Vite 기반의 프로젝트입니다.

## 시작하기

### 사전 요구사항
- Node.js 18.0.0 이상
- Yarn 패키지 매니저

### 설치 및 실행

1. 의존성 설치
```bash
yarn install
```

2. 개발 서버 실행
```bash
yarn dev
```

3. 프로덕션 빌드
```bash
yarn build
```

4. 빌드 결과물 미리보기
```bash
yarn preview
```

## 패키지 관리

이 프로젝트는 Yarn을 패키지 매니저로 사용합니다. npm 대신 yarn 명령어를 사용해주세요.

```bash
# 새 패키지 설치
yarn add [패키지명]

# 개발 의존성으로 패키지 설치
yarn add -D [패키지명]

# 패키지 제거
yarn remove [패키지명]

# 모든 의존성 업데이트
yarn upgrade
```

## 프로젝트 구조

```
src/
  ├── components/     # 재사용 가능한 컴포넌트
  ├── pages/         # 페이지 컴포넌트
  ├── assets/        # 이미지, 폰트 등 정적 파일
  ├── App.tsx        # 메인 앱 컴포넌트
  └── main.tsx       # 앱 진입점
```

## 기술 스택

- React 19
- TypeScript
- Vite
- React Router DOM
- React Bootstrap
- Bootstrap 5

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
