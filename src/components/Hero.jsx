import { useEffect, useRef } from 'react'
import { IconChevronRight } from './Icons.jsx'

function PipelineCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const NODES = [
      { id: 'n1', x: 60,  y: 80,  label: 'Postgres',  sub: 'SOURCE', main: false, hw: 34, hh: 16 },
      { id: 'n2', x: 60,  y: 200, label: 'S3 Bucket', sub: 'SOURCE', main: false, hw: 34, hh: 16 },
      { id: 'n3', x: 60,  y: 320, label: 'Kafka',     sub: 'SOURCE', main: false, hw: 34, hh: 16 },
      { id: 'n4', x: 220, y: 140, label: 'Transform', sub: null,     main: false, hw: 34, hh: 16 },
      { id: 'n5', x: 220, y: 260, label: 'Validate',  sub: null,     main: false, hw: 34, hh: 16 },
      { id: 'n6', x: 380, y: 200, label: 'DOLPHIN',   sub: null,     main: true,  hw: 44, hh: 22 },
      { id: 'n7', x: 520, y: 120, label: 'Snowflake', sub: null,     main: false, hw: 34, hh: 16 },
      { id: 'n8', x: 520, y: 200, label: 'BigQuery',  sub: null,     main: false, hw: 34, hh: 16 },
      { id: 'n9', x: 520, y: 280, label: 'Redshift',  sub: null,     main: false, hw: 34, hh: 16 },
    ]
    const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]))

    function edgePoints(from, to) {
      const dx = to.x - from.x
      const dy = to.y - from.y
      const len = Math.hypot(dx, dy)
      const ux = dx / len, uy = dy / len
      return {
        exitX: from.x + ux * from.hw,
        exitY: from.y + uy * from.hh,
        entryX: to.x - ux * to.hw,
        entryY: to.y - uy * to.hh,
      }
    }

    const EDGES = [
      { from: 'n1', to: 'n4' }, { from: 'n2', to: 'n4' }, { from: 'n2', to: 'n5' },
      { from: 'n3', to: 'n5' }, { from: 'n4', to: 'n6' }, { from: 'n5', to: 'n6' },
      { from: 'n6', to: 'n7' }, { from: 'n6', to: 'n8' }, { from: 'n6', to: 'n9' },
    ]
    const EDGE_POINTS = EDGES.map(e => ({ ...e, ...edgePoints(nodeMap[e.from], nodeMap[e.to]) }))

    const particles = []
    const MAX_PARTICLES = 22

    function spawnParticle() {
      const ep = EDGE_POINTS[Math.floor(Math.random() * EDGE_POINTS.length)]
      const isOutput = ep.from === 'n6'
      particles.push({
        ep, t: 0,
        speed: 0.003 + Math.random() * 0.003,
        color: isOutput ? '#4ade80' : '#FFC801',
        size: 2.2 + Math.random() * 1.2,
        trail: [],
      })
    }

    for (let i = 0; i < 12; i++) {
      spawnParticle()
      particles[particles.length - 1].t = Math.random()
    }

    const nodePhase = {}
    NODES.forEach((n, i) => { nodePhase[n.id] = (i / NODES.length) * Math.PI * 2 })

    let animId, lastTime = 0

    function sc() { return { sx: canvas.width / 600, sy: canvas.height / 400 } }

    function drawGrid() {
      const { sx, sy } = sc()
      ctx.strokeStyle = 'rgba(255,200,1,0.04)'
      ctx.lineWidth = 1
      ;[100, 200, 300, 400, 500].forEach(x => {
        ctx.beginPath(); ctx.moveTo(x*sx, 20*sy); ctx.lineTo(x*sx, 380*sy); ctx.stroke()
      })
      ;[80, 160, 240, 320].forEach(y => {
        ctx.beginPath(); ctx.moveTo(20*sx, y*sy); ctx.lineTo(580*sx, y*sy); ctx.stroke()
      })
    }

    function drawEdge(ep, t) {
      const { sx, sy } = sc()
      const x1 = ep.exitX*sx, y1 = ep.exitY*sy, x2 = ep.entryX*sx, y2 = ep.entryY*sy
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
      ctx.strokeStyle = 'rgba(255,200,1,0.07)'; ctx.lineWidth = 1; ctx.setLineDash([]); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
      ctx.strokeStyle = 'rgba(255,200,1,0.2)'; ctx.lineWidth = 1
      ctx.setLineDash([5, 8]); ctx.lineDashOffset = -(t * 52) % 52; ctx.stroke()
      ctx.setLineDash([])
    }

    function drawNode(n, t) {
      const { sx, sy } = sc()
      const x = n.x*sx, y = n.y*sy
      const pulse = Math.sin(t * 0.0015 + nodePhase[n.id])
      if (n.main) {
        const w = n.hw*2*sx, h = n.hh*2*sy
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 55*sx)
        grd.addColorStop(0, `rgba(255,200,1,${0.06 + pulse*0.03})`)
        grd.addColorStop(1, 'rgba(255,200,1,0)')
        ctx.fillStyle = grd; ctx.fillRect(x - 58*sx, y - 52*sy, 116*sx, 104*sy)
        ctx.fillStyle = `rgba(255,200,1,${0.08 + pulse*0.04})`; ctx.fillRect(x-w/2, y-h/2, w, h)
        ctx.strokeStyle = `rgba(255,200,1,${0.7 + pulse*0.3})`; ctx.lineWidth = 1.5; ctx.strokeRect(x-w/2, y-h/2, w, h)
        ctx.fillStyle = `rgba(255,200,1,${0.88 + pulse*0.12})`
        ctx.font = `bold ${Math.round(10*Math.min(sx,sy))}px JetBrains Mono, monospace`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(n.label, x, y)
      } else {
        const w = n.hw*2*sx, h = n.hh*2*sy
        ctx.fillStyle = `rgba(17,76,90,${0.5 + pulse*0.08})`; ctx.fillRect(x-w/2, y-h/2, w, h)
        ctx.strokeStyle = `rgba(255,200,1,${0.18 + pulse*0.1})`; ctx.lineWidth = 1; ctx.strokeRect(x-w/2, y-h/2, w, h)
        ctx.fillStyle = `rgba(241,246,244,${0.6 + pulse*0.15})`
        ctx.font = `${Math.round(8.5*Math.min(sx,sy))}px JetBrains Mono, monospace`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(n.label, x, y)
        if (n.sub) {
          ctx.fillStyle = 'rgba(255,200,1,0.35)'; ctx.font = `${Math.round(7*Math.min(sx,sy))}px JetBrains Mono, monospace`
          ctx.fillText(n.sub, x, (n.y + n.hh + 10)*sy)
        }
      }
    }

    function drawStatusDot(n, t) {
      const { sx, sy } = sc()
      const x = (n.x + n.hw + 4)*sx, y = (n.y - n.hh)*sy
      const pulse = Math.sin(t * 0.003 + nodePhase[n.id])
      const r = (2.5 + pulse)*Math.min(sx,sy)
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2)
      ctx.fillStyle = `rgba(74,222,128,${0.55 + pulse*0.45})`; ctx.fill()
    }

    function drawParticle(p) {
      const { sx, sy } = sc()
      const { exitX, exitY, entryX, entryY } = p.ep
      const x = (exitX + (entryX - exitX)*p.t)*sx
      const y = (exitY + (entryY - exitY)*p.t)*sy
      p.trail.forEach((tr, i) => {
        const a = (i / p.trail.length) * 0.35
        ctx.beginPath(); ctx.arc(tr.x, tr.y, p.size*0.45*Math.min(sx,sy), 0, Math.PI*2)
        ctx.fillStyle = p.color === '#FFC801' ? `rgba(255,200,1,${a})` : `rgba(74,222,128,${a})`; ctx.fill()
      })
      ctx.beginPath(); ctx.arc(x, y, p.size*Math.min(sx,sy), 0, Math.PI*2)
      ctx.fillStyle = p.color === '#FFC801' ? 'rgba(255,200,1,0.95)' : 'rgba(74,222,128,0.95)'; ctx.fill()
      const r = p.size*3.5*Math.min(sx,sy)
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r)
      grd.addColorStop(0, p.color === '#FFC801' ? 'rgba(255,200,1,0.28)' : 'rgba(74,222,128,0.28)')
      grd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fillStyle = grd; ctx.fill()
      return { x, y }
    }

    function frame(time) {
      const dt = Math.min(time - lastTime, 50)
      lastTime = time
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      EDGE_POINTS.forEach(ep => drawEdge(ep, time))
      ;['n7','n8','n9'].forEach(id => drawStatusDot(nodeMap[id], time))
      NODES.forEach(n => drawNode(n, time))
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      EDGE_POINTS.forEach(ep => drawEdge(ep, time))
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        const pos = drawParticle(p)
        p.trail.push(pos)
        if (p.trail.length > 7) p.trail.shift()
        p.t += p.speed * (dt / 16)
        if (p.t >= 1) particles.splice(i, 1)
      }
      ;['n7','n8','n9'].forEach(id => drawStatusDot(nodeMap[id], time))
      NODES.forEach(n => drawNode(n, time))
      while (particles.length < MAX_PARTICLES) spawnParticle()
      animId = requestAnimationFrame(frame)
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width  = rect.width
      canvas.height = Math.min(rect.width * (400/600), 420)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    animId = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-label="Dolphin data pipeline architecture — live animated view"
      role="img"
      style={{ display: 'block', width: '100%' }}
    />
  )
}

