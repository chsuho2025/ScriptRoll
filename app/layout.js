import './globals.css'

export const metadata = {
  title: 'ScriptRoll — 대본이 영상이 됩니다',
  description: 'AI가 나레이션, 영상 클립, 배경음악을 자동 생성합니다.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
