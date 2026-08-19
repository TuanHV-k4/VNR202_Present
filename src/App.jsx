import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, useTexture } from '@react-three/drei'
import { motion, useScroll, useSpring } from 'framer-motion'
import { allNodes, chapters } from './data/content'
import './App.css'

function Key({ completion = .16, turning = false, tilt = -.68, modelScale = .74 }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * (turning ? 1.5 : .18)
    ref.current.rotation.z = tilt + Math.sin(state.clock.elapsedTime * .55) * .018
  })
  return <group ref={ref} rotation={[.1, -.35, tilt]} scale={modelScale}>
    <mesh castShadow><cylinderGeometry args={[.105, .105, 2.25, 32]} /><meshStandardMaterial color="#c99a3e" metalness={1} roughness={.22} /></mesh>
    <mesh position={[0, 1.42, 0]} castShadow><torusGeometry args={[.44, .095, 20, 64]} /><meshStandardMaterial color="#e0bf70" metalness={1} roughness={.18} /></mesh>
    {Array.from({ length: 6 }).map((_, index) => {
      const visible = completion * 7 > index
      return <mesh key={index} position={[visible ? .2 : .05, -.78 + index * .2, 0]} scale={[visible ? 1 : .05, 1, 1]} castShadow>
        <boxGeometry args={[.42 + (index % 2) * .14, .095, .13]} /><meshStandardMaterial color={visible ? '#d8ad51' : '#342d20'} metalness={.95} roughness={.22} />
      </mesh>
    })}
    <mesh position={[0, -1.35, 0]} castShadow><sphereGeometry args={[.16, 24, 24]} /><meshStandardMaterial color="#b58a38" metalness={1} roughness={.2} /></mesh>
  </group>
}

function KeyScene({ completion, turning = false, tilt, modelScale }) {
  return <div className="key-canvas" aria-hidden="true"><Canvas camera={{ position: [0, 0, 6.4], fov: 38 }} dpr={[1, 1.5]} shadows>
    <ambientLight intensity={.48} /><spotLight position={[4, 4, 5]} intensity={9} angle={.42} penumbra={1} castShadow />
    <pointLight position={[-3, -1, 2]} intensity={3} color="#9e3328" />
    <Suspense fallback={null}><Float speed={.8} rotationIntensity={.05} floatIntensity={.12}><Key completion={completion} turning={turning} tilt={tilt} modelScale={modelScale} /></Float><Environment preset="studio" /></Suspense>
  </Canvas></div>
}

const chamberEvidence = [
  ['/assets/archive/evidence-1939.png', [-2.35, 1.15, -1.7], [0, .3, -.05], 1.18],
  ['/assets/archive/evidence-1941.png', [2.25, 1.25, -1.5], [0, -.32, .04], 1.08],
  ['/assets/archive/evidence-1943.png', [-2.75, -.85, -1.2], [0, .4, .08], 1.02],
  ['/assets/archive/evidence-1944.png', [2.65, -.72, -1.05], [0, -.42, -.06], 1.08],
  ['/assets/archive/evidence-1945.png', [1.55, .02, -2.25], [0, -.18, 0], 1.42],
]

function EvidencePlane({ item, index }) {
  const [url, position, rotation, size] = item
  const texture = useTexture(url)
  return <Float speed={.28 + index * .05} rotationIntensity={.025} floatIntensity={.08}>
    <mesh position={position} rotation={rotation} scale={size}>
      <planeGeometry args={[1.8, 1.2]} />
      <meshStandardMaterial map={texture} roughness={.88} metalness={0} />
    </mesh>
  </Float>
}

