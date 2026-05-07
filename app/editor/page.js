'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── Dummy data ── */
const DUMMY_SCRIPT = `안녕하세요, 오늘은 제주도 3박 4일 여행 브이로그를 함께 떠나볼게요.

이번 여행의 첫 번째 목적지는 성산일출봉입니다. 유네스코 세계자연유산으로 지정된 이곳은 해발 182미터의 거대한 분화구가 만들어낸 자연의 걸작입니다. 이른 아침, 일출을 보기 위해 새벽 5시에 등반을 시작했습니다.

다음으로는 제주의 보석, 협재해수욕장으로 이동했습니다. 에메랄드빛 바다와 하얀 모래사장이 어우러진 이 해변은 한국에서 가장 아름다운 해변 중 하나로 꼽힙니다.

점심 식사는 제주 흑돼지 오겹살로 즐겼습니다. 제주 흑돼지는 본토 돼지와는 다른 독특한 맛과 식감을 자랑하는데, 생애 최고의 삼겹살 경험이었습니다.

오후에는 제주의 상징, 한라산 등반에 도전했습니다. 해발 1,947미터로 대한민국에서 가장 높은 산인 한라산은 사계절 내내 다양한 표정을 보여줍니다.

마지막 날은 제주 올레길 7코스를 걸으며 여행을 마무리했습니다. 푸른 바다를 바라보며 걷는 이 길에서 제주의 진정한 아름다움을 느낄 수 있었습니다.`

const SCENES = [
  {
    id: 1,
    title: '여행 인트로',
    text: '안녕하세요, 오늘은 제주도 3박 4일 여행 브이로그를 함께 떠나볼게요.',
    duration: '0:12',
    prompt: 'Aerial view of Jeju Island, turquoise ocean, volcanic landscape, cinematic sunrise, 4K travel documentary style',
    from: 'from-sky-400',
    to: 'to-blue-600',
  },
  {
    id: 2,
    title: '성산일출봉',
    text: '유네스코 세계자연유산으로 지정된 이곳은 해발 182미터의 거대한 분화구가 만들어낸 자연의 걸작입니다.',
    duration: '1:24',
    prompt: 'Seongsan Ilchulbong volcanic crater at sunrise, UNESCO world heritage, misty morning atmosphere, warm golden light streaming through clouds',
    from: 'from-orange-400',
    to: 'to-rose-600',
  },
  {
    id: 3,
    title: '협재해수욕장',
    text: '에메랄드빛 바다와 하얀 모래사장이 어우러진 협재해수욕장입니다.',
    duration: '1:08',
    prompt: 'Hyeopjae Beach Jeju, emerald crystal clear water, white sand beach, summer vacation vibes, aerial drone shot, bright natural light',
    from: 'from-cyan-400',
    to: 'to-teal-600',
  },
  {
    id: 4,
    title: '흑돼지 오겹살',
    text: '제주 흑돼지는 본토 돼지와는 다른 독특한 맛과 식감을 자랑합니다.',
    duration: '0:52',
    prompt: 'Jeju black pork belly barbecue on grill, sizzling close-up, Korean restaurant atmosphere, warm light, food photography style',
    from: 'from-amber-400',
    to: 'to-orange-600',
  },
  {
    id: 5,
    title: '한라산 등반',
    text: '해발 1,947미터로 대한민국에서 가장 높은 산인 한라산입니다.',
    duration: '1:36',
    prompt: 'Mount Hallasan Jeju hiking trail, autumn foliage, mountain peak above clouds, dramatic landscape, golden hour photography',
    from: 'from-emerald-400',
    to: 'to-green-600',
  },
]

const VOICES = [
  { id: 'v1', name: '김민준', style: '차분한 남성', tag: 'ElevenLabs' },
  { id: 'v2', name: '이지연', style: '친근한 여성', tag: 'Clova' },
  { id: 'v3', name: 'Alex (EN)', style: 'Neutral male', tag: 'OpenAI TTS' },
]

