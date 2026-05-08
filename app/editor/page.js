'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── Dummy data ── */
const DUMMY_SCRIPT = `안녕하세요, 오늘은 제주도 3박 4일 여행 브이로그를 함께 떠나볼게요.

이번 여행의 첫 번째 목적지는 성산일출봉입니다. 유네스코 세계자연유산으로 지정된 이곳은 해발 182미터의 거대한 분화구가 만들어낸 자연의 걸작입니다. 이른 아침, 일출을 보기 위해 새벽 5시에 등반을 시작했습니다.

다음으로는 제주의 보석, 협재해수욕장으로 이동했습니다. 에메랄드빛 바다와 하얀 모래사장이 어우러진 이 해변은 한국에서 가장 아름다운 해변 중 하나로 꼽힙니다.

점심 식사는 제주 흑돼지 오겹살로 즐겼습니다. 제주 흑돼지는 본토 돼지와는 다른 독특한 맛과 식감을 자랑합니다.

오후에는 한라산 등반에 도전했습니다. 해발 1,947미터로 대한민국에서 가장 높은 산인 한라산은 사계절 내내 다양한 표정을 보여줍니다.

마지막 날은 제주 올레길 7코스를 걸으며 여행을 마무리했습니다. 푸른 바다를 바라보며 걷는 이 길에서 제주의 진정한 아름다움을 느낄 수 있었습니다.`

const SCENES = [
  { id: 1, title: '여행 인트로', duration: '0:12', prompt: 'Aerial view of Jeju Island, turquoise ocean, volcanic landscape, cinematic sunrise, 4K documentary style' },
  { id: 2, title: '성산일출봉', duration: '1:24', prompt: 'Seongsan Ilchulbong volcanic crater at sunrise, UNESCO world heritage, misty morning atmosphere, golden light' },
  { id: 3, title: '협재해수욕장', duration: '1:08', prompt: 'Hyeopjae Beach Jeju, emerald water, white sand beach, aerial drone shot, bright natural light' },
  { id: 4, title: '흑돼지 오겹살', duration: '0:52', prompt: 'Jeju black pork belly barbecue on grill, sizzling close-up, Korean restaurant atmosphere, warm light' },
  { id: 5, title: '한라산 등반', duration: '1:36', prompt: 'Mount Hallasan hiking trail, autumn foliage, mountain peak above clouds, dramatic landscape' },
]

const VOICES = [
  { id: 'v1', name: '김민준', style: '차분한 남성', tag: 'ElevenLabs' },
  { id: 'v2', name: '이지연', style: '친근한 여성', tag: 'Clova Voice' },
  { id: 'v3', name: 'Alex', style: 'Neutral male (EN)', tag: 'OpenAI TTS' },
]

const STYLES = [
  { id: 's1', label: '미니멀', desc: '깔끔하고 집중도 높은' },
  { id: 's2', label: '시네마틱', desc: '영화같은 분위기' },
  { id: 's3', label: '에너지틱', desc: '역동적이고 활기찬' },
  { id: 's4', label: '다큐멘터리', desc: '신뢰감 있는 스타일' },
]

const PIPELINE = [
  { label: '대본 분석 & 씬 분할', api: 'Claude 3.5 Sonnet', ms: 2200 },
  { label: '음성 생성 (TTS)', api: 'ElevenLabs', ms: 3800 },
  { label: '시각 생성', api: 'DALL-E 3 · Runway Gen-3', ms: 6500 },
  { label: 'BGM 생성', api: 'Suno AI', ms: 4200 },
  { label: '영상 합성 & 렌더링', api: 'FFmpeg · Whisper', ms: 2800 },
]

const STEP_LABELS = ['대본', '씬 분할', '스타일', '생성 중', '결과']

