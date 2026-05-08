import Link from 'next/link'

function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function Home() {
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      {/* ── Nav ── */}
      <nav className="nav-bar">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="point point-pulse" />
            <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.02em', color: 'var(--black)' }}>ScriptRoll</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {['기능', '사용법', '가격'].map((item) => (
              <span key={item} style={{ fontSize: 14, color: 'var(--gray-50)', cursor: 'pointer' }}>
                {item}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 14, color: 'var(--gray-50)', cursor: 'pointer' }}>로그인</span>
            <Link href="/editor" className="btn-primary btn-sm">
              시작하기
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 32px 80px' }}>
        <div style={{ maxWidth: 720 }}>
          {/* Label */}
          <div className="label fade-up" style={{ marginBottom: 28 }}>
            <span className="point point-pulse" />
            AI 영상 생성 플랫폼
          </div>

          {/* Headline */}
          <h1
            className="serif fade-up-1"
            style={{
              fontSize: 'clamp(52px, 7.5vw, 96px)',
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--black)',
              marginBottom: 28,
            }}
          >
            대본 하나면,<br />
            <span style={{ fontStyle: 'italic' }}>영상이 됩니다</span>
          </h1>

          {/* Sub */}
          <p
            className="fade-up-2"
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: 'var(--gray-50)',
              maxWidth: 480,
              marginBottom: 44,
              fontWeight: 300,
            }}
          >
            AI가 나레이션, 영상 클립, 배경음악을<br />
            모두 자동으로 생성합니다.
          </p>

          {/* CTA */}
          <div className="fade-up-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/editor" className="btn-primary" style={{ fontSize: 15, padding: '13px 28px' }}>
              무료로 시작하기 <ArrowRight />
            </Link>
            <Link href="/editor" className="btn-ghost" style={{ fontSize: 15, padding: '13px 28px' }}>
              데모 보기
            </Link>
          </div>
        </div>

        {/* Hero visual — clean editorial mockup */}
        <div className="fade-up-4" style={{ marginTop: 80 }}>
          <div style={{ borderTop: '1px solid var(--gray-08)', paddingTop: 48 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, border: '1px solid var(--gray-08)', borderRadius: 10, overflow: 'hidden', background: 'var(--gray-08)' }}>
              {/* Col 1: Script */}
              <div style={{ background: 'var(--white)', padding: 28 }}>
                <p className="label" style={{ marginBottom: 16 }}>대본 입력</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['제주도 여행 브이로그 — 3박 4일', '성산일출봉: 해발 182m 자연 걸작', '협재해수욕장의 에메랄드빛 바다', '제주 흑돼지 오겹살'].map((line, i) => (
                    <div key={i} style={{ height: 1, background: i === 0 ? 'var(--black)' : 'var(--gray-08)', width: i === 0 ? '100%' : `${85 - i * 12}%`, borderRadius: 1 }} />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ height: 1, background: 'var(--gray-08)', width: `${60 + Math.sin(i) * 25}%`, borderRadius: 1 }} />
                  ))}
                </div>
              </div>

              {/* Col 2: Analysis */}
              <div style={{ background: 'var(--gray-04)', padding: 28 }}>
                <p className="label" style={{ marginBottom: 16 }}>AI 분석</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['씬 분할', 'TTS 생성', '시각 생성', 'BGM 생성', '합성'].map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: i < 2 ? 'var(--black)' : 'var(--gray-15)',
                        flexShrink: 0,
                      }} />
                      <span style={{ fontSize: 13, color: i < 2 ? 'var(--black)' : 'var(--gray-30)', fontWeight: i < 2 ? 500 : 400 }}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 3: Output */}
              <div style={{ background: 'var(--white)', padding: 28 }}>
                <p className="label" style={{ marginBottom: 16 }}>결과물</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['씬 1 · 인트로', '씬 2 · 성산일출봉', '씬 3 · 협재해수욕장', '씬 4 · 흑돼지'].map((sc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, color: 'var(--gray-70)', fontWeight: 400 }}>{sc}</span>
                      <span style={{ fontSize: 11, color: 'var(--gray-30)' }}>✓</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, height: 32, borderRadius: 5, background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--white)', fontWeight: 500, letterSpacing: '0.04em' }}>MP4 내보내기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats row ── */}
      <section style={{ borderTop: '1px solid var(--gray-08)', borderBottom: '1px solid var(--gray-08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { num: '5단계', label: 'AI 파이프라인' },
            { num: '12분', label: '평균 생성 시간' },
            { num: '1080p', label: '출력 품질' },
            { num: '10+', label: '나레이터 목소리' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '36px 0',
              borderRight: i < 3 ? '1px solid var(--gray-08)' : 'none',
              paddingLeft: i === 0 ? 0 : 40,
            }}>
              <p className="serif" style={{ fontSize: 40, fontWeight: 400, letterSpacing: '-0.04em', color: 'var(--black)', lineHeight: 1, marginBottom: 6 }}>
                {stat.num}
              </p>
              <p style={{ fontSize: 13, color: 'var(--gray-50)', fontWeight: 400 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pipeline section ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left: text */}
          <div>
            <p className="label" style={{ marginBottom: 24 }}>AI 파이프라인</p>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
              5단계 병렬<br />
              <span style={{ fontStyle: 'italic' }}>처리 구조</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--gray-50)', fontWeight: 300 }}>
              1단계 분석 완료 후 TTS, 시각 생성, BGM을 동시에 처리합니다. 씬 단위로 병렬 실행해 처리 시간을 단축합니다.
            </p>
            <div style={{ marginTop: 40 }}>
              <Link href="/editor" className="btn-primary" style={{ fontSize: 14 }}>
                직접 사용해보기 <ArrowRight />
              </Link>
            </div>
          </div>

          {/* Right: pipeline steps */}
          <div style={{ paddingTop: 8 }}>
            <div style={{ border: '1px solid var(--gray-08)', borderRadius: 10, overflow: 'hidden' }}>
              {/* input bar */}
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-08)', background: 'var(--gray-04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--gray-70)', fontWeight: 500 }}>대본 입력</span>
                <span className="badge">텍스트</span>
              </div>
              {/* steps */}
              {[
                { step: '01', label: '대본 분석 & 씬 분할', api: 'Claude 3.5 Sonnet' },
                { step: '02', label: '음성 생성 (TTS)', api: 'ElevenLabs · Clova' },
                { step: '03', label: '시각 생성', api: 'DALL-E 3 · Runway' },
                { step: '04', label: 'BGM 생성', api: 'Suno AI' },
                { step: '05', label: '영상 합성', api: 'FFmpeg · Whisper' },
              ].map((p, i) => (
                <div key={i} className="pipe-step" style={{ padding: '14px 20px', borderBottom: i < 4 ? '1px solid var(--gray-08)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--white)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span className="serif" style={{ fontSize: 11, color: 'var(--gray-30)', fontStyle: 'italic', minWidth: 20 }}>{p.step}</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--black)' }}>{p.label}</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--gray-30)' }}>{p.api}</span>
                </div>
              ))}
              {/* output */}
              <div style={{ padding: '14px 20px', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--white)', fontWeight: 500 }}>완성 영상 MP4</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>YouTube 직접 업로드</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ borderTop: '1px solid var(--gray-08)', padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 60 }}>
            <h2 className="serif" style={{ fontSize: 'clamp(34px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-0.03em' }}>
              사용 방법
            </h2>
            <p className="label">3단계로 완성</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, border: '1px solid var(--gray-08)', borderRadius: 10, overflow: 'hidden', background: 'var(--gray-08)' }}>
            {[
              {
                num: '01',
                title: '대본 입력',
                desc: 'YouTube 영상 대본이나 콘텐츠 원고를 붙여넣거나 파일(.txt, .docx)을 업로드하세요.',
              },
              {
                num: '02',
                title: 'AI 자동 생성',
                desc: '5단계 파이프라인이 병렬로 실행됩니다. 나레이션, 이미지/영상 클립, BGM을 동시에 처리합니다.',
              },
              {
                num: '03',
                title: '내보내기',
                desc: '완성된 영상을 1080p MP4로 다운로드하거나 YouTube에 직접 업로드하세요.',
              },
            ].map((step, i) => (
              <div key={i} style={{ background: 'var(--white)', padding: 40 }}>
                <p className="serif" style={{ fontSize: 48, fontWeight: 400, color: 'var(--gray-08)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 32, fontStyle: 'italic' }}>
                  {step.num}
                </p>
                <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12, color: 'var(--black)' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--gray-50)', fontWeight: 300 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ borderTop: '1px solid var(--gray-08)', padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <p className="label" style={{ marginBottom: 24 }}>주요 기능</p>
          <h2 className="serif" style={{ fontSize: 'clamp(34px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: 64 }}>
            전부 자동입니다
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid var(--gray-08)', borderRadius: 10, overflow: 'hidden', background: 'var(--gray-08)' }}>
            {[
              {
                title: '자동 씬 분할',
                desc: 'Claude AI가 대본의 내러티브 흐름, 주제 전환점, 강조 포인트를 파악해 최적의 씬을 구성합니다. 씬별 시각 프롬프트도 자동 생성합니다.',
              },
              {
                title: '멀티 TTS 지원',
                desc: 'ElevenLabs, Naver Clova Voice, OpenAI TTS 등 10개 이상의 고품질 나레이터 목소리를 지원합니다. 목소리 클로닝도 지원합니다.',
              },
              {
                title: 'AI 영상 클립 생성',
                desc: 'Runway Gen-3으로 씬별 최적화된 영상 클립을 생성합니다. 씬 길이에 따라 이미지/영상 클립을 자동으로 선택합니다.',
              },
              {
                title: '정확한 word-level 자막',
                desc: 'TTS로 생성된 음성을 Whisper로 전사해 단어 단위 타임스탬프 자막을 만듭니다. STT 방식 대비 정확도가 압도적입니다.',
              },
            ].map((f, i) => (
              <div key={i} style={{ background: 'var(--white)', padding: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--black)' }}>{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--gray-50)', fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ borderTop: '1px solid var(--gray-08)', padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 64 }}>
            <h2 className="serif" style={{ fontSize: 'clamp(34px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-0.03em' }}>
              가격
            </h2>
            <p style={{ fontSize: 13, color: 'var(--gray-50)' }}>씬 1개 · 이미지 2 크레딧 · 영상 클립 8 크레딧</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, border: '1px solid var(--gray-08)', borderRadius: 10, overflow: 'hidden', background: 'var(--gray-08)' }}>
            {[
              {
                name: '무료',
                price: '₩0',
                credits: '30 크레딧',
                note: '가입 시 1회 지급',
                features: ['720p 출력', '기본 목소리 3종', '워터마크 없음'],
                cta: '시작하기',
                dark: false,
              },
              {
                name: '베이직',
                price: '₩19,000',
                credits: '200 크레딧/월',
                note: '인기',
                features: ['1080p 출력', '목소리 10종', 'YouTube 직접 업로드', '우선 처리'],
                cta: '구독하기',
                dark: true,
              },
              {
                name: '프로',
                price: '₩49,000',
                credits: '600 크레딧/월',
                note: '팀용',
                features: ['4K 출력', '목소리 전체 + 클로닝', 'API 접근', '팀 협업 3인'],
                cta: '구독하기',
                dark: false,
              },
            ].map((plan, i) => (
              <div key={i} style={{
                background: plan.dark ? 'var(--black)' : 'var(--white)',
                padding: 40,
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: plan.dark ? 'rgba(255,255,255,0.6)' : 'var(--gray-50)' }}>{plan.name}</span>
                  <span style={{ fontSize: 11, color: plan.dark ? 'rgba(255,255,255,0.4)' : 'var(--gray-30)', fontWeight: 500 }}>{plan.note}</span>
                </div>

                <p className="serif" style={{ fontSize: 44, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1, color: plan.dark ? 'var(--white)' : 'var(--black)', marginBottom: 4 }}>
                  {plan.price}
                </p>
                <p style={{ fontSize: 13, color: plan.dark ? 'rgba(255,255,255,0.45)' : 'var(--gray-30)', marginBottom: 36 }}>{plan.credits}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40, flex: 1 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: plan.dark ? 'rgba(255,255,255,0.35)' : 'var(--gray-30)', flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: plan.dark ? 'rgba(255,255,255,0.7)' : 'var(--gray-70)', fontWeight: 400 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/editor"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '11px 20px', borderRadius: 6, fontSize: 14, fontWeight: 500,
                    textDecoration: 'none', letterSpacing: '-0.01em',
                    background: plan.dark ? 'rgba(255,255,255,0.1)' : 'transparent',
                    border: `1.5px solid ${plan.dark ? 'rgba(255,255,255,0.2)' : 'var(--gray-15)'}`,
                    color: plan.dark ? 'var(--white)' : 'var(--black)',
                    transition: 'all 0.15s',
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderTop: '1px solid var(--gray-08)', background: 'var(--black)', padding: '100px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 className="serif" style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--white)', lineHeight: 1.05, marginBottom: 20 }}>
              지금 바로<br />
              <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>시작하세요</span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
              가입 즉시 30 크레딧 무료 제공 · 신용카드 불필요
            </p>
          </div>
          <Link
            href="/editor"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--white)', color: 'var(--black)',
              fontSize: 15, fontWeight: 500, padding: '13px 28px',
              borderRadius: 6, border: 'none', cursor: 'pointer',
              textDecoration: 'none', letterSpacing: '-0.01em',
              transition: 'opacity 0.15s',
            }}
          >
            무료로 시작하기 <ArrowRight />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--gray-08)', padding: '32px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="point" />
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--black)' }}>ScriptRoll</span>
            <span style={{ fontSize: 13, color: 'var(--gray-30)', marginLeft: 4 }}>데모 버전</span>
          </div>

          <div style={{ display: 'flex', gap: 24 }}>
            {['개인정보처리방침', '이용약관', '문의하기'].map((item) => (
              <span key={item} style={{ fontSize: 13, color: 'var(--gray-30)', cursor: 'pointer' }}>{item}</span>
            ))}
          </div>

          <p style={{ fontSize: 12, color: 'var(--gray-30)' }}>© 2025 ScriptRoll</p>
        </div>
      </footer>
    </div>
  )
}