export default function Hero() {
  return (
    <section
      id="platform"
      aria-labelledby="hero-headline"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,200,1,0.1)',
      }}
    >
      {/* ── Background depth stack ────────────────────────────────────── */}
      {/* Layer 1: animated orb glows */}
      <div className="hero-bg-depth" aria-hidden="true" />

      {/* Layer 2: dense dot grid with radial fade */}
      <div className="hero-dot-grid" aria-hidden="true" />

      {/* Layer 3: scanline texture */}
      <div className="hero-scanlines" aria-hidden="true" />

      {/* Layer 4: original grid lines (kept) */}
      <div
        className="grid-overlay"
        style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}
        aria-hidden="true"
      />

      {/* Layer 5: vignette — darkens edges so content pops */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(13,31,40,0.7) 100%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '7rem 1.5rem 5rem', width: '100%', position: 'relative', zIndex: 1 }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
          className="hero-grid"
        >
          {/* Left */}
          <div>
            <div className="anim-fadeup" style={{ animationDelay: '0ms' }}>
              <span className="tag tag-accent" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>◆ Now in public beta</span>
            </div>
            <h1
              id="hero-headline"
              className="anim-fadeup delay-100"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: '#F1F6F4',
                marginBottom: '1.5rem',
              }}
            >
              Data Pipelines<br />That{' '}<span style={{ color: '#FFC801' }}>Think</span><br />For You
            </h1>
            <p
              className="anim-fadeup delay-200"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'rgba(241,246,244,0.65)',
                maxWidth: '480px',
                marginBottom: '2.5rem',
              }}
            >
              Dolphin connects, transforms, and orchestrates your entire data stack using AI agents that monitor quality, resolve anomalies, and optimize throughput — without a single manual trigger.
            </p>
            <div className="anim-fadeup delay-300" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#pricing" className="btn-primary" aria-label="Start your free Dolphin trial">
                Start free trial <IconChevronRight style={{ width: '14px', height: '14px' }} />
              </a>
              <a href="#features" className="btn-ghost" aria-label="View Dolphin platform features">See the platform</a>
            </div>
            <div
              className="anim-fadein delay-400"
              style={{
                marginTop: '3rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255,200,1,0.08)',
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: '99.97%', label: 'Uptime SLA' },
                { value: '<80ms', label: 'Median latency' },
                { value: 'SOC 2', label: 'Type II certified' },
              ].map(t => (
                <div key={t.label}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '1.125rem', color: '#FFC801' }}>{t.value}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(241,246,244,0.45)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pipeline canvas */}
          <div
            className="anim-fadein delay-200"
            style={{
              border: '1px solid rgba(255,200,1,0.1)',
              background: 'rgba(13,31,40,0.8)',
              padding: '1.5rem',
              position: 'relative',
              /* subtle inset glow matching the teal orb */
              boxShadow: '0 0 60px rgba(17,76,90,0.3), inset 0 0 40px rgba(17,76,90,0.1)',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(255,200,1,0.08)',
            }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
                <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, opacity: 0.7 }} />
              ))}
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                color: 'rgba(255,200,1,0.4)',
                letterSpacing: '0.08em',
                marginLeft: '0.5rem',
              }}>
                dolphin.pipeline — live view
              </span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', animation: 'pulse-node 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#4ade80', letterSpacing: '0.06em' }}>RUNNING</span>
              </div>
            </div>
            <PipelineCanvas />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
