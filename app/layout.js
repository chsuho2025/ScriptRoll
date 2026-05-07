import './globals.css'

export const metadata = {
  title: 'ScriptRoll — 대본이 YouTube 영상이 됩니다',
  description: 'AI가 나레이션, 영상 클립, 배경음악을 자동 생성합니다. 대본 하나면 완성된 YouTube 영상이 완성됩니다.',
  keywords: ['AI 영상 생성', '대본 영상 변환', 'YouTube 자동화', 'TTS 영상', 'AI 콘텐츠'],
  openGraph: {
    title: 'ScriptRoll — 대본이 YouTube 영상이 됩니다',
    description: 'AI가 나레이션, 영상 클립, 배경음악을 자동 생성합니다.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