function ChamberRig() {
  const rig = useRef()
  useFrame((state, delta) => {
    if (!rig.current) return
    const targetX = state.pointer.y * .1
    const targetY = state.pointer.x * .14
    rig.current.rotation.x += (targetX - rig.current.rotation.x) * Math.min(1, delta * 2.4)
    rig.current.rotation.y += (targetY - rig.current.rotation.y) * Math.min(1, delta * 2.4)
    state.camera.position.x += (state.pointer.x * .22 - state.camera.position.x) * Math.min(1, delta * 1.5)
    state.camera.position.y += (state.pointer.y * .12 - state.camera.position.y) * Math.min(1, delta * 1.5)
    state.camera.lookAt(0, 0, 0)
  })
  return <group ref={rig}>
    {chamberEvidence.map((item, index) => <EvidencePlane key={item[0]} item={item} index={index} />)}
    <Float speed={.62} rotationIntensity={.035} floatIntensity={.16}>
      <Key completion={1} tilt={0} modelScale={.88} />
    </Float>
  </group>
}

function ChamberScene() {
  return <div className="chamber-stage" aria-hidden="true">
    <div className="chamber-canvas"><Canvas camera={{ position: [0, 0, 6.6], fov: 37 }} dpr={[1, 1.5]} shadows>
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 6, 5]} intensity={4.8} color="#fff8e8" castShadow />
      <pointLight position={[-3, 1, 3]} intensity={1.8} color="#A66A32" />
      <Suspense fallback={null}><ChamberRig /><Environment preset="studio" /></Suspense>
    </Canvas></div>
    <div className="chamber-orbit" />
    <span className="chamber-year year-1939">1939</span><span className="chamber-year year-1941">1941</span><span className="chamber-year year-1943">1943</span><span className="chamber-year year-1944">1944</span><span className="chamber-year year-1945">1945</span>
  </div>
}

function MapLayer({ active }) {
  const points = [[18,72],[31,40],[43,25],[56,34],[65,54],[77,64],[86,43]]
  return <div className="map-layer" aria-label="Bản đồ khái quát các địa điểm và tuyến phát triển căn cứ">
    <svg viewBox="0 0 100 80" role="img" aria-label="Tuyến căn cứ cách mạng từ Bắc Sơn, Võ Nhai tới Cao Bằng và Việt Bắc">
      <path className="land" d="M38 4 51 8 57 16 67 13 77 23 74 35 84 43 78 55 69 59 63 74 52 72 47 61 35 55 30 45 18 39 25 27 27 14Z" />
      <path className="route" d="M18 72 C28 58 24 44 31 40 S41 30 43 25 52 30 56 34 61 44 65 54 70 62 77 64 82 56 86 43" />
      {points.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i === active % points.length ? 1.8 : .8} className={i === active % points.length ? 'active' : ''} />)}
    </svg>
    <span className="map-label north">CAO BẰNG</span><span className="map-label mid">BẮC SƠN · VÕ NHAI</span><span className="map-label south">TÂN TRÀO</span>
  </div>
}