const STYLES = [
  { id: 's1', name: '미니멀', desc: '깔끔하고 집중도 높은', color: 'bg-slate-100' },
  { id: 's2', name: '시네마틱', desc: '영화같은 분위기', color: 'bg-sky-100' },
  { id: 's3', name: '에너지틱', desc: '역동적이고 활기찬', color: 'bg-rose-100' },
  { id: 's4', name: '다큐멘터리', desc: '신뢰감 있는 스타일', color: 'bg-amber-100' },
]

const PIPELINE = [
  { label: '대본 분석 & 씬 분할', sub: 'Claude 3.5 Sonnet', ms: 2200 },
  { label: '음성 생성 (TTS)', sub: 'ElevenLabs', ms: 3800 },
  { label: '시각 생성', sub: 'DALL-E 3 · Runway Gen-3', ms: 6500 },
  { label: 'BGM 생성', sub: 'Suno AI', ms: 4200 },
  { label: '영상 합성 & 렌더링', sub: 'FFmpeg · Whisper', ms: 2800 },
]

/* ── Icons ── */
function CheckIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
function ArrowRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
function ChevronLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="m5 3 14 9-14 9V3z" />
    </svg>
  )
}
function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  )
}
function DownloadIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}

const STEP_LABELS = ['대본 입력', '씬 분할', '스타일', '생성 중', '결과']

