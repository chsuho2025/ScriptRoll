import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-base relative">
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />

      {/* NAV */}
      <nav className="glass-nav sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)' }}
            >
              SR
            </div>
            <span className="font-bold text-[17px] text-slate-800 tracking-tight">ScriptRoll</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['기능', '사용법', '가격'].map((item) => (
              <span
                key={item}
                className="text-[14px] font-medium text-slate-500 hover:text-sky-600 cursor-pointer transition-colors"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:block text-[14px] font-medium text-slate-500 hover:text-slate-700 cursor-pointer transition-colors">
              로그인
            </span>
            <Link href="/editor" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '11px' }}>
              무료 시작
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div
            className="animate-fade-up inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold text-sky-700 mb-7"
            style={{ background: 'rgba(224, 242, 254, 0.85)', border: '1.5px solid rgba(125, 211, 252, 0.5)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-sky-400"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            />
            AI 영상 생성 플랫폼
          </div>

          {/* H1 */}
          <h1
            className="animate-fade-up-1 font-extrabold tracking-tight text-slate-900 mb-6"
            style={{ fontSize: 'clamp(42px, 7vw, 76px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            대본 하나면,<br />
            <span className="text-sky-gradient">YouTube 영상</span>이 완성됩니다
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up-2 text-slate-500 mx-auto mb-10"
            style={{ fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.7, maxWidth: '560px' }}
          >
            AI가 나레이션, 영상 클립, 배경음악을<br className="hidden md:block" /> 모두 자동으로 생성합니다.
          </p>

          {/* CTA */}
          <div className="animate-fade-up-3 flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link href="/editor" className="btn-primary" style={{ fontSize: '17px', padding: '16px 36px', borderRadius: '16px' }}>
              무료로 시작하기
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/editor" className="btn-secondary" style={{ fontSize: '17px', padding: '16px 32px', borderRadius: '16px' }}>
              데모 보기
            </Link>
          </div>

          {/* Hero Visual — Script to Scenes mockup */}
          <div className="animate-fade-up-4 relative mx-auto" style={{ maxWidth: '900px' }}>
            <div
              className="glass-card p-6 md:p-8"
              style={{ boxShadow: '0 24px 80px rgba(125, 211, 252, 0.22), 0 4px 16px rgba(0,0,0,0.06)' }}
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Script input */}
                <div className="flex-1 w-full">
                  <div
                    className="rounded-2xl p-5 text-left"
                    style={{ background: 'rgba(248, 250, 252, 0.8)', border: '1.5px solid rgba(226, 232, 240, 0.8)' }}
                  >
                    <p className="text-[11px] font-semibold text-sky-600 uppercase tracking-widest mb-3">대본 입력</p>
                    <p className="text-slate-600 text-[13px] leading-relaxed line-clamp-5">
                      안녕하세요, 오늘은 제주도 3박 4일 여행 브이로그를 함께 떠나볼게요.
                      <br /><br />
                      첫 번째 목적지는 성산일출봉입니다. 유네스코 세계자연유산으로 지정된 이곳은 해발 182미터의...
                      <br /><br />
                      다음으로는 협재해수욕장으로 이동했습니다. 에메랄드빛 바다와...
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <div
                    className="rounded-2xl px-4 py-3 text-white text-[12px] font-bold text-center whitespace-nowrap"
                    style={{ background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)', boxShadow: '0 4px 16px rgba(56,189,248,0.4)' }}
                  >
                    AI 변환
                  </div>
                  <svg className="hidden md:block mt-1" width="28" height="16" viewBox="0 0 28 16">
                    <path d="M0 8H24M18 2L24 8L18 14" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>

                {/* Scene thumbnails */}
                <div className="flex-1 w-full">
                  <p className="text-[11px] font-semibold text-sky-600 uppercase tracking-widest mb-3">생성된 씬</p>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { label: '씬 1 · 인트로', color: 'from-sky-400 to-blue-500', w: '90%' },
                      { label: '씬 2 · 성산일출봉', color: 'from-orange-400 to-rose-500', w: '100%' },
                      { label: '씬 3 · 협재해수욕장', color: 'from-cyan-400 to-teal-500', w: '85%' },
                    ].map((scene, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden"
                        style={{ width: scene.w, animationDelay: `${i * 0.15}s` }}
                      >
                        <div className={`bg-gradient-to-r ${scene.color} h-11 flex items-center px-4`}>
                          <span className="text-white text-[12px] font-semibold drop-shadow-sm">{scene.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stats */}
            <div
              className="absolute -bottom-5 left-8 hidden md:block glass-strong rounded-2xl px-5 py-3 z-10"
              style={{ boxShadow: '0 8px 24px rgba(125, 211, 252, 0.2)' }}
            >
              <p className="text-[11px] text-slate-400 mb-0.5">평균 생성 시간</p>
              <p className="font-bold text-sky-600 text-[20px] tracking-tight">12분</p>
            </div>
            <div
              className="absolute -top-5 right-8 hidden md:block glass-strong rounded-2xl px-5 py-3 z-10"
              style={{ boxShadow: '0 8px 24px rgba(125, 211, 252, 0.2)' }}
            >
              <p className="text-[11px] text-slate-400 mb-0.5">지원 언어</p>
              <p className="font-bold text-sky-600 text-[20px] tracking-tight">한 · EN · JP</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '5단계', label: 'AI 파이프라인' },
                { value: '12분', label: '평균 생성 시간' },
                { value: '1080p', label: '출력 품질' },
                { value: '10+', label: '나레이터 목소리' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="font-extrabold text-sky-600 mb-1.5" style={{ fontSize: '32px', letterSpacing: '-0.04em' }}>
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-[14px] font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PIPELINE DEMO */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sky-500 font-semibold text-[13px] uppercase tracking-widest mb-3">AI 파이프라인</p>
          <h2
            className="font-extrabold text-slate-800 mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.03em' }}
          >
            5단계 병렬 처리 구조
          </h2>
          <p className="text-slate-400 text-[16px] mb-12">
            1단계 분석 완료 후 TTS · 시각 생성 · BGM을 동시에 처리합니다
          </p>

          <div className="glass-card p-8 text-left">
            {/* Input */}
            <div
              className="rounded-xl px-5 py-3 mb-6 text-center"
              style={{ background: 'rgba(248, 250, 252, 0.8)', border: '1.5px solid rgba(226, 232, 240, 0.6)' }}
            >
              <span className="text-slate-500 font-medium text-[14px]">대본 입력</span>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                { label: '1단계 · 대본 분석 & 씬 분할', api: 'Claude 3.5 Sonnet', color: 'bg-purple-100 text-purple-700' },
                { label: '2단계 · 음성 생성 (TTS)', api: 'ElevenLabs · Clova', color: 'bg-teal-100 text-teal-700' },
                { label: '3단계 · 시각 생성', api: 'DALL-E 3 · Runway', color: 'bg-rose-100 text-rose-700' },
                { label: '4단계 · BGM 생성', api: 'Suno AI · Udio', color: 'bg-amber-100 text-amber-700' },
                { label: '5단계 · 영상 합성 & 렌더링', api: 'FFmpeg · Whisper', color: 'bg-sky-100 text-sky-700' },
              ].map((step, i) => (
                <div
                  key={i}
                  className="pipeline-step flex items-center justify-between rounded-xl px-5 py-3.5"
                  style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)' }}
                >
                  <span className="font-semibold text-slate-700 text-[14px]">{step.label}</span>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${step.color}`}>
                    {step.api}
                  </span>
                </div>
              ))}
            </div>

            {/* Output */}
            <div
              className="rounded-xl px-5 py-3 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(224,242,254,0.8), rgba(186,230,253,0.6))', border: '1.5px solid rgba(125,211,252,0.4)' }}
            >
              <span className="text-sky-700 font-semibold text-[14px]">완성 영상 MP4 · YouTube 업로드</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sky-500 font-semibold text-[13px] uppercase tracking-widest mb-3">사용 방법</p>
          <h2
            className="font-extrabold text-slate-800 mb-14"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.03em' }}
          >
            3단계로 완성
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: '대본 입력',
                desc: 'YouTube 영상 대본이나 콘텐츠 원고를 붙여넣거나 직접 작성하세요. .txt, .docx 파일도 지원합니다.',
                color: 'from-sky-50 to-blue-50',
              },
              {
                num: '02',
                title: 'AI 자동 생성',
                desc: '5단계 파이프라인이 병렬로 실행됩니다. 나레이션, 이미지/영상 클립, BGM을 동시에 처리합니다.',
                color: 'from-purple-50 to-pink-50',
              },
              {
                num: '03',
                title: '다운로드 & 업로드',
                desc: '완성된 영상을 1080p MP4로 다운로드하거나 YouTube에 직접 업로드하세요.',
                color: 'from-teal-50 to-emerald-50',
              },
            ].map((step, i) => (
              <div key={i} className={`glass-card p-8 bg-gradient-to-br ${step.color} text-left`}>
                <p
                  className="font-extrabold mb-5"
                  style={{ fontSize: '42px', letterSpacing: '-0.04em', color: 'rgba(125, 211, 252, 0.5)' }}
                >
                  {step.num}
                </p>
                <h3 className="font-bold text-slate-800 text-[20px] mb-3">{step.title}</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sky-500 font-semibold text-[13px] uppercase tracking-widest mb-3">주요 기능</p>
          <h2
            className="font-extrabold text-slate-800 mb-14"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.03em' }}
          >
            전부 자동입니다
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04" />
                  </svg>
                ),
                title: '자동 씬 분할',
                desc: 'Claude AI가 대본의 내러티브 흐름, 주제 전환점, 강조 포인트를 파악해 최적의 씬을 구성합니다.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-500">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
                  </svg>
                ),
                title: '멀티 TTS 지원',
                desc: 'ElevenLabs, Naver Clova Voice, OpenAI TTS 등 10개 이상의 고품질 나레이터 목소리를 지원합니다.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="m10 8 6 4-6 4Z" />
                  </svg>
                ),
                title: 'AI 영상 클립 생성',
                desc: 'Runway Gen-3으로 씬별 최적화된 영상 클립을 생성합니다. 씬 길이에 따라 이미지/영상을 자동으로 선택합니다.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                ),
                title: 'AI BGM 자동 생성',
                desc: 'Suno AI가 영상의 분위기와 키워드를 분석해 전용 배경음악을 생성합니다. 볼륨 믹싱까지 자동으로.',
              },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-7 text-left flex gap-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.9)' }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-[17px] mb-2">{feature.title}</h3>
                  <p className="text-slate-500 text-[14px] leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sky-500 font-semibold text-[13px] uppercase tracking-widest mb-3">가격</p>
          <h2
            className="font-extrabold text-slate-800 mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.03em' }}
          >
            투명한 크레딧 요금제
          </h2>
          <p className="text-slate-400 text-[16px] mb-14">씬 1개당 이미지 2크레딧 · 영상 클립 8크레딧</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: '무료',
                price: '₩0',
                period: '가입 시 1회',
                credits: '30',
                popular: false,
                features: ['30 크레딧 제공', '720p 출력', '기본 목소리 3종', '워터마크 없음'],
              },
              {
                name: '베이직',
                price: '₩19,000',
                period: '/월',
                credits: '200',
                popular: true,
                features: ['200 크레딧/월', '1080p 출력', '목소리 10종', '우선 처리', 'YouTube 직접 업로드'],
              },
              {
                name: '프로',
                price: '₩49,000',
                period: '/월',
                credits: '600',
                popular: false,
                features: ['600 크레딧/월', '4K 출력', '목소리 전체', 'API 접근', '팀 협업 (3인)'],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`glass-card p-8 text-left relative ${plan.popular ? 'ring-2 ring-sky-400' : ''}`}
                style={plan.popular ? { boxShadow: '0 16px 48px rgba(56,189,248,0.2)' } : {}}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-[12px] font-bold"
                    style={{ background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)' }}
                  >
                    인기
                  </div>
                )}
                <p className="font-bold text-slate-600 text-[14px] mb-3">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className={`font-extrabold ${plan.popular ? 'text-sky-gradient' : 'text-slate-800'}`}
                    style={{ fontSize: '34px', letterSpacing: '-0.04em' }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-slate-400 text-[14px]">{plan.period}</span>
                </div>
                <p className="text-sky-500 font-semibold text-[13px] mb-6">{plan.credits} 크레딧</p>

                <div className="flex flex-col gap-2.5 mb-8">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="text-slate-600 text-[14px]">{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/editor"
                  className={plan.popular ? 'btn-primary w-full text-center justify-center' : 'btn-secondary w-full text-center justify-center'}
                  style={{ display: 'flex', borderRadius: '13px', padding: '13px' }}
                >
                  {plan.name === '무료' ? '무료 시작' : '구독하기'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-3xl p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(224,242,254,0.85) 0%, rgba(186,230,253,0.7) 100%)',
              border: '1.5px solid rgba(125,211,252,0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 64px rgba(56,189,248,0.15)',
            }}
          >
            <h2
              className="font-extrabold text-slate-800 mb-4"
              style={{ fontSize: 'clamp(26px, 4vw, 40px)', letterSpacing: '-0.03em' }}
            >
              지금 바로 시작하세요
            </h2>
            <p className="text-slate-500 text-[16px] mb-8">가입 즉시 30 크레딧 무료 제공. 신용카드 불필요.</p>
            <Link
              href="/editor"
              className="btn-primary"
              style={{ fontSize: '17px', padding: '16px 40px', borderRadius: '16px' }}
            >
              무료로 시작하기
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)' }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-bold"
                  style={{ background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)' }}
                >
                  SR
                </div>
                <span className="font-bold text-slate-700">ScriptRoll</span>
              </div>
              <p className="text-slate-400 text-[13px]">AI 영상 생성 플랫폼 · 데모 버전</p>
            </div>
            <div className="flex flex-wrap gap-6">
              {['개인정보처리방침', '이용약관', '문의하기'].map((item) => (
                <span key={item} className="text-slate-400 text-[13px] hover:text-slate-600 cursor-pointer transition-colors">
                  {item}
                </span>
              ))}
            </div>
            <p className="text-slate-300 text-[12px]">© 2025 ScriptRoll. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