function Dossier({ node, index, onNext }) {
  return <motion.article className="dossier" key={node.id} initial={{ opacity: .35, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .38 }}>
    <header><div><span>HỒ SƠ {String(index + 1).padStart(2, '0')} / {String(allNodes.length).padStart(2, '0')}</span><strong>{node.date}</strong></div><b>GIẢI MẬT</b></header>
    <div className="dossier-title"><p>{node.type}</p><h2>{node.title}</h2></div>
    <div className="dossier-body">{node.paragraphs.map((paragraph, i)=><p key={i}>{paragraph}</p>)}</div>
    <aside><span>Ý nghĩa trong ẩn dụ</span><p>{node.insight}</p></aside>
    <footer><span>Mảnh {node.chapterNumber} · {node.period}</span><button onClick={onNext}>Hồ sơ kế tiếp <i aria-hidden="true">→</i></button></footer>
  </motion.article>
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })
  const [active, setActive] = useState(0)
  const [visited, setVisited] = useState(() => new Set([0]))
  const [panel, setPanel] = useState('evidence')
  const [menu, setMenu] = useState(false)
  const [before, setBefore] = useState(null)
  const [after, setAfter] = useState(null)
  const [unlocked, setUnlocked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [page, setPage] = useState(0)
  const gesture = useRef({ locked: false, touchY: 0, touchTarget: null })
  const pageCount = 6
  const activeNode = allNodes[active]
  const completion = Math.max(.14, visited.size / allNodes.length)
  const answerLabel = (value) => value === 'luck' ? 'Thời cơ là yếu tố quyết định' : value === 'prepared' ? 'Thắng lợi đến từ sự chuẩn bị để nắm thời cơ' : 'Chưa đưa ra lựa chọn'
  const goPage = (nextPage) => setPage(Math.max(0, Math.min(pageCount - 1, nextPage)))
  const choose = (index) => { setActive(index); setVisited(current => new Set([...current, index])); goPage(2) }
  const next = () => choose((active + 1) % allNodes.length)
  useEffect(() => { const onKey = (event) => { if (event.target.matches('input,button,a')) return; if (event.key === 'ArrowRight' || event.key === 'ArrowDown') goPage(page + 1); if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') goPage(page - 1) }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [page])
  useEffect(() => {
    const canTurn = (direction, eventTarget) => {
      const scene = document.querySelectorAll('.story-page')[page]
      if (!scene) return true
      let element = eventTarget instanceof Element ? eventTarget : scene
      while (element && scene.contains(element)) {
        const styles = window.getComputedStyle(element)
        const scrollable = /(auto|scroll)/.test(styles.overflowY) && element.scrollHeight > element.clientHeight + 2
        if (scrollable) {
          const hasRoomBelow = element.scrollTop + element.clientHeight < element.scrollHeight - 2
          const hasRoomAbove = element.scrollTop > 2
          if ((direction > 0 && hasRoomBelow) || (direction < 0 && hasRoomAbove)) return false
        }
        element = element.parentElement
      }
      return true
    }
    const turn = (direction, eventTarget) => {
      if (gesture.current.locked || !canTurn(direction, eventTarget)) return
      gesture.current.locked = true
      goPage(page + direction)
      window.setTimeout(() => { gesture.current.locked = false }, 900)
    }
    const onWheel = (event) => { if (Math.abs(event.deltaY) > 22) turn(event.deltaY > 0 ? 1 : -1, event.target) }
    const onTouchStart = (event) => { gesture.current.touchY = event.touches[0]?.clientY ?? 0; gesture.current.touchTarget = event.target }
    const onTouchEnd = (event) => { const endY = event.changedTouches[0]?.clientY ?? gesture.current.touchY; const distance = gesture.current.touchY - endY; if (Math.abs(distance) > 54) turn(distance > 0 ? 1 : -1, gesture.current.touchTarget) }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('touchstart', onTouchStart); window.removeEventListener('touchend', onTouchEnd) }
  }, [page])

  return <div className="app-shell">
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-wash" />
      <div className="ambient-glows" />
      <i className="ambient-orb orb-cream" />
      <i className="ambient-orb orb-olive" />
      <i className="ambient-orb orb-copper" />
      <i className="ambient-ribbon ribbon-warm" />
      <i className="ambient-ribbon ribbon-cool" />
    </div>
    <motion.div className="reading-progress" style={{ scaleX: progress }} />
    <a className="skip-link" href="#workspace">Bỏ qua phần mở đầu</a>
    <header className="topbar"><a className="brand" href="#top" onClick={(event)=>{event.preventDefault();goPage(0)}}><b>THE KEY</b><span>1945</span></a>
      <nav className={menu ? 'open' : ''} aria-label="Điều hướng chính"><a href="#workspace" onClick={(event)=>{event.preventDefault();setMenu(false);goPage(2)}}>Dòng thời gian</a><a href="#chapters" onClick={(event)=>{event.preventDefault();setMenu(false);goPage(3)}}>Ba mảnh chìa</a><a href="#verdict" onClick={(event)=>{event.preventDefault();setMenu(false);goPage(4)}}>Kết luận</a></nav>
      <button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label="Mở điều hướng"><span/><span/></button>
    </header>

    <main className="story-main" data-page={page} style={{transform:`translate3d(0, -${page * 100}svh, 0)`}}>
      <section className="hero story-page" id="top">
        <div className="hero-copy"><span className="period">1939 — 1945 · HỒ SƠ 01</span><h1>Ổ khóa xuất hiện<br/>trong một đêm.</h1><p className="hero-thesis">Chiếc chìa được rèn suốt sáu năm.</p><p className="hero-intro">Một hồ sơ tương tác về đường lối, lực lượng và những quyết định đã biến thời cơ Tháng Tám thành thắng lợi.</p>
          <div className="hero-actions"><a className="primary-action" href="#workspace" onClick={(event)=>{event.preventDefault();goPage(2)}}>Mở hồ sơ</a><button className="text-action" onClick={()=>goPage(1)}>Đưa ra phán đoán trước</button></div>
        </div>
        <div className="hero-map"><ChamberScene/><MapLayer active={active}/><KeyScene completion={completion}/><div className="key-status"><span>Trạng thái chìa khóa</span><b>{visited.size}/{allNodes.length} bằng chứng đã đọc</b><i><em style={{transform:`scaleX(${completion})`}}/></i></div></div>
        <aside className="evidence-preview"><header><span>Bằng chứng</span><b>{String(allNodes.length).padStart(2,'0')}</b></header>{allNodes.slice(0,6).map((node,i)=><button key={node.id} onClick={()=>choose(i)} className={active===i?'active':''}><span>{String(i+1).padStart(2,'0')}</span><div><b>{node.title}</b><small>{node.date}</small></div></button>)}<a href="#workspace">Xem toàn bộ hồ sơ ↓</a></aside>
      </section>

      <section className={`pre-vote story-page ${before?'has-answer':''}`}>
        <header><span>Ghi lại quan điểm ban đầu</span><h2>Thắng lợi tháng Tám là “ăn may”<br/>hay kết quả của chuẩn bị?</h2><p>Chọn chiếc chìa đại diện cho nhận định của bạn. Câu trả lời sẽ được mở lại sau khi toàn bộ chứng cứ được giải mật.</p></header>
        <div className="lock-choice-stage">
          <button className={`key-choice luck-key ${before==='luck'?'selected':''}`} onClick={()=>setBefore('luck')} aria-pressed={before==='luck'}>
            <span className="choice-code">Lập luận A</span><div className="choice-key-3d"><KeyScene completion={.38} tilt={-Math.PI/2} modelScale={.92}/></div><strong>Thời cơ là yếu tố quyết định</strong><small>Nhật đầu hàng tạo ra khoảng trống quyền lực.</small>
          </button>
          <div className={`central-lock ${before?'locked':''}`} aria-hidden="true"><i/><b>{before?'ĐÃ KHÓA':'CHỌN MỘT CHÌA'}</b></div>
          <button className={`key-choice prepared-key ${before==='prepared'?'selected':''}`} onClick={()=>setBefore('prepared')} aria-pressed={before==='prepared'}>
            <span className="choice-code">Lập luận B</span><div className="choice-key-3d"><KeyScene completion={1} tilt={-Math.PI/2} modelScale={.92}/></div><strong>Thắng lợi nhờ chuẩn bị để nắm thời cơ</strong><small>Thời cơ chỉ phát huy khi lực lượng đã sẵn sàng.</small>
          </button>
        </div>
        <div className={`locked-message ${before?'show':''}`} role="status"><b>Quan điểm đã được khóa.</b><span>Hãy xem chứng cứ để kiểm tra lựa chọn này.</span><button onClick={()=>goPage(2)}>Bắt đầu giải mật →</button></div>
        <div className="preview-timeline" aria-label="Hành trình chứng cứ từ năm 1939 đến 1945"><i/><span>1939</span><span>1941</span><span>1943</span><span>1944</span><span>1945</span></div>
      </section>

      <section className="workspace story-page" id="workspace">
        <div className="workspace-head"><div><span>Trục bằng chứng 1939—1945</span><h2>Mỗi mốc là một răng chìa.</h2></div><div className="view-switch" aria-label="Chọn lớp thông tin"><button className={panel==='evidence'?'active':''} onClick={()=>setPanel('evidence')}>Hồ sơ</button><button className={panel==='map'?'active':''} onClick={()=>setPanel('map')}>Bản đồ</button></div></div>
        <div className="key-rail" role="tablist" aria-label="Các mốc thời gian"><div className="rail-line" style={{'--rail-progress':(active+1)/allNodes.length}}/><div className="rail-key"/>{allNodes.map((node,i)=><button role="tab" aria-selected={active===i} key={node.id} className={`${active===i?'active ':''}${visited.has(i)?'visited':''}`} onClick={()=>choose(i)}><i/><span>{node.date.replace(' — ','–')}</span><small>{i+1}</small></button>)}</div>
        <div className="workspace-grid"><aside className="archive-index fixed-index" aria-label="Danh sách hồ sơ">{allNodes.map((node,index)=><button key={node.id} onClick={()=>choose(index)} className={active===index?'active':''}><span>{String(index+1).padStart(2,'0')}</span><p><b>{node.title}</b><small>{node.date}</small></p></button>)}</aside>
          {panel==='evidence'?<Dossier node={activeNode} index={active} onNext={next}/>:<div className="map-panel"><MapLayer active={active}/><div><span>Hồ sơ đang định vị</span><h3>{activeNode.title}</h3><p>{activeNode.insight}</p><button onClick={()=>setPanel('evidence')}>Đọc hồ sơ đầy đủ</button></div></div>}
        </div>
      </section>

      <section className="chapters story-page" id="chapters"><header><span>Ba công đoạn rèn</span><h2>Không có mảnh nào<br/>tự xuất hiện.</h2></header>{chapters.map((chapter,chapterIndex)=><article key={chapter.id}><div className="chapter-number">{chapter.number}</div><div className="chapter-copy"><span>{chapter.period} · {chapter.part}</span><h3>{chapter.title}</h3><p>{chapter.lead}</p><blockquote>{chapter.close}</blockquote></div><div className="chapter-nodes">{chapter.nodes.map(node=>{const i=allNodes.findIndex(n=>n.id===node.id); return <button key={node.id} onClick={()=>choose(i)}><span>{node.date}</span><b>{node.title}</b><small>{visited.has(i)?'Đã giải mật':'Mở hồ sơ'} →</small></button>})}</div><div className="chapter-key"><span>{chapterIndex===0?'Thân chìa':chapterIndex===1?'Răng chìa':'Mảnh cuối'}</span><i style={{'--completion':`${(chapterIndex+1)*33}%`}}/></div></article>)}</section>

      <section className="verdict story-page" id="verdict"><div className="verdict-key"><KeyScene completion={1} turning={unlocked}/></div><div className="verdict-copy"><span>Kết luận · đối chiếu bằng chứng</span><h2>Ổ khóa bất ngờ.<br/>Chiếc chìa thì không.</h2><p>{chapters[2].close}</p><div className="verdict-facts"><div><b>1939</b><span>Chuyển hướng chiến lược</span></div><div><b>1941—44</b><span>Xây dựng lực lượng</span></div><div><b>12—16/8</b><span>Quyết định xoay chìa</span></div></div><div className="final-vote"><p>Sau khi xem toàn bộ chứng cứ, kết luận của bạn là gì?</p><button className={after==='luck'?'selected':''} onClick={()=>setAfter('luck')}>Thời cơ là yếu tố quyết định</button><button className={after==='prepared'?'selected':''} onClick={()=>{setAfter('prepared');setUnlocked(true)}}>Thắng lợi nhờ chuẩn bị để nắm thời cơ</button></div>{after&&<motion.div className="comparison" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}><div><span>Quan điểm ban đầu</span><p>{answerLabel(before)}</p></div><i aria-hidden="true">→</i><div><span>Kết luận sau khi xem chứng cứ</span><p>{answerLabel(after)}</p></div><strong>{before ? before === after ? 'Bạn giữ nguyên quan điểm.' : 'Bạn đã thay đổi quan điểm.' : 'Bạn chưa trả lời câu hỏi ban đầu.'}</strong></motion.div>}</div></section>

      <section className="answer-section story-page" aria-labelledby="answer-title">
        <header className="answer-head"><span>Câu trả lời của nhóm</span><h2 id="answer-title">Nhận định “ăn may” là<br/><em>không công bằng với lịch sử.</em></h2><p>Nhật đầu hàng và Pháp chưa kịp trở lại đúng là thời cơ khách quan đặc biệt thuận lợi. Nhưng thời cơ chỉ tạo ra một khoảng trống quyền lực; nó không tự tạo ra đường lối, lực lượng, căn cứ địa, tổ chức quần chúng hay năng lực phát lệnh khởi nghĩa trên cả nước.</p></header>

        <div className="argument-axis" aria-label="Ba tầng chứng cứ lịch sử">
          <article><div className="argument-date"><b>1939—1940</b><span>Chọn đúng đường lối</span></div><div><h3>Chuẩn bị về chiến lược trước khi thời cơ xuất hiện</h3><p>Hội nghị Trung ương 6 tháng 11/1939 đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, tạm gác nhiệm vụ ruộng đất và chủ trương xây dựng mặt trận dân tộc thống nhất. Bắc Sơn, Nam Kỳ và Đô Lương tuy chưa thắng lợi nhưng để lại kinh nghiệm đấu tranh vũ trang cùng những hạt nhân lực lượng đầu tiên.</p><strong>Chứng cứ này bác bỏ ý nghĩ rằng cách mạng chỉ bắt đầu chuẩn bị sau khi Nhật đầu hàng.</strong></div></article>
          <article><div className="argument-date"><b>1941—1944</b><span>Tạo ra chiếc chìa</span></div><div><h3>Chuẩn bị có hệ thống về tổ chức và lực lượng</h3><p>Hội nghị Trung ương 8 tháng 5/1941 hoàn chỉnh đường lối giải phóng dân tộc; Việt Minh ra đời để tập hợp quần chúng. Cứu quốc quân, căn cứ Bắc Sơn–Võ Nhai và Cao Bằng được xây dựng; Đề cương văn hóa năm 1943 mở rộng mặt trận tư tưởng; Đội Việt Nam Tuyên truyền Giải phóng quân thành lập ngày 22/12/1944.</p><strong>Đến cuối năm 1944, cách mạng đã có đường lối, mặt trận, căn cứ và lực lượng vũ trang — những điều không thể sinh ra trong vài ngày.</strong></div></article>
          <article className="decisive"><div className="argument-date"><b>03—08/1945</b><span>Nhận và chớp thời cơ</span></div><div><h3>Chủ động điều chỉnh và hành động đúng lúc</h3><p>Chỉ ba ngày sau cuộc đảo chính 9/3, Chỉ thị “Nhật – Pháp bắn nhau và hành động của chúng ta” đã xác định đúng kẻ thù và phát động cao trào kháng Nhật. Từ tháng 3 đến tháng 6, lực lượng vũ trang được thống nhất, bảy chiến khu và Khu giải phóng Việt Bắc hình thành, phong trào “phá kho thóc” mở rộng cơ sở quần chúng. Khi Nhật đầu hàng, Quân lệnh số 1 được ban hành ngay trong đêm 13/8.</p><strong>Tốc độ ra quyết định không phải dấu hiệu của may mắn; đó là dấu hiệu của một bộ máy đã sẵn sàng.</strong></div></article>
        </div>

        <div className="counterpoint"><div><span>Phần đúng của nhận định</span><h3>Không có thời cơ tháng Tám, thắng lợi khó diễn ra nhanh như vậy.</h3><p>Nhật đầu hàng làm chính quyền tay sai tê liệt, trong khi quân Đồng minh chưa vào Đông Dương và Pháp chưa kịp khôi phục bộ máy. Đây là điều kiện khách quan hiếm có và tồn tại rất ngắn.</p></div><div><span>Điểm sai căn bản</span><h3>Đồng nhất “có thời cơ” với “tự nhiên thắng lợi”.</h3><p>Nhiều lực lượng cùng đứng trước khoảng trống quyền lực, nhưng chỉ Việt Minh có tổ chức quần chúng rộng, lực lượng vũ trang, căn cứ địa, đường lối rõ ràng và khả năng giành chính quyền trên phạm vi cả nước.</p></div></div>

        <blockquote className="answer-thesis">“Thời cơ tháng Tám là ổ khóa xuất hiện bất ngờ. Nhưng chiếc chìa để mở nó đã được rèn liên tục từ năm 1939.”</blockquote>

        <div className="spoken-answer"><span>Bản trả lời ngắn để thuyết trình</span><p>Theo nhóm, gọi Cách mạng Tháng Tám là một cuộc “ăn may” là không công bằng với lịch sử. Nhật đầu hàng chỉ tạo ra thời cơ khách quan, còn khả năng biến thời cơ thành thắng lợi là kết quả của một quá trình chuẩn bị lâu dài và chủ động. Từ năm 1939, Đảng đã chuyển hướng chiến lược, đặt giải phóng dân tộc lên hàng đầu. Giai đoạn 1941–1944, đường lối được hoàn chỉnh, Việt Minh được thành lập, lực lượng chính trị, lực lượng vũ trang và căn cứ địa được xây dựng. Năm 1945, Đảng tiếp tục phản ứng kịp thời trước cuộc đảo chính Nhật–Pháp, phát động cao trào kháng Nhật và chuẩn bị chính quyền cách mạng. Vì vậy, khi thời cơ xuất hiện vào tháng Tám, cách mạng có đủ lực lượng và năng lực lãnh đạo để phát lệnh Tổng khởi nghĩa, giành chính quyền trong cả nước. Thắng lợi không phải tất yếu theo nghĩa tự động sẽ xảy ra, mà là kết quả tất yếu có điều kiện: thời cơ khách quan chỉ phát huy tác dụng khi gặp sự chuẩn bị chủ quan đầy đủ và quyết định hành động đúng lúc.</p><button onClick={async()=>{await navigator.clipboard?.writeText('Theo nhóm, gọi Cách mạng Tháng Tám là một cuộc “ăn may” là không công bằng với lịch sử. Nhật đầu hàng chỉ tạo ra thời cơ khách quan, còn khả năng biến thời cơ thành thắng lợi là kết quả của một quá trình chuẩn bị lâu dài và chủ động. Từ năm 1939, Đảng đã chuyển hướng chiến lược, đặt giải phóng dân tộc lên hàng đầu. Giai đoạn 1941–1944, đường lối được hoàn chỉnh, Việt Minh được thành lập, lực lượng chính trị, lực lượng vũ trang và căn cứ địa được xây dựng. Năm 1945, Đảng tiếp tục phản ứng kịp thời trước cuộc đảo chính Nhật–Pháp, phát động cao trào kháng Nhật và chuẩn bị chính quyền cách mạng. Vì vậy, khi thời cơ xuất hiện vào tháng Tám, cách mạng có đủ lực lượng và năng lực lãnh đạo để phát lệnh Tổng khởi nghĩa, giành chính quyền trong cả nước. Thắng lợi không phải tất yếu theo nghĩa tự động sẽ xảy ra, mà là kết quả tất yếu có điều kiện: thời cơ khách quan chỉ phát huy tác dụng khi gặp sự chuẩn bị chủ quan đầy đủ và quyết định hành động đúng lúc.');setCopied(true);setTimeout(()=>setCopied(false),1800)}}>{copied?'Đã sao chép':'Sao chép câu trả lời'}</button></div>
      </section>
    </main>
    <div className="page-controls" aria-label="Điều hướng trang"><button onClick={()=>goPage(page-1)} disabled={page===0} aria-label="Trang trước">←</button><span><b>{String(page+1).padStart(2,'0')}</b> / {String(pageCount).padStart(2,'0')}</span><button onClick={()=>goPage(page+1)} disabled={page===pageCount-1} aria-label="Trang sau">→</button></div>
  </div>
}