export default function EditorPage() {
  const [step, setStep] = useState(1) // 1-5
  const [script, setScript] = useState(DUMMY_SCRIPT)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [voice, setVoice] = useState('v1')
  const [style, setStyle] = useState('s2')
  const [ratio, setRatio] = useState('16:9')
  const [pipelineStatus, setPipelineStatus] = useState([]) // 'pending' | 'running' | 'done'
  const [pipelineProgress, setPipelineProgress] = useState(0) // 0-100
  const [activeScene, setActiveScene] = useState(0)
  const [editingPrompt, setEditingPrompt] = useState(null)
  const [promptVal, setPromptVal] = useState('')
  const [scenes, setScenes] = useState(SCENES)
  const timerRef = useRef(null)

  /* Step 2: simulate analysis */
  const runAnalysis = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setAnalyzed(true)
    }, 2400)
  }

  /* Step 4: simulate pipeline */
  useEffect(() => {
    if (step !== 4) return
    setPipelineStatus(PIPELINE.map(() => 'pending'))
    setPipelineProgress(0)

    let idx = 0
    const totalMs = PIPELINE.reduce((s, p) => s + p.ms, 0)
    let elapsed = 0

    const advance = () => {
      if (idx >= PIPELINE.length) {
        setPipelineProgress(100)
        setTimeout(() => setStep(5), 800)
        return
      }
      setPipelineStatus((prev) => prev.map((s, i) => (i === idx ? 'running' : s)))
      const duration = PIPELINE[idx].ms
      const intervalMs = 80
      let local = 0
      const progressTimer = setInterval(() => {
        local += intervalMs
        elapsed += intervalMs
        setPipelineProgress(Math.min(99, Math.round((elapsed / totalMs) * 100)))
        if (local >= duration) {
          clearInterval(progressTimer)
          setPipelineStatus((prev) => prev.map((s, i) => (i === idx ? 'done' : s)))
          idx++
          setTimeout(advance, 300)
        }
      }, intervalMs)
    }
    const delay = setTimeout(advance, 400)
    return () => {
      clearTimeout(delay)
      clearTimeout(timerRef.current)
    }
  }, [step])

  /* Prompt editing */
  const startEdit = (i) => {
    setEditingPrompt(i)
    setPromptVal(scenes[i].prompt)
  }
  const saveEdit = () => {
    if (editingPrompt === null) return
    setScenes((prev) => prev.map((s, i) => (i === editingPrompt ? { ...s, prompt: promptVal } : s)))
    setEditingPrompt(null)
  }

  const totalDuration = scenes.reduce((acc, s) => {
    const [m, sec] = s.duration.split(':').map(Number)
    return acc + m * 60 + sec
  }, 0)
  const fmt = (s) => `${Math.floor(s / 60)}분 ${s % 60}초`

  /* ── Step renders ── */

  /* STEP 1 — Script input */
  const Step1 = () => (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-slate-700 font-semibold text-[15px] mb-2.5">대본을 입력하세요</label>
        <p className="text-slate-400 text-[13px] mb-4">YouTube 영상 대본 또는 콘텐츠 원고. .txt, .docx 파일 업로드도 지원합니다.</p>
        <textarea
          className="script-textarea"
          rows={14}
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="대본을 여기에 붙여넣으세요..."
        />
        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-slate-300 text-[12px]">{script.length.toLocaleString()}자</span>
          <span className="text-slate-300 text-[12px]">예상 영상 길이: 약 5~7분</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex-1 rounded-xl px-4 py-3 flex items-center gap-2.5 cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.6)', border: '1.5px dashed rgba(125,211,252,0.5)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          <span className="text-slate-400 text-[13px]">파일 업로드 (.txt .docx)</span>
        </div>
        <button
          className="btn-primary"
          style={{ padding: '12px 28px', borderRadius: '13px' }}
          onClick={() => { runAnalysis(); setStep(2) }}
          disabled={!script.trim()}
        >
          분석 시작 <ArrowRight />
        </button>
      </div>
    </div>
  )

  /* STEP 2 — Scene list */
  const Step2 = () => (
    <div>
      {analyzing ? (
        <div className="flex flex-col items-center justify-center py-20 gap-5">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)', boxShadow: '0 8px 24px rgba(56,189,248,0.4)' }}
            >
              <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
            </div>
          </div>
          <p className="font-semibold text-slate-700 text-[17px]">Claude AI가 대본을 분석하고 있습니다</p>
          <p className="text-slate-400 text-[14px]">씬 분할 · 시각 프롬프트 생성 · 분위기 추출 중...</p>
          <div
            className="h-1.5 rounded-full overflow-hidden mt-2"
            style={{ width: '200px', background: 'rgba(125,211,252,0.2)' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #38BDF8, #0EA5E9)',
                animation: 'progress 2.2s ease-in-out forwards',
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-bold text-slate-800 text-[17px]">AI가 {scenes.length}개 씬으로 분할했습니다</p>
              <p className="text-slate-400 text-[13px] mt-0.5">프롬프트를 클릭해 수정할 수 있습니다</p>
            </div>
            <div
              className="rounded-xl px-4 py-2"
              style={{ background: 'rgba(224,242,254,0.7)', border: '1px solid rgba(125,211,252,0.3)' }}
            >
              <p className="text-sky-600 font-semibold text-[13px]">총 {fmt(totalDuration)}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {scenes.map((scene, i) => (
              <div key={scene.id} className="scene-card">
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div
                    className={`rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-[13px] bg-gradient-to-br ${scene.from} ${scene.to}`}
                    style={{ width: '72px', height: '48px', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}
                  >
                    씬 {scene.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="font-semibold text-slate-800 text-[14px]">{scene.title}</p>
                      <span
                        className="text-[11px] font-semibold rounded-full px-2.5 py-0.5"
                        style={{ background: 'rgba(125,211,252,0.15)', color: '#0284C7' }}
                      >
                        {scene.duration}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[13px] mb-2.5 line-clamp-1">{scene.text}</p>

                    {/* Editable prompt */}
                    {editingPrompt === i ? (
                      <div className="flex gap-2">
                        <input
                          autoFocus
                          className="input-field flex-1 text-[12px] py-1.5"
                          value={promptVal}
                          onChange={(e) => setPromptVal(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        />
                        <button
                          onClick={saveEdit}
                          className="rounded-lg px-3 py-1.5 text-white text-[12px] font-semibold"
                          style={{ background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)' }}
                        >
                          저장
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(i)}
                        className="w-full text-left rounded-lg px-3 py-1.5 text-[12px] text-slate-400 hover:text-slate-600 transition-colors"
                        style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.6)' }}
                      >
                        <span className="font-mono">{scene.prompt.substring(0, 60)}...</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button className="btn-primary" style={{ padding: '12px 28px', borderRadius: '13px' }} onClick={() => setStep(3)}>
              스타일 설정 <ArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  )

  /* STEP 3 — Style settings */
  const Step3 = () => (
    <div className="flex flex-col gap-8">
      {/* Voice */}
      <div>
        <p className="font-bold text-slate-800 text-[16px] mb-1.5">나레이터 목소리</p>
        <p className="text-slate-400 text-[13px] mb-4">씬별 나레이션에 사용할 목소리를 선택하세요</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {VOICES.map((v) => (
            <div
              key={v.id}
              className={`voice-option ${voice === v.id ? 'selected' : ''}`}
              onClick={() => setVoice(v.id)}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-[13px] mx-auto mb-3"
                style={{ background: voice === v.id ? 'linear-gradient(135deg,#38BDF8,#0EA5E9)' : 'rgba(148,163,184,0.3)' }}
              >
                {v.name[0]}
              </div>
              <p className="font-semibold text-slate-700 text-[14px]">{v.name}</p>
              <p className="text-slate-400 text-[12px] mt-0.5 mb-3">{v.style}</p>
              <div className="flex items-center justify-center gap-2">
                <span
                  className="text-[11px] rounded-full px-2 py-0.5 font-semibold"
                  style={{ background: 'rgba(125,211,252,0.15)', color: '#0284C7' }}
                >
                  {v.tag}
                </span>
                <button
                  className="flex items-center gap-1 text-[12px] text-sky-500 hover:text-sky-700 transition-colors"
                  onClick={(e) => { e.stopPropagation(); alert('미리듣기 (데모 기능)') }}
                >
                  <PlayIcon /> 미리듣기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual style */}
      <div>
        <p className="font-bold text-slate-800 text-[16px] mb-1.5">영상 스타일</p>
        <p className="text-slate-400 text-[13px] mb-4">전체 영상의 시각적 분위기를 선택하세요</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STYLES.map((s) => (
            <div
              key={s.id}
              className={`style-option ${style === s.id ? 'selected' : ''}`}
              onClick={() => setStyle(s.id)}
            >
              <div
                className={`w-full h-14 rounded-xl mb-3 ${s.color}`}
                style={{ border: style === s.id ? '2px solid #38BDF8' : '2px solid transparent' }}
              />
              <p className="font-semibold text-slate-700 text-[14px]">{s.name}</p>
              <p className="text-slate-400 text-[12px] mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Output format */}
      <div>
        <p className="font-bold text-slate-800 text-[16px] mb-1.5">출력 형식</p>
        <p className="text-slate-400 text-[13px] mb-4">출력 비율을 선택하세요</p>
        <div className="flex gap-3">
          {['16:9', '9:16'].map((r) => (
            <button
              key={r}
              onClick={() => setRatio(r)}
              className="flex items-center gap-3 rounded-xl px-5 py-3.5 transition-all"
              style={{
                background: ratio === r ? 'rgba(224,242,254,0.85)' : 'rgba(255,255,255,0.6)',
                border: ratio === r ? '2px solid #38BDF8' : '2px solid rgba(226,232,240,0.6)',
                boxShadow: ratio === r ? '0 0 0 4px rgba(56,189,248,0.1)' : 'none',
              }}
            >
              <div
                className="rounded-sm bg-sky-300 flex-shrink-0"
                style={{
                  width: r === '16:9' ? 32 : 18,
                  height: r === '16:9' ? 18 : 32,
                  opacity: ratio === r ? 1 : 0.4,
                }}
              />
              <div>
                <p className="font-semibold text-slate-700 text-[14px]">{r}</p>
                <p className="text-slate-400 text-[12px]">{r === '16:9' ? 'YouTube 롱폼' : 'Shorts / Reels'}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="btn-primary"
          style={{ padding: '14px 36px', borderRadius: '14px', fontSize: '16px' }}
          onClick={() => setStep(4)}
        >
          생성 시작
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </button>
      </div>
    </div>
  )

  /* STEP 4 — Pipeline progress */
  const Step4 = () => (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-center mb-2">
        <p className="font-bold text-slate-800 text-[20px] mb-1.5">AI 파이프라인 실행 중</p>
        <p className="text-slate-400 text-[14px]">완료된 씬부터 순서대로 미리볼 수 있습니다</p>
      </div>

      {/* Overall progress */}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-semibold text-sky-600">{pipelineProgress}% 완료</span>
          <span className="text-[12px] text-slate-400">
            {pipelineProgress < 100 ? '처리 중...' : '완료!'}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(125,211,252,0.2)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${pipelineProgress}%`,
              background: 'linear-gradient(90deg, #38BDF8, #0EA5E9)',
              boxShadow: '0 0 12px rgba(56,189,248,0.5)',
            }}
          />
        </div>
      </div>

      {/* Step items */}
      <div className="w-full flex flex-col gap-2.5">
        {PIPELINE.map((p, i) => {
          const status = pipelineStatus[i] || 'pending'
          return (
            <div key={i} className={`progress-step-item ${status}`}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: status === 'done'
                    ? 'linear-gradient(135deg, #34D399, #10B981)'
                    : status === 'running'
                    ? 'linear-gradient(135deg, #38BDF8, #0EA5E9)'
                    : 'rgba(148,163,184,0.2)',
                  boxShadow: status === 'running' ? '0 4px 12px rgba(56,189,248,0.4)' : 'none',
                }}
              >
                {status === 'done' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                ) : status === 'running' ? (
                  <div className="spinner" style={{ width: '16px', height: '16px', borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
                ) : (
                  <span className="text-slate-400 font-bold text-[13px]">{i + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-[14px] ${status === 'pending' ? 'text-slate-400' : 'text-slate-700'}`}>
                  {p.label}
                </p>
                <p className="text-[12px] text-slate-400">{p.sub}</p>
              </div>
              {status === 'done' && (
                <span
                  className="text-[11px] font-semibold rounded-full px-2.5 py-0.5"
                  style={{ background: 'rgba(52,211,153,0.15)', color: '#059669' }}
                >
                  완료
                </span>
              )}
              {status === 'running' && (
                <span
                  className="text-[11px] font-semibold rounded-full px-2.5 py-0.5"
                  style={{ background: 'rgba(56,189,248,0.15)', color: '#0284C7' }}
                >
                  처리 중
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Scene thumbnails appearing */}
      <div className="w-full mt-2">
        <p className="text-[13px] font-semibold text-slate-500 mb-3">씬 생성 현황</p>
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {scenes.map((scene, i) => {
            const isDone = pipelineStatus[2] === 'done' || pipelineProgress > (20 + i * 14)
            return (
              <div
                key={scene.id}
                className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-500"
                style={{ width: '100px', height: '64px', opacity: isDone ? 1 : 0.25, transform: isDone ? 'scale(1)' : 'scale(0.95)' }}
              >
                <div className={`w-full h-full bg-gradient-to-br ${scene.from} ${scene.to} flex items-center justify-center`}>
                  {isDone ? (
                    <span className="text-white text-[11px] font-semibold drop-shadow">{scene.title}</span>
                  ) : (
                    <div className="spinner" style={{ width: '16px', height: '16px', borderColor: 'rgba(255,255,255,0.2)', borderTopColor: 'rgba(255,255,255,0.6)' }} />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  /* STEP 5 — Results */
  const Step5 = () => (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-bold text-slate-800 text-[18px]">영상이 완성되었습니다</p>
          <p className="text-slate-400 text-[13px] mt-0.5">씬을 클릭해 세부 수정 후 내보내세요</p>
        </div>
        <div className="flex gap-2.5">
          <button
            className="btn-secondary"
            style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '11px', gap: '6px' }}
            onClick={() => alert('YouTube 업로드 연동 (데모 기능)')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube 업로드
          </button>
          <button
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '11px', gap: '6px' }}
            onClick={() => alert('MP4 다운로드 (데모 기능)')}
          >
            <DownloadIcon />
            MP4 내보내기
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Scene list (left) */}
        <div className="lg:col-span-2 flex flex-col gap-2.5">
          <p className="text-[12px] font-semibold text-slate-400 uppercase tracking-widest px-1 mb-1">씬 목록</p>
          {scenes.map((scene, i) => (
            <div
              key={scene.id}
              className={`scene-card ${activeScene === i ? 'active' : ''}`}
              onClick={() => setActiveScene(i)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-xl flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold bg-gradient-to-br ${scene.from} ${scene.to}`}
                  style={{ width: '56px', height: '36px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                >
                  {scene.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-700 text-[13px] truncate">{scene.title}</p>
                  <p className="text-slate-400 text-[11px]">{scene.duration}</p>
                </div>
                {activeScene === i && (
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Scene editor (right) */}
        <div className="lg:col-span-3">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(125,211,252,0.12)' }}
          >
            {/* Preview */}
            <div
              className={`relative bg-gradient-to-br ${scenes[activeScene].from} ${scenes[activeScene].to} flex items-center justify-center`}
              style={{ aspectRatio: ratio === '16:9' ? '16/9' : '9/16', maxHeight: '220px' }}
            >
              <div className="text-center text-white">
                <p className="font-bold text-[18px] drop-shadow mb-1">{scenes[activeScene].title}</p>
                <p className="text-white/70 text-[12px]">씬 {scenes[activeScene].id} · {scenes[activeScene].duration}</p>
              </div>
              {/* Play button overlay */}
              <button
                className="absolute inset-0 flex items-center justify-center"
                onClick={() => alert('영상 미리보기 (데모 기능)')}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                  style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.5)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="m5 3 14 9-14 9V3z" /></svg>
                </div>
              </button>
            </div>

            {/* Details */}
            <div className="p-5">
              <p className="font-semibold text-slate-700 text-[15px] mb-2">{scenes[activeScene].title}</p>
              <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{scenes[activeScene].text}</p>

              {/* Prompt */}
              <div className="mb-4">
                <p className="text-[11px] font-semibold text-sky-600 uppercase tracking-widest mb-2">시각 프롬프트</p>
                <div
                  className="rounded-xl p-3 font-mono text-[12px] text-slate-500 leading-relaxed"
                  style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.6)' }}
                >
                  {scenes[activeScene].prompt}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5 flex-wrap">
                {[
                  { label: '영상 재생성', icon: <RefreshIcon /> },
                  { label: '음성 재생성', icon: <RefreshIcon /> },
                  { label: 'BGM 변경', icon: <RefreshIcon /> },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-[12px] font-semibold text-sky-600 hover:bg-sky-50 transition-colors"
                    style={{ background: 'rgba(224,242,254,0.6)', border: '1px solid rgba(125,211,252,0.3)' }}
                    onClick={() => alert(`${action.label} (데모 기능)`)}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Export info */}
          <div
            className="mt-4 rounded-xl p-4 flex items-center gap-4"
            style={{ background: 'rgba(240,253,244,0.7)', border: '1px solid rgba(134,239,172,0.4)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            <div>
              <p className="text-emerald-700 font-semibold text-[14px]">렌더링 완료 · {ratio} · 1080p H.264</p>
              <p className="text-emerald-600 text-[12px] mt-0.5">총 {fmt(totalDuration)} · {(totalDuration * 0.4).toFixed(1)}MB 예상</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const STEP_COMPONENTS = [null, <Step1 key={1} />, <Step2 key={2} />, <Step3 key={3} />, <Step4 key={4} />, <Step5 key={5} />]

  return (
    <div className="bg-base relative min-h-screen">
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Nav */}
      <nav className="glass-nav sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-bold"
              style={{ background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)' }}
            >
              SR
            </div>
            <span className="font-bold text-[15px] text-slate-700">ScriptRoll</span>
          </Link>

          {/* Step indicator */}
          <div className="hidden md:flex items-center gap-1">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1
              const isActive = step === n
              const isDone = step > n
              return (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className="flex items-center gap-1.5 rounded-full px-3 py-1 transition-all"
                    style={{
                      background: isActive ? 'rgba(224,242,254,0.9)' : isDone ? 'rgba(240,253,244,0.7)' : 'transparent',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, #38BDF8, #0EA5E9)'
                          : isDone
                          ? '#10B981'
                          : 'rgba(148,163,184,0.3)',
                        color: isActive || isDone ? 'white' : '#94A3B8',
                      }}
                    >
                      {isDone ? <CheckIcon size={11} /> : n}
                    </div>
                    <span
                      className="text-[12px] font-semibold"
                      style={{ color: isActive ? '#0284C7' : isDone ? '#059669' : '#94A3B8' }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div className="w-4 h-px" style={{ background: 'rgba(148,163,184,0.3)' }} />
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-slate-400 hidden md:block">데모 버전</span>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Card */}
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.82)',
            boxShadow: '0 16px 64px rgba(125,211,252,0.14), 0 4px 16px rgba(0,0,0,0.04)',
          }}
        >
          {/* Mobile step indicator */}
          <div className="flex md:hidden items-center gap-2 mb-6 overflow-x-auto pb-1">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1
              const isActive = step === n
              const isDone = step > n
              return (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold"
                  style={{
                    background: isActive ? 'rgba(224,242,254,0.9)' : isDone ? 'rgba(240,253,244,0.7)' : 'rgba(248,250,252,0.8)',
                    color: isActive ? '#0284C7' : isDone ? '#059669' : '#94A3B8',
                    border: `1px solid ${isActive ? 'rgba(125,211,252,0.5)' : isDone ? 'rgba(134,239,172,0.5)' : 'rgba(226,232,240,0.5)'}`,
                  }}
                >
                  {isDone ? <CheckIcon size={11} /> : null}
                  {label}
                </div>
              )
            })}
          </div>

          {/* Step heading */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="step-badge">{step}</div>
              <h1
                className="font-extrabold text-slate-800"
                style={{ fontSize: 'clamp(20px, 3vw, 28px)', letterSpacing: '-0.03em' }}
              >
                {['대본 입력', 'AI 씬 분할 확인', '스타일 & 목소리 설정', '영상 생성 중', '결과 확인 & 내보내기'][step - 1]}
              </h1>
            </div>
            <p className="text-slate-400 text-[14px] ml-12">
              {[
                '유튜브 영상 대본이나 콘텐츠 원고를 입력하세요',
                'AI가 분할한 씬을 확인하고 시각 프롬프트를 수정하세요',
                '나레이터 목소리와 영상 스타일을 설정하세요',
                '5단계 AI 파이프라인이 영상을 생성하고 있습니다',
                '씬을 선택해 세부 수정 후 최종 내보내기하세요',
              ][step - 1]}
            </p>
          </div>

          {/* Step content */}
          <div key={step}>{STEP_COMPONENTS[step]}</div>

          {/* Back nav (except step 1 and step 4) */}
          {step > 1 && step !== 4 && step !== 5 && (
            <button
              className="mt-6 flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => setStep(step - 1)}
            >
              <ChevronLeft size={15} /> 이전 단계
            </button>
          )}
          {step === 5 && (
            <button
              className="mt-6 flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => { setStep(1); setAnalyzed(false); setPipelineStatus([]) }}
            >
              <ChevronLeft size={15} /> 처음으로
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
