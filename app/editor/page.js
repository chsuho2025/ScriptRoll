'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const R = { full:'9999px', xl:'36px', lg:'28px', md:'22px', sm:'16px' }

const DUMMY_SCRIPT = `안녕하세요, 오늘은 제주도 3박 4일 여행 브이로그를 함께 떠나볼게요.

이번 여행의 첫 번째 목적지는 성산일출봉입니다. 유네스코 세계자연유산으로 지정된 이곳은 해발 182미터의 거대한 분화구가 만들어낸 자연의 걸작입니다. 이른 아침, 일출을 보기 위해 새벽 5시에 등반을 시작했습니다.

다음으로는 제주의 보석, 협재해수욕장으로 이동했습니다. 에메랄드빛 바다와 하얀 모래사장이 어우러진 이 해변은 한국에서 가장 아름다운 해변 중 하나로 꼽힙니다.

점심 식사는 제주 흑돼지 오겹살로 즐겼습니다. 제주 흑돼지는 본토 돼지와는 다른 독특한 맛과 식감을 자랑합니다.

오후에는 한라산 등반에 도전했습니다. 해발 1,947미터로 대한민국에서 가장 높은 산인 한라산은 사계절 내내 다양한 표정을 보여줍니다.

마지막 날은 제주 올레길 7코스를 걸으며 여행을 마무리했습니다.`

const SCENES = [
  { id:1, title:'여행 인트로',   duration:'0:12', prompt:'Aerial view of Jeju Island, turquoise ocean, volcanic landscape, cinematic sunrise, 4K documentary style' },
  { id:2, title:'성산일출봉',    duration:'1:24', prompt:'Seongsan Ilchulbong volcanic crater at sunrise, UNESCO world heritage, misty morning, golden light' },
  { id:3, title:'협재해수욕장',  duration:'1:08', prompt:'Hyeopjae Beach Jeju, emerald water, white sand beach, aerial drone shot, bright natural light' },
  { id:4, title:'흑돼지 오겹살', duration:'0:52', prompt:'Jeju black pork belly barbecue on grill, sizzling close-up, Korean restaurant, warm light' },
  { id:5, title:'한라산 등반',   duration:'1:36', prompt:'Mount Hallasan hiking trail, autumn foliage, mountain peak above clouds, dramatic landscape' },
]
const VOICES = [
  { id:'v1', name:'김민준', style:'차분한 남성',      tag:'ElevenLabs' },
  { id:'v2', name:'이지연', style:'친근한 여성',      tag:'Clova Voice' },
  { id:'v3', name:'Alex',   style:'Neutral male (EN)', tag:'OpenAI TTS' },
]
const STYLES = [
  { id:'s1', label:'미니멀',      desc:'깔끔하고 집중도 높은' },
  { id:'s2', label:'시네마틱',    desc:'영화같은 분위기' },
  { id:'s3', label:'에너지틱',    desc:'역동적이고 활기찬' },
  { id:'s4', label:'다큐멘터리',  desc:'신뢰감 있는 스타일' },
]
const PIPELINE = [
  { label:'대본 분석 & 씬 분할', api:'Claude 3.5 Sonnet',    ms:2200 },
  { label:'음성 생성 (TTS)',     api:'ElevenLabs',            ms:3800 },
  { label:'시각 생성',           api:'DALL-E 3 · Runway Gen-3',ms:6500 },
  { label:'BGM 생성',            api:'Suno AI',               ms:4200 },
  { label:'영상 합성 & 렌더링',  api:'FFmpeg · Whisper',      ms:2800 },
]
const STEP_LABELS = ['대본','씬 분할','스타일','생성 중','결과']
const STEP_TITLES = ['대본 입력','씬 분할 확인','스타일 & 목소리','생성 중','결과 확인']
const STEP_SUBS   = [
  '유튜브 영상 대본이나 콘텐츠 원고를 입력하세요',
  'AI가 분할한 씬과 시각 프롬프트를 확인하세요',
  '나레이터 목소리와 영상 스타일을 선택하세요',
  '5단계 AI 파이프라인이 영상을 생성하고 있습니다',
  '씬 편집 후 최종 내보내기하세요',
]

