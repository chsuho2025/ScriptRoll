import Link from 'next/link'

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

/* ── 재사용 스타일 상수 ── */
const R = {
  full:  '9999px',
  xl:    '36px',
  lg:    '28px',
  md:    '22px',
  sm:    '16px',
  xs:    '10px',
}

export default function Home() {
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <nav className="nav-bar">
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="point point-pulse" />
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.04em', color: 'var(--black)' }}>ScriptRoll</span>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {['기능', '사용법', '가격'].map(t => (
              <span key={t} style={{ fontSize: 14, fontWeight: 500, color: 'var(--g50)', cursor: 'pointer', padding: '6px 14px', borderRadius: R.full }}>
                {t}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--g50)', cursor: 'pointer', padding: '6px 14px' }}>로그인</span>
            <Link href="/editor" className="btn-primary btn-sm">시작하기</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '96px 28px 72px' }}>

        {/* Pill label */}
        <div className="fade-up" style={{ marginBottom: 28 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--g50)',
            background: 'var(--g04)', border: '1px solid var(--g08)',
            padding: '6px 14px', borderRadius: R.full,
          }}>
            <span className="point point-pulse" style={{ width: 6, height: 6 }} />
            AI 영상 생성 플랫폼
          </span>
        </div>

        <div style={{ maxWidth: 680 }}>
          <h1
            className="fade-up-1"
            style={{ fontSize: 'clamp(52px, 7.5vw, 88px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.05em', color: 'var(--black)', marginBottom: 24 }}
          >
            대본 하나면,<br />영상이 됩니다
          </h1>

          <p
            className="fade-up-2"
            style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: 'var(--g50)', maxWidth: 440, marginBottom: 40 }}
          >
            AI가 나레이션, 영상 클립, 배경음악을<br />모두 자동으로 생성합니다.
          </p>

          <div className="fade-up-3" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/editor" className="btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>
              무료로 시작하기 <Arrow size={15} />
            </Link>
            <Link href="/editor" className="btn-ghost" style={{ fontSize: 15, padding: '14px 30px' }}>
              데모 보기
            </Link>
          </div>
        </div>

        {/* Hero visual */}
        <div className="fade-up-4" style={{ marginTop: 72 }}>
          <div style={{ border: '1px solid var(--g08)', borderRadius: R.xl, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>

              {/* Col 1: Script */}
              <div style={{ padding: 32, borderRight: '1px solid var(--g08)' }}>
                <p className="label" style={{ marginBottom: 20 }}>대본 입력</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {[100, 72, 88, 60, 78, 55, 82, 48].map((w, i) => (
                    <div key={i} style={{ height: 2, borderRadius: 2, background: i === 0 ? 'var(--black)' : 'var(--g08)', width: `${w}%` }} />
                  ))}
                </div>
              </div>

              {/* Col 2: Pipeline */}
              <div style={{ padding: 32, background: 'var(--g04)', borderRight: '1px solid var(--g08)' }}>
                <p className="label" style={{ marginBottom: 20 }}>AI 처리</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[['씬 분할', true], ['TTS 생성', true], ['시각 생성', false], ['BGM 생성', false], ['합성', false]].map(([s, done], i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: done ? 'var(--black)' : 'var(--g15)', flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: done ? 600 : 400, color: done ? 'var(--black)' : 'var(--g30)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 3: Output */}
              <div style={{ padding: 32 }}>
                <p className="label" style={{ marginBottom: 20 }}>결과물</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {['씬 1 · 인트로', '씬 2 · 성산일출봉', '씬 3 · 협재해수욕장', '씬 4 · 흑돼지'].map((sc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--g15)', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'var(--g70)' }}>{sc}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--black)', borderRadius: R.full, padding: '10px 0', textAlign: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--white)', fontWeight: 600, letterSpacing: '-0.01em' }}>MP4 내보내기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '0 28px 80px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {[
              { num: '5단계', sub: 'AI 파이프라인' },
              { num: '12분', sub: '평균 생성 시간' },
              { num: '1080p', sub: '출력 품질' },
              { num: '10+', sub: '나레이터 목소리' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--g04)', borderRadius: R.lg, padding: '28px 24px' }}>
                <p style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.05em', color: 'var(--black)', lineHeight: 1, marginBottom: 6 }}>{s.num}</p>
                <p style={{ fontSize: 13, color: 'var(--g50)', fontWeight: 400 }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pipeline ── */}
      <section style={{ padding: '80px 28px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>

          <div>
            <p className="label" style={{ marginBottom: 20 }}>AI 파이프라인</p>
            <h2 style={{ fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1, marginBottom: 18, color: 'var(--black)' }}>
              5단계 병렬<br />처리 구조
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--g50)', fontWeight: 400, marginBottom: 36 }}>
              1단계 분석 완료 후 TTS, 시각 생성, BGM을 동시에 처리합니다. 씬 단위 병렬 실행으로 처리 시간을 단축합니다.
            </p>
            <Link href="/editor" className="btn-primary" style={{ fontSize: 14 }}>
              직접 사용해보기 <Arrow />
            </Link>
          </div>

          <div style={{ background: 'var(--g04)', borderRadius: R.xl, overflow: 'hidden', padding: '6px' }}>
            {/* Input */}
            <div style={{ background: 'var(--white)', borderRadius: R.lg, padding: '14px 20px', marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--black)', letterSpacing: '-0.02em' }}>대본 입력</span>
              <span className="badge">텍스트</span>
            </div>
            {/* Steps */}
            <div style={{ background: 'var(--white)', borderRadius: R.lg, overflow: 'hidden', marginBottom: 2 }}>
              {[
                { n: '01', label: '대본 분석 & 씬 분할', api: 'Claude 3.5 Sonnet' },
                { n: '02', label: '음성 생성 (TTS)',     api: 'ElevenLabs · Clova' },
                { n: '03', label: '시각 생성',            api: 'DALL-E 3 · Runway' },
                { n: '04', label: 'BGM 생성',             api: 'Suno AI' },
                { n: '05', label: '영상 합성',            api: 'FFmpeg · Whisper' },
              ].map((p, i) => (
                <div key={i} className="pipe-step" style={{ padding: '14px 20px', borderBottom: i < 4 ? '1px solid var(--g08)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--g30)', minWidth: 18, letterSpacing: '0.02em' }}>{p.n}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)', letterSpacing: '-0.02em' }}>{p.label}</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--g30)', fontWeight: 400 }}>{p.api}</span>
                </div>
              ))}
            </div>
            {/* Output */}
            <div style={{ background: 'var(--black)', borderRadius: R.lg, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)', letterSpacing: '-0.02em' }}>완성 영상 MP4</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>YouTube 직접 업로드</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ padding: '80px 28px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', fontWeight: 800, letterSpacing: '-0.05em', color: 'var(--black)' }}>사용 방법</h2>
            <p className="label">3단계로 완성</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { num: '01', title: '대본 입력', desc: '유튜브 영상 대본이나 콘텐츠 원고를 붙여넣거나 파일(.txt, .docx)을 업로드하세요.' },
              { num: '02', title: 'AI 자동 생성', desc: '5단계 파이프라인이 병렬로 실행됩니다. 나레이션, 이미지, 영상 클립, BGM을 동시에 처리합니다.' },
              { num: '03', title: '내보내기', desc: '완성된 영상을 1080p MP4로 다운로드하거나 YouTube에 직접 업로드하세요.' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--g04)', borderRadius: R.xl, padding: '36px 32px' }}>
                <p style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.06em', color: 'var(--g08)', lineHeight: 1, marginBottom: 28 }}>{s.num}</p>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 12, color: 'var(--black)' }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--g50)', fontWeight: 400 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '80px 28px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', fontWeight: 800, letterSpacing: '-0.05em', color: 'var(--black)', marginBottom: 12 }}>
            전부 자동입니다
          </h2>
          <p style={{ fontSize: 16, color: 'var(--g50)', fontWeight: 400, marginBottom: 48 }}>대본만 넣으면 나머지는 AI가 처리합니다</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { title: '자동 씬 분할', desc: 'Claude AI가 대본의 내러티브 흐름과 주제 전환점을 파악해 최적의 씬을 구성합니다. 씬별 시각 프롬프트도 자동 생성합니다.' },
              { title: '멀티 TTS 지원', desc: 'ElevenLabs, Naver Clova Voice, OpenAI TTS 등 10개 이상의 고품질 나레이터 목소리를 지원합니다.' },
              { title: 'AI 영상 클립 생성', desc: 'Runway Gen-3으로 씬별 영상 클립을 생성합니다. 씬 길이에 따라 이미지/영상 클립을 자동으로 선택합니다.' },
              { title: '정확한 word-level 자막', desc: 'TTS로 생성된 음성을 Whisper로 전사해 단어 단위 타임스탬프 자막을 만듭니다.' },
            ].map((f, i) => (
              <div key={i} style={{ background: 'var(--g04)', borderRadius: R.xl, padding: '36px 32px' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--black)', marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--g50)', fontWeight: 400 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ padding: '80px 28px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', fontWeight: 800, letterSpacing: '-0.05em', color: 'var(--black)', marginBottom: 12 }}>가격</h2>
          <p style={{ fontSize: 15, color: 'var(--g50)', marginBottom: 48 }}>씬 1개 · 이미지 2크레딧 · 영상 클립 8크레딧</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { name: '무료',   price: '₩0',      credits: '30 크레딧',     note: '가입 시 1회', features: ['720p 출력', '기본 목소리 3종', '워터마크 없음'], dark: false },
              { name: '베이직', price: '₩19,000', credits: '200 크레딧/월', note: '인기',         features: ['1080p 출력', '목소리 10종', 'YouTube 업로드', '우선 처리'], dark: true },
              { name: '프로',   price: '₩49,000', credits: '600 크레딧/월', note: '팀용',         features: ['4K 출력', '목소리 전체 + 클로닝', 'API 접근', '팀 협업 3인'], dark: false },
            ].map((plan, i) => (
              <div key={i} style={{ background: plan.dark ? 'var(--black)' : 'var(--g04)', borderRadius: R.xl, padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em', color: plan.dark ? 'rgba(255,255,255,0.6)' : 'var(--g50)' }}>{plan.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: R.full, background: plan.dark ? 'rgba(255,255,255,0.12)' : 'var(--white)', color: plan.dark ? 'rgba(255,255,255,0.5)' : 'var(--g50)' }}>{plan.note}</span>
                </div>
                <p style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: plan.dark ? 'var(--white)' : 'var(--black)', marginBottom: 4 }}>{plan.price}</p>
                <p style={{ fontSize: 13, color: plan.dark ? 'rgba(255,255,255,0.35)' : 'var(--g30)', marginBottom: 32 }}>{plan.credits}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 32 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: plan.dark ? 'rgba(255,255,255,0.3)' : 'var(--g30)', flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: plan.dark ? 'rgba(255,255,255,0.7)' : 'var(--g70)', fontWeight: 400 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/editor" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '12px', borderRadius: R.full, fontSize: 14, fontWeight: 600,
                  letterSpacing: '-0.02em', textDecoration: 'none',
                  background: plan.dark ? 'rgba(255,255,255,0.1)' : 'var(--white)',
                  border: `1.5px solid ${plan.dark ? 'rgba(255,255,255,0.15)' : 'var(--g15)'}`,
                  color: plan.dark ? 'var(--white)' : 'var(--black)',
                  transition: 'opacity 0.15s',
                }}>
                  {plan.name === '무료' ? '시작하기' : '구독하기'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '20px 28px 80px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ background: 'var(--black)', borderRadius: R.xl, padding: '72px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.05em', color: 'var(--white)', lineHeight: 1.05, marginBottom: 14 }}>
                지금 바로<br />
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>시작하세요</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>가입 즉시 30 크레딧 무료 제공 · 신용카드 불필요</p>
            </div>
            <Link href="/editor" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--white)', color: 'var(--black)',
              fontSize: 15, fontWeight: 700, letterSpacing: '-0.03em',
              padding: '14px 30px', borderRadius: R.full,
              textDecoration: 'none', transition: 'opacity 0.15s',
            }}>
              무료로 시작하기 <Arrow size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--g08)', padding: '28px 0' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="point" />
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--black)' }}>ScriptRoll</span>
            <span style={{ fontSize: 12, color: 'var(--g30)', marginLeft: 2 }}>데모 버전</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['개인정보처리방침', '이용약관', '문의하기'].map(t => (
              <span key={t} style={{ fontSize: 13, color: 'var(--g30)', cursor: 'pointer', fontWeight: 400 }}>{t}</span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--g30)' }}>© 2025 ScriptRoll</p>
        </div>
      </footer>
    </div>
  )
}