/* ── Shared icons ── */
function IconArrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
function IconCheck({ size = 12, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
function IconRefresh({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  )
}
function IconChevronLeft({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

const S = {
  sectionTitle: { fontSize: 13, fontWeight: 600, color: 'var(--black)', marginBottom: 4, letterSpacing: '-0.01em' },
  sectionSub: { fontSize: 12, color: 'var(--gray-30)', marginBottom: 20, fontWeight: 400 },
  rowLabel: { fontSize: 13, fontWeight: 500, color: 'var(--gray-50)', minWidth: 100 },
}

export default function EditorPage() {
  const [step, setStep] = useState(1)
  const [script, setScript] = useState(DUMMY_SCRIPT)
  const [analyzing, setAnalyzing] = useState(false)
  const [voice, setVoice] = useState('v1')
  const [style, setStyle] = useState('s2')
  const [ratio, setRatio] = useState('16:9')
  const [pipelineStatus, setPipelineStatus] = useState([])
  const [pipelineProgress, setPipelineProgress] = useState(0)
  const [activeScene, setActiveScene] = useState(0)
  const [scenes, setScenes] = useState(SCENES)
  const [editingPrompt, setEditingPrompt] = useState(null)
  const [promptVal, setPromptVal] = useState('')

  const runAnalysis = () => {
    setAnalyzing(true)
    setTimeout(() => { setAnalyzing(false); setStep(2) }, 2200)
  }

  useEffect(() => {
    if (step !== 4) return
    setPipelineStatus(PIPELINE.map(() => 'pending'))
    setPipelineProgress(0)
    let idx = 0
    const totalMs = PIPELINE.reduce((s, p) => s + p.ms, 0)
    let elapsed = 0
    const advance = () => {
      if (idx >= PIPELINE.length) { setPipelineProgress(100); setTimeout(() => setStep(5), 700); return }
      setPipelineStatus(prev => prev.map((s, i) => i === idx ? 'running' : s))
      const duration = PIPELINE[idx].ms
      const iv = 80; let local = 0
      const t = setInterval(() => {
        local += iv; elapsed += iv
        setPipelineProgress(Math.min(99, Math.round((elapsed / totalMs) * 100)))
        if (local >= duration) { clearInterval(t); setPipelineStatus(prev => prev.map((s, i) => i === idx ? 'done' : s)); idx++; setTimeout(advance, 300) }
      }, iv)
    }
    const d = setTimeout(advance, 400)
    return () => clearTimeout(d)
  }, [step])

  const totalSec = scenes.reduce((acc, s) => {
    const [m, sec] = s.duration.split(':').map(Number); return acc + m * 60 + sec
  }, 0)
  const fmt = (s) => `${Math.floor(s / 60)}분 ${s % 60}초`

  /* ── Step 1 ── */
  const Step1 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ ...S.sectionTitle }}>대본</p>
        <p style={{ ...S.sectionSub }}>유튜브 영상 대본이나 콘텐츠 원고를 입력하세요. .txt, .docx 파일 업로드도 지원합니다.</p>
        <textarea
          className="textarea-base"
          rows={16}
          value={script}
          onChange={e => setScript(e.target.value)}
          placeholder="대본을 여기에 붙여넣으세요..."
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '0 2px' }}>
          <span style={{ fontSize: 12, color: 'var(--gray-30)' }}>{script.length.toLocaleString()}자</span>
          <span style={{ fontSize: 12, color: 'var(--gray-30)' }}>예상 영상 길이: 약 5–7분</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--gray-50)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onClick={() => alert('파일 업로드 (데모 기능)')}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          파일 업로드 (.txt .docx)
        </button>
        <button
          className="btn-primary"
          onClick={runAnalysis}
          disabled={!script.trim() || analyzing}
          style={{ opacity: (!script.trim() || analyzing) ? 0.4 : 1 }}
        >
          {analyzing ? (
            <><span className="spinner-white" />분석 중...</>
          ) : (
            <>분석 시작 <IconArrow /></>
          )}
        </button>
      </div>
    </div>
  )

  /* ── Step 2 ── */
  const Step2 = () => (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <p style={{ ...S.sectionTitle }}>씬 목록 — {scenes.length}개</p>
          <p style={{ ...S.sectionSub, marginBottom: 0 }}>프롬프트를 클릭해 수정할 수 있습니다</p>
        </div>
        <span style={{ fontSize: 12, color: 'var(--gray-30)' }}>총 {fmt(totalSec)}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {scenes.map((scene, i) => (
          <div key={scene.id} style={{ border: '1px solid var(--gray-08)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px' }}>
              {/* number */}
              <span className="serif" style={{ fontSize: 11, color: 'var(--gray-30)', fontStyle: 'italic', minWidth: 16 }}>{String(i + 1).padStart(2, '0')}</span>
              {/* title */}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--black)', letterSpacing: '-0.01em' }}>{scene.title}</p>
              </div>
              {/* duration */}
              <span className="badge">{scene.duration}</span>
            </div>
            {/* prompt row */}
            <div style={{ borderTop: '1px solid var(--gray-08)', padding: '10px 16px', background: 'var(--gray-04)' }}>
              {editingPrompt === i ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    autoFocus
                    className="input-base"
                    value={promptVal}
                    onChange={e => setPromptVal(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        setScenes(prev => prev.map((s, j) => j === i ? { ...s, prompt: promptVal } : s))
                        setEditingPrompt(null)
                      }
                      if (e.key === 'Escape') setEditingPrompt(null)
                    }}
                    style={{ fontSize: 12, fontFamily: 'monospace', flex: 1 }}
                  />
                  <button className="btn-primary btn-sm" onClick={() => {
                    setScenes(prev => prev.map((s, j) => j === i ? { ...s, prompt: promptVal } : s))
                    setEditingPrompt(null)
                  }}>저장</button>
                </div>
              ) : (
                <button
                  onClick={() => { setEditingPrompt(i); setPromptVal(scene.prompt) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 12, color: 'var(--gray-50)', fontFamily: 'monospace', lineHeight: 1.5 }}>
                    {scene.prompt.length > 80 ? scene.prompt.slice(0, 80) + '…' : scene.prompt}
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
        <button className="btn-primary" onClick={() => setStep(3)}>
          스타일 설정 <IconArrow />
        </button>
      </div>
    </div>
  )

  /* ── Step 3 ── */
  const Step3 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      {/* Voice */}
      <div>
        <p style={{ ...S.sectionTitle }}>나레이터 목소리</p>
        <p style={{ ...S.sectionSub }}>씬별 나레이션에 사용할 목소리를 선택하세요</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {VOICES.map(v => (
            <div key={v.id} className={`voice-opt ${voice === v.id ? 'selected' : ''}`} onClick={() => setVoice(v.id)}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', margin: '0 auto 12px',
                background: voice === v.id ? 'var(--black)' : 'var(--gray-08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={voice === v.id ? 'var(--white)' : 'var(--gray-30)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                </svg>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--black)', marginBottom: 2 }}>{v.name}</p>
              <p style={{ fontSize: 12, color: 'var(--gray-50)', marginBottom: 10 }}>{v.style}</p>
              <span className="badge" style={{ fontSize: 10 }}>{v.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Style */}
      <div>
        <p style={{ ...S.sectionTitle }}>영상 스타일</p>
        <p style={{ ...S.sectionSub }}>전체 영상의 시각적 분위기를 선택하세요</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {STYLES.map(s => (
            <div key={s.id} className={`style-opt ${style === s.id ? 'selected' : ''}`} onClick={() => setStyle(s.id)}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: style === s.id ? 'var(--black)' : 'var(--gray-15)',
              }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--black)', letterSpacing: '-0.01em' }}>{s.label}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-50)' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ratio */}
      <div>
        <p style={{ ...S.sectionTitle }}>출력 비율</p>
        <p style={{ ...S.sectionSub }}>영상 포맷을 선택하세요</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { r: '16:9', label: 'YouTube 롱폼', w: 28, h: 16 },
            { r: '9:16', label: 'Shorts · Reels', w: 16, h: 28 },
          ].map(opt => (
            <div key={opt.r} className={`ratio-opt ${ratio === opt.r ? 'selected' : ''}`} onClick={() => setRatio(opt.r)}>
              <div style={{
                width: opt.w, height: opt.h, borderRadius: 2, flexShrink: 0,
                background: ratio === opt.r ? 'var(--black)' : 'var(--gray-15)',
              }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--black)', letterSpacing: '-0.01em' }}>{opt.r}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-50)' }}>{opt.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="btn-primary"
          style={{ fontSize: 15, padding: '13px 28px' }}
          onClick={() => setStep(4)}
        >
          생성 시작
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="m5 3 14 9-14 9V3z" /></svg>
        </button>
      </div>
    </div>
  )

  /* ── Step 4 ── */
  const Step4 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Overall */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--black)' }}>{pipelineProgress}% 완료</p>
          <p style={{ fontSize: 12, color: 'var(--gray-30)' }}>
            {pipelineProgress < 100 ? '처리 중...' : '완료'}
          </p>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pipelineProgress}%` }} />
        </div>
      </div>

      {/* Steps */}
      <div>
        {PIPELINE.map((p, i) => {
          const status = pipelineStatus[i] || 'pending'
          return (
            <div key={i} className="pipeline-item">
              {/* status indicator */}
              <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1.5px solid ${status === 'done' ? 'var(--black)' : status === 'running' ? 'var(--black)' : 'var(--gray-15)'}`,
                background: status === 'done' ? 'var(--black)' : 'transparent',
              }}>
                {status === 'done' ? <IconCheck size={11} color="var(--white)" /> : status === 'running' ? <span className="spinner" /> : null}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: status === 'pending' ? 400 : 500, color: status === 'pending' ? 'var(--gray-30)' : 'var(--black)', letterSpacing: '-0.01em' }}>
                  {p.label}
                </p>
                <p style={{ fontSize: 12, color: 'var(--gray-30)' }}>{p.api}</p>
              </div>
              {status === 'running' && (
                <span style={{ fontSize: 11, color: 'var(--gray-50)', fontWeight: 400 }}>처리 중</span>
              )}
              {status === 'done' && (
                <span style={{ fontSize: 11, color: 'var(--gray-50)' }}>완료</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Scene previews */}
      <div>
        <p style={{ fontSize: 12, color: 'var(--gray-30)', marginBottom: 12, fontWeight: 500 }}>씬 생성 현황</p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {scenes.map((scene, i) => {
            const done = pipelineProgress > (20 + i * 14)
            return (
              <div key={scene.id} style={{
                flexShrink: 0, width: 88, height: 56, borderRadius: 6,
                border: `1px solid ${done ? 'var(--black)' : 'var(--gray-08)'}`,
                background: done ? 'var(--black)' : 'var(--gray-04)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.4s ease',
              }}>
                {done ? (
                  <span style={{ fontSize: 11, color: 'var(--white)', fontWeight: 500 }}>{scene.title}</span>
                ) : (
                  <span className="spinner" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  /* ── Step 5 ── */
  const Step5 = () => (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <p style={{ ...S.sectionTitle, marginBottom: 2 }}>영상 완성</p>
          <p style={{ fontSize: 12, color: 'var(--gray-30)' }}>씬을 선택해 세부 수정 후 내보내세요</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost btn-sm" onClick={() => alert('YouTube 업로드 (데모 기능)')}>
            YouTube 업로드
          </button>
          <button className="btn-primary btn-sm" onClick={() => alert('MP4 다운로드 (데모 기능)')}>
            MP4 내보내기 <IconArrow />
          </button>
        </div>
      </div>

      {/* Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
        {/* Scene list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {scenes.map((scene, i) => (
            <div
              key={scene.id}
              className={`scene-item ${activeScene === i ? 'active' : ''}`}
              onClick={() => setActiveScene(i)}
            >
              <div style={{ display: 'flex', items: 'center', justifyContent: 'space-between', gap: 6 }}>
                <p style={{ fontSize: 13, fontWeight: activeScene === i ? 600 : 400, color: 'var(--black)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  {scene.title}
                </p>
              </div>
              <p style={{ fontSize: 11, color: 'var(--gray-30)', marginTop: 2 }}>{scene.duration}</p>
            </div>
          ))}
        </div>

        {/* Scene detail */}
        <div style={{ border: '1px solid var(--gray-08)', borderRadius: 10, overflow: 'hidden' }}>
          {/* Preview */}
          <div style={{
            background: 'var(--black)',
            aspectRatio: ratio === '16:9' ? '16/9' : '9/16',
            maxHeight: 240,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', cursor: 'pointer',
          }}
          onClick={() => alert('영상 미리보기 (데모 기능)')}
          >
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 20, color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                {scenes[activeScene].title}
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>씬 {scenes[activeScene].id} · {scenes[activeScene].duration}</p>
            </div>
            {/* play btn */}
            <div style={{
              position: 'absolute', bottom: 14, right: 14,
              width: 36, height: 36, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><path d="m5 3 14 9-14 9V3z" /></svg>
            </div>
          </div>

          {/* Details */}
          <div style={{ padding: 20 }}>
            {/* Prompt */}
            <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--gray-30)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>시각 프롬프트</p>
            <div style={{ background: 'var(--gray-04)', borderRadius: 6, padding: '10px 12px', marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: 'var(--gray-70)', fontFamily: 'monospace', lineHeight: 1.6 }}>
                {scenes[activeScene].prompt}
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['영상 재생성', '음성 재생성', 'BGM 변경'].map(action => (
                <button
                  key={action}
                  onClick={() => alert(`${action} (데모 기능)`)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: 12, color: 'var(--gray-70)', fontWeight: 400,
                    background: 'none', border: '1px solid var(--gray-08)',
                    borderRadius: 5, padding: '7px 12px', cursor: 'pointer',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <IconRefresh /> {action}
                </button>
              ))}
            </div>
          </div>

          {/* Export summary */}
          <div style={{ margin: '0 20px 20px', padding: '12px 14px', background: 'var(--gray-04)', borderRadius: 6 }}>
            <p style={{ fontSize: 12, color: 'var(--gray-70)', fontWeight: 500 }}>
              렌더링 완료 · {ratio} · 1080p H.264 · 총 {fmt(totalSec)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const STEP_COMPONENTS = [null, <Step1 key={1} />, <Step2 key={2} />, <Step3 key={3} />, <Step4 key={4} />, <Step5 key={5} />]

  const STEP_TITLES = [
    '대본 입력',
    '씬 분할 확인',
    '스타일 & 목소리',
    '생성 중',
    '결과 확인',
  ]
  const STEP_SUBS = [
    '유튜브 영상 대본이나 콘텐츠 원고를 입력하세요',
    'AI가 분할한 씬과 시각 프롬프트를 확인하세요',
    '나레이터 목소리와 영상 스타일을 설정하세요',
    '5단계 AI 파이프라인이 영상을 생성하고 있습니다',
    '씬 편집 후 최종 내보내기하세요',
  ]

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      {/* Nav */}
      <nav className="nav-bar">
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <span className="point" />
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--black)', letterSpacing: '-0.02em' }}>ScriptRoll</span>
          </Link>

          {/* Step breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {STEP_LABELS.map((label, i) => {
              const n = i + 1
              const isActive = step === n
              const isDone = step > n
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, opacity: isActive ? 1 : isDone ? 0.5 : 0.25 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: `1.5px solid ${isActive ? 'var(--black)' : 'var(--gray-30)'}`,
                      background: isActive ? 'var(--black)' : isDone ? 'var(--black)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {isDone ? <IconCheck size={9} color="var(--white)" /> : (
                        <span style={{ fontSize: 9, fontWeight: 600, color: isActive ? 'var(--white)' : 'var(--gray-30)' }}>{n}</span>
                      )}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: isActive ? 500 : 400, color: isActive ? 'var(--black)' : 'var(--gray-50)', display: 'none' }}
                      className={i < 4 ? 'md:block' : ''}
                    >{label}</span>
                  </div>
                  {i < 4 && <div style={{ width: 16, height: 1, background: 'var(--gray-08)' }} />}
                </div>
              )
            })}
          </div>

          <span style={{ fontSize: 12, color: 'var(--gray-30)' }}>데모</span>
        </div>
      </nav>

      {/* Main */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 32px' }}>
        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span className="serif" style={{ fontSize: 11, color: 'var(--gray-30)', fontStyle: 'italic' }}>{String(step).padStart(2, '0')}</span>
            <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--black)' }}>
              {STEP_TITLES[step - 1]}
            </h1>
          </div>
          <p style={{ fontSize: 14, color: 'var(--gray-50)', fontWeight: 300 }}>
            {STEP_SUBS[step - 1]}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--gray-08)', marginBottom: 40 }} />

        {/* Step content */}
        <div key={step}>{STEP_COMPONENTS[step]}</div>

        {/* Back */}
        {step > 1 && step !== 4 && (
          <button
            onClick={() => step === 5 ? (setStep(1)) : setStep(step - 1)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 32, fontSize: 13, color: 'var(--gray-30)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.15s' }}
          >
            <IconChevronLeft /> {step === 5 ? '처음으로' : '이전 단계'}
          </button>
        )}
      </div>
    </div>
  )
}