function Arrow({s=14}){return<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
function Check({s=12,c='currentColor'}){return<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
function Refresh({s=13}){return<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>}
function Chevron(){return<svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>}

export default function EditorPage() {
  const [step,   setStep]   = useState(1)
  const [script, setScript] = useState(DUMMY_SCRIPT)
  const [loading,setLoading]= useState(false)
  const [voice,  setVoice]  = useState('v1')
  const [style,  setStyle]  = useState('s2')
  const [ratio,  setRatio]  = useState('16:9')
  const [pStatus,setPStatus]= useState([])
  const [progress,setProgress]=useState(0)
  const [active, setActive] = useState(0)
  const [scenes, setScenes] = useState(SCENES)
  const [editIdx,setEditIdx]= useState(null)
  const [editVal,setEditVal]= useState('')

  const totalSec = scenes.reduce((a,s)=>{const[m,sec]=s.duration.split(':').map(Number);return a+m*60+sec},0)
  const fmt = s=>`${Math.floor(s/60)}분 ${s%60}초`

  const runAnalysis = () => {
    setLoading(true)
    setTimeout(()=>{setLoading(false);setStep(2)}, 2200)
  }

  useEffect(()=>{
    if(step!==4)return
    setPStatus(PIPELINE.map(()=>'pending'))
    setProgress(0)
    let idx=0, elapsed=0
    const total=PIPELINE.reduce((s,p)=>s+p.ms,0)
    const advance=()=>{
      if(idx>=PIPELINE.length){setProgress(100);setTimeout(()=>setStep(5),700);return}
      setPStatus(p=>p.map((s,i)=>i===idx?'running':s))
      const dur=PIPELINE[idx].ms
      let local=0
      const iv=setInterval(()=>{
        local+=80;elapsed+=80
        setProgress(Math.min(99,Math.round((elapsed/total)*100)))
        if(local>=dur){clearInterval(iv);setPStatus(p=>p.map((s,i)=>i===idx?'done':s));idx++;setTimeout(advance,300)}
      },80)
    }
    const d=setTimeout(advance,400)
    return()=>clearTimeout(d)
  },[step])

  // ── STEP 1 ──
  const S1=()=>(
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <div>
        <p style={{fontSize:13,fontWeight:600,color:'var(--g50)',marginBottom:16,letterSpacing:'-0.01em'}}>
          유튜브 영상 대본이나 콘텐츠 원고를 입력하세요. .txt, .docx 파일 업로드도 지원합니다.
        </p>
        <textarea className="textarea-base" rows={15} value={script} onChange={e=>setScript(e.target.value)} placeholder="대본을 여기에 붙여넣으세요..." />
        <div style={{display:'flex',justifyContent:'space-between',marginTop:8,padding:'0 4px'}}>
          <span style={{fontSize:12,color:'var(--g30)'}}>{script.length.toLocaleString()}자</span>
          <span style={{fontSize:12,color:'var(--g30)'}}>예상 영상 길이: 약 5–7분</span>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <button style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'var(--g50)',background:'none',border:'none',cursor:'pointer',padding:0}}
          onClick={()=>alert('파일 업로드 (데모 기능)')}>
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
          파일 업로드
        </button>
        <button className="btn-primary" onClick={runAnalysis} disabled={!script.trim()||loading} style={{opacity:(!script.trim()||loading)?0.4:1}}>
          {loading?<><span className="spinner-white"/>분석 중...</>:<>분석 시작 <Arrow /></>}
        </button>
      </div>
    </div>
  )

  // ── STEP 2 ──
  const S2=()=>(
    <div>
      <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:24}}>
        <div>
          <p style={{fontSize:15,fontWeight:700,color:'var(--black)',letterSpacing:'-0.03em'}}>씬 목록 — {scenes.length}개</p>
          <p style={{fontSize:13,color:'var(--g50)',marginTop:2}}>프롬프트를 클릭해 수정할 수 있습니다</p>
        </div>
        <span style={{fontSize:12,color:'var(--g30)'}}>{fmt(totalSec)}</span>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {scenes.map((sc,i)=>(
          <div key={sc.id} style={{border:'1.5px solid var(--g08)',borderRadius:R.lg,overflow:'hidden'}}>
            <div style={{display:'flex',alignItems:'center',gap:14,padding:'14px 18px'}}>
              <span style={{fontSize:11,fontWeight:700,color:'var(--g30)',minWidth:18,letterSpacing:'0.02em'}}>{String(i+1).padStart(2,'0')}</span>
              <p style={{flex:1,fontSize:14,fontWeight:600,color:'var(--black)',letterSpacing:'-0.02em'}}>{sc.title}</p>
              <span className="badge">{sc.duration}</span>
            </div>
            <div style={{borderTop:'1px solid var(--g08)',padding:'10px 18px',background:'var(--g04)'}}>
              {editIdx===i?(
                <div style={{display:'flex',gap:8}}>
                  <input autoFocus className="input-base" value={editVal} style={{fontSize:12,fontFamily:'monospace',flex:1}}
                    onChange={e=>setEditVal(e.target.value)}
                    onKeyDown={e=>{
                      if(e.key==='Enter'){setScenes(p=>p.map((s,j)=>j===i?{...s,prompt:editVal}:s));setEditIdx(null)}
                      if(e.key==='Escape')setEditIdx(null)
                    }}/>
                  <button className="btn-primary btn-sm" onClick={()=>{setScenes(p=>p.map((s,j)=>j===i?{...s,prompt:editVal}:s));setEditIdx(null)}}>저장</button>
                </div>
              ):(
                <button onClick={()=>{setEditIdx(i);setEditVal(sc.prompt)}} style={{background:'none',border:'none',cursor:'pointer',padding:0,width:'100%',textAlign:'left'}}>
                  <span style={{fontSize:12,color:'var(--g50)',fontFamily:'monospace',lineHeight:1.5}}>
                    {sc.prompt.length>90?sc.prompt.slice(0,90)+'…':sc.prompt}
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',justifyContent:'flex-end',marginTop:24}}>
        <button className="btn-primary" onClick={()=>setStep(3)}>스타일 설정 <Arrow /></button>
      </div>
    </div>
  )

  // ── STEP 3 ──
  const S3=()=>(
    <div style={{display:'flex',flexDirection:'column',gap:36}}>
      {/* Voice */}
      <div>
        <p style={{fontSize:15,fontWeight:700,letterSpacing:'-0.03em',color:'var(--black)',marginBottom:6}}>나레이터 목소리</p>
        <p style={{fontSize:13,color:'var(--g50)',marginBottom:18}}>씬별 나레이션에 사용할 목소리를 선택하세요</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
          {VOICES.map(v=>(
            <div key={v.id} className={`voice-opt${voice===v.id?' selected':''}`} onClick={()=>setVoice(v.id)}>
              <div style={{width:36,height:36,borderRadius:'50%',margin:'0 auto 14px',background:voice===v.id?'var(--black)':'var(--g08)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={voice===v.id?'var(--white)':'var(--g30)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
              </div>
              <p style={{fontSize:14,fontWeight:700,color:'var(--black)',letterSpacing:'-0.02em',marginBottom:3}}>{v.name}</p>
              <p style={{fontSize:12,color:'var(--g50)',marginBottom:10}}>{v.style}</p>
              <span className="badge" style={{fontSize:10}}>{v.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Style */}
      <div>
        <p style={{fontSize:15,fontWeight:700,letterSpacing:'-0.03em',color:'var(--black)',marginBottom:6}}>영상 스타일</p>
        <p style={{fontSize:13,color:'var(--g50)',marginBottom:18}}>전체 영상의 시각적 분위기를 선택하세요</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
          {STYLES.map(s=>(
            <div key={s.id} className={`style-opt${style===s.id?' selected':''}`} onClick={()=>setStyle(s.id)}>
              <div style={{width:9,height:9,borderRadius:'50%',flexShrink:0,background:style===s.id?'var(--black)':'var(--g15)'}}/>
              <div>
                <p style={{fontSize:14,fontWeight:600,color:'var(--black)',letterSpacing:'-0.02em'}}>{s.label}</p>
                <p style={{fontSize:12,color:'var(--g50)'}}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ratio */}
      <div>
        <p style={{fontSize:15,fontWeight:700,letterSpacing:'-0.03em',color:'var(--black)',marginBottom:6}}>출력 비율</p>
        <p style={{fontSize:13,color:'var(--g50)',marginBottom:18}}>영상 포맷을 선택하세요</p>
        <div style={{display:'flex',gap:8}}>
          {[{r:'16:9',label:'YouTube 롱폼',w:30,h:17},{r:'9:16',label:'Shorts · Reels',w:17,h:30}].map(o=>(
            <div key={o.r} className={`ratio-opt${ratio===o.r?' selected':''}`} onClick={()=>setRatio(o.r)}>
              <div style={{width:o.w,height:o.h,borderRadius:4,flexShrink:0,background:ratio===o.r?'var(--black)':'var(--g15)'}}/>
              <div>
                <p style={{fontSize:14,fontWeight:600,letterSpacing:'-0.02em',color:'var(--black)'}}>{o.r}</p>
                <p style={{fontSize:12,color:'var(--g50)'}}>{o.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'flex',justifyContent:'flex-end'}}>
        <button className="btn-primary" style={{fontSize:15,padding:'14px 32px'}} onClick={()=>setStep(4)}>
          생성 시작
          <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor"><path d="m5 3 14 9-14 9V3z"/></svg>
        </button>
      </div>
    </div>
  )

  // ── STEP 4 ──
  const S4=()=>(
    <div style={{display:'flex',flexDirection:'column',gap:32}}>
      <div>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
          <span style={{fontSize:14,fontWeight:700,color:'var(--black)',letterSpacing:'-0.02em'}}>{progress}% 완료</span>
          <span style={{fontSize:12,color:'var(--g30)'}}>{progress<100?'처리 중...':'완료'}</span>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{width:`${progress}%`}}/></div>
      </div>
      <div>
        {PIPELINE.map((p,i)=>{
          const st=pStatus[i]||'pending'
          return(
            <div key={i} className="pipeline-item">
              <div style={{
                width:28,height:28,borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',
                border:`1.5px solid ${st==='done'?'var(--black)':st==='running'?'var(--black)':'var(--g15)'}`,
                background:st==='done'?'var(--black)':'transparent',
              }}>
                {st==='done'?<Check s={12} c="var(--white)"/>:st==='running'?<span className="spinner"/>:null}
              </div>
              <div style={{flex:1}}>
                <p style={{fontSize:14,fontWeight:st==='pending'?400:600,color:st==='pending'?'var(--g30)':'var(--black)',letterSpacing:'-0.02em'}}>{p.label}</p>
                <p style={{fontSize:12,color:'var(--g30)'}}>{p.api}</p>
              </div>
              {st!=='pending'&&<span style={{fontSize:11,color:'var(--g50)'}}>{st==='running'?'처리 중':'완료'}</span>}
            </div>
          )
        })}
      </div>
      <div>
        <p style={{fontSize:12,fontWeight:600,color:'var(--g30)',marginBottom:12,letterSpacing:'-0.01em'}}>씬 생성 현황</p>
        <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4}}>
          {scenes.map((sc,i)=>{
            const done=progress>(20+i*14)
            return(
              <div key={sc.id} style={{
                flexShrink:0,width:90,height:58,borderRadius:R.md,
                border:`1.5px solid ${done?'var(--black)':'var(--g08)'}`,
                background:done?'var(--black)':'var(--g04)',
                display:'flex',alignItems:'center',justifyContent:'center',
                transition:'all 0.4s ease',
              }}>
                {done
                  ?<span style={{fontSize:11,color:'var(--white)',fontWeight:600,textAlign:'center',padding:'0 6px'}}>{sc.title}</span>
                  :<span className="spinner"/>
                }
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  // ── STEP 5 ──
  const S5=()=>(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
        <div>
          <p style={{fontSize:15,fontWeight:700,letterSpacing:'-0.03em',color:'var(--black)',marginBottom:2}}>영상 완성</p>
          <p style={{fontSize:13,color:'var(--g50)'}}>씬을 선택해 세부 수정 후 내보내세요</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn-ghost btn-sm" onClick={()=>alert('YouTube 업로드 (데모 기능)')}>YouTube 업로드</button>
          <button className="btn-primary btn-sm" onClick={()=>alert('MP4 다운로드 (데모 기능)')}>MP4 내보내기 <Arrow s={13}/></button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:12}}>
        {/* Scene list */}
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {scenes.map((sc,i)=>(
            <div key={sc.id} className={`scene-item${active===i?' active':''}`} onClick={()=>setActive(i)}>
              <p style={{fontSize:13,fontWeight:active===i?700:500,color:'var(--black)',letterSpacing:'-0.02em',lineHeight:1.3}}>{sc.title}</p>
              <p style={{fontSize:11,color:'var(--g30)',marginTop:3}}>{sc.duration}</p>
            </div>
          ))}
        </div>
        {/* Detail */}
        <div style={{border:'1.5px solid var(--g08)',borderRadius:R.xl,overflow:'hidden'}}>
          {/* Preview */}
          <div style={{
            background:'var(--black)',aspectRatio:ratio==='16:9'?'16/9':'9/16',maxHeight:230,
            display:'flex',alignItems:'center',justifyContent:'center',position:'relative',cursor:'pointer',
          }} onClick={()=>alert('영상 미리보기 (데모 기능)')}>
            <div style={{textAlign:'center'}}>
              <p style={{fontSize:20,fontWeight:800,letterSpacing:'-0.04em',color:'rgba(255,255,255,0.9)',marginBottom:4}}>{scenes[active].title}</p>
              <p style={{fontSize:12,color:'rgba(255,255,255,0.3)'}}>씬 {scenes[active].id} · {scenes[active].duration}</p>
            </div>
            <div style={{position:'absolute',bottom:14,right:14,width:36,height:36,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.18)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)"><path d="m5 3 14 9-14 9V3z"/></svg>
            </div>
          </div>
          {/* Info */}
          <div style={{padding:20}}>
            <p style={{fontSize:11,fontWeight:600,color:'var(--g30)',letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:8}}>시각 프롬프트</p>
            <div style={{background:'var(--g04)',borderRadius:R.md,padding:'12px 14px',marginBottom:16}}>
              <p style={{fontSize:12,color:'var(--g70)',fontFamily:'monospace',lineHeight:1.65}}>{scenes[active].prompt}</p>
            </div>
            <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
              {['영상 재생성','음성 재생성','BGM 변경'].map(a=>(
                <button key={a} onClick={()=>alert(`${a} (데모 기능)`)} style={{
                  display:'flex',alignItems:'center',gap:5,
                  fontSize:12,color:'var(--g70)',fontWeight:500,
                  background:'none',border:'1px solid var(--g08)',
                  borderRadius:R.full,padding:'7px 14px',cursor:'pointer',
                }}>
                  <Refresh/> {a}
                </button>
              ))}
            </div>
          </div>
          <div style={{margin:'0 20px 20px',padding:'12px 16px',background:'var(--g04)',borderRadius:R.md}}>
            <p style={{fontSize:12,color:'var(--g70)',fontWeight:500}}>렌더링 완료 · {ratio} · 1080p H.264 · 총 {fmt(totalSec)}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const STEPS = [null,<S1 key={1}/>,<S2 key={2}/>,<S3 key={3}/>,<S4 key={4}/>,<S5 key={5}/>]

  return(
    <div style={{background:'var(--white)',minHeight:'100vh'}}>
      {/* Nav */}
      <nav className="nav-bar">
        <div style={{maxWidth:960,margin:'0 auto',padding:'0 28px',height:54,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <span className="point"/>
            <span style={{fontSize:14,fontWeight:700,letterSpacing:'-0.04em',color:'var(--black)'}}>ScriptRoll</span>
          </Link>

          {/* Step indicator */}
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            {STEP_LABELS.map((label,i)=>{
              const n=i+1,isA=step===n,isDone=step>n
              return(
                <div key={i} style={{display:'flex',alignItems:'center',gap:6}}>
                  <div style={{display:'flex',alignItems:'center',gap:5,opacity:isA?1:isDone?0.55:0.22}}>
                    <div style={{
                      width:22,height:22,borderRadius:'50%',flexShrink:0,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      border:`1.5px solid ${isA?'var(--black)':'var(--g30)'}`,
                      background:isA||isDone?'var(--black)':'transparent',
                    }}>
                      {isDone?<Check s={10} c="var(--white)"/>:<span style={{fontSize:10,fontWeight:700,color:isA?'var(--white)':'var(--g30)'}}>{n}</span>}
                    </div>
                    <span style={{fontSize:12,fontWeight:isA?600:400,color:isA?'var(--black)':'var(--g50)'}}>{label}</span>
                  </div>
                  {i<4&&<div style={{width:14,height:1,background:'var(--g08)'}}/>}
                </div>
              )
            })}
          </div>

          <span style={{fontSize:12,color:'var(--g30)',fontWeight:500}}>데모</span>
        </div>
      </nav>

      {/* Main */}
      <div style={{maxWidth:960,margin:'0 auto',padding:'52px 28px'}}>
        {/* Header */}
        <div style={{marginBottom:36}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:5}}>
            <span style={{fontSize:11,fontWeight:600,color:'var(--g30)',letterSpacing:'0.04em'}}>{String(step).padStart(2,'0')}</span>
            <h1 style={{fontSize:26,fontWeight:800,letterSpacing:'-0.05em',color:'var(--black)'}}>{STEP_TITLES[step-1]}</h1>
          </div>
          <p style={{fontSize:14,color:'var(--g50)',fontWeight:400,letterSpacing:'-0.01em'}}>{STEP_SUBS[step-1]}</p>
        </div>

        <div style={{height:1,background:'var(--g08)',marginBottom:36}}/>

        {/* Content */}
        <div key={step}>{STEPS[step]}</div>

        {/* Back */}
        {step>1&&step!==4&&(
          <button onClick={()=>step===5?setStep(1):setStep(step-1)}
            style={{display:'flex',alignItems:'center',gap:4,marginTop:28,fontSize:13,color:'var(--g30)',background:'none',border:'none',cursor:'pointer',padding:0}}>
            <Chevron/> {step===5?'처음으로':'이전 단계'}
          </button>
        )}
      </div>
    </div>
  )
}
