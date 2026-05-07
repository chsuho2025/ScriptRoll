# ScriptRoll — AI 영상 생성 플랫폼 데모

> 대본 하나면 YouTube 영상이 완성됩니다. (데모 버전)

## 데모 URL

배포 후 Vercel URL이 생성됩니다.

## 로컬 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인

## GitHub → Vercel 배포

### 1. GitHub 레포지토리 생성

```bash
git init
git add .
git commit -m "feat: initial scriptroll demo"
git remote add origin https://github.com/YOUR_USERNAME/scriptroll.git
git push -u origin main
```

### 2. Vercel 배포

1. [vercel.com](https://vercel.com) 접속 → GitHub 계정 연결
2. "New Project" → GitHub 레포지토리 선택
3. Framework: **Next.js** (자동 감지됨)
4. "Deploy" 클릭

환경 변수 없이 바로 배포됩니다.

## 기술 스택

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Pretendard Variable** 폰트 (CDN)
- 백엔드 없음 — 모든 기능 더미 데이터

## 주요 화면

| 경로 | 설명 |
|------|------|
| `/` | 랜딩 페이지 (서비스 소개, 파이프라인 시각화, 가격) |
| `/editor` | 5단계 에디터 데모 (대본 입력 → 씬 분할 → 스타일 → 생성 → 결과) |

## 디자인 컨셉

- 미니멀리즘 (토스 UI/UX 참고)
- 키 컬러: 스카이블루 (#38BDF8)
- 글래스모피즘 + 블러 그라디언트 배경
- Pretendard Variable 폰트

---

© 2025 ScriptRoll Demo
