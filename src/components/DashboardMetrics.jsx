// Pure SVG charts — zero chart libraries

function Gauge({ value = 84, label = 'Pipeline Health' }) {
  // Arc from -135deg to 135deg (270deg sweep)
  const R = 70
  const cx = 90, cy = 90
  const circumference = 2 * Math.PI * R
  const sweep = 270
  const dashTotal = (sweep / 360) * circumference
  const dashFill = (value / 100) * dashTotal

  // Convert degrees to radians for arc calculation
  const startAngle = -225 // degrees (from 3 o'clock: -225 = 8 o'clock position)
  const toRad = d => (d * Math.PI) / 180
  const arcPath = (r, startDeg, endDeg) => {
    const s = { x: cx + r * Math.cos(toRad(startDeg)), y: cy + r * Math.sin(toRad(startDeg)) }
    const e = { x: cx + r * Math.cos(toRad(endDeg)), y: cy + r * Math.sin(toRad(endDeg)) }
    const large = endDeg - startDeg > 180 ? 1 : 0
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
  }

  const trackPath = arcPath(R, startAngle, startAngle + sweep)
  const fillAngle = startAngle + (value / 100) * sweep
  const fillPath = arcPath(R, startAngle, fillAngle)

  return (
    <figure aria-label={`${label}: ${value}%`} style={{ margin: 0 }}>
      <svg viewBox="0 0 180 160" style={{ width: '100%', maxWidth: '200px' }}>
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9932"/>
            <stop offset="100%" stopColor="#FFC801"/>
          </linearGradient>
          <filter id="gaugeGlow">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Track */}
        <path d={trackPath} fill="none" stroke="rgba(255,200,1,0.1)" strokeWidth="10" strokeLinecap="butt"/>

        {/* Fill arc */}
        <path
          d={fillPath}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="10"
          strokeLinecap="butt"
          filter="url(#gaugeGlow)"
          className="gauge-arc"
        />

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map(pct => {
          const angle = startAngle + (pct / 100) * sweep
          const ir = R - 14, or = R - 6
          const ix = cx + ir * Math.cos(toRad(angle))
          const iy = cy + ir * Math.sin(toRad(angle))
          const ox = cx + or * Math.cos(toRad(angle))
          const oy = cy + or * Math.sin(toRad(angle))
          return <line key={pct} x1={ix} y1={iy} x2={ox} y2={oy} stroke="rgba(255,200,1,0.3)" strokeWidth="1"/>
        })}

        {/* Center value */}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#FFC801" fontSize="28" fontWeight="700" fontFamily="JetBrains Mono, monospace">{value}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="rgba(241,246,244,0.4)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1">%</text>

        {/* Label */}
        <text x={cx} y={148} textAnchor="middle" fill="rgba(241,246,244,0.5)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">{label.toUpperCase()}</text>

        {/* Min/Max labels */}
        <text x="14" y="134" fill="rgba(255,200,1,0.3)" fontSize="7" fontFamily="JetBrains Mono, monospace">0</text>
        <text x="153" y="134" fill="rgba(255,200,1,0.3)" fontSize="7" fontFamily="JetBrains Mono, monospace">100</text>
      </svg>
    </figure>
  )
}

function BarChart() {
  const bars = [
    { label: 'Mon', value: 78, sla: false },
    { label: 'Tue', value: 91, sla: false },
    { label: 'Wed', value: 65, sla: false },
    { label: 'Thu', value: 88, sla: false },
    { label: 'Fri', value: 95, sla: false },
    { label: 'Sat', value: 72, sla: false },
    { label: 'Sun', value: 99, sla: false },
  ]
  const maxH = 100
  const slaY = 100 - 80  // 80% SLA line at y=20 in a 100-unit space

  return (
    <figure aria-label="Weekly pipeline throughput bar chart with 80% SLA line" style={{ margin: 0 }}>
      <svg viewBox="0 0 280 140" style={{ width: '100%' }}>
        <defs>
          <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFC801" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#FF9932" stopOpacity="0.4"/>
          </linearGradient>
        </defs>

        {/* Y-axis grid lines */}
        {[0, 25, 50, 75, 100].map(v => {
          const y = 110 - (v / 100) * maxH
          return (
            <g key={v}>
              <line x1="28" y1={y} x2="272" y2={y} stroke="rgba(255,200,1,0.06)" strokeWidth="1"/>
              <text x="22" y={y + 3} textAnchor="end" fill="rgba(241,246,244,0.25)" fontSize="7" fontFamily="JetBrains Mono, monospace">{v}</text>
            </g>
          )
        })}

        {/* SLA line at 80% */}
        <line x1="28" y1={110 - 80} x2="272" y2={110 - 80} stroke="#FF9932" strokeWidth="1" strokeDasharray="4 3" opacity="0.7"/>
        <text x="275" y={110 - 78} fill="#FF9932" fontSize="7" fontFamily="JetBrains Mono, monospace">SLA</text>

        {/* Bars */}
        {bars.map((b, i) => {
          const x = 36 + i * 34
          const h = (b.value / 100) * maxH
          const y = 110 - h
          const isAbove = b.value >= 80
          return (
            <g key={b.label}>
              <rect
                x={x} y={y}
                width={22} height={h}
                fill={isAbove ? 'url(#barGrad)' : 'rgba(255,153,50,0.35)'}
                className="bar-animated"
                style={{ animationDelay: `${i * 80}ms` }}
              />
              <text x={x + 11} y="125" textAnchor="middle" fill="rgba(241,246,244,0.35)" fontSize="7.5" fontFamily="JetBrains Mono, monospace">{b.label}</text>
            </g>
          )
        })}
      </svg>
      <figcaption style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.65rem',
        color: 'rgba(241,246,244,0.35)',
        letterSpacing: '0.08em',
        textAlign: 'center',
        marginTop: '-4px',
      }}>
        WEEKLY THROUGHPUT (%) — DASHED: 80% SLA
      </figcaption>
    </figure>
  )
}

function Sparkline() {
  const points = [42, 38, 55, 51, 67, 63, 72, 69, 80, 78, 91, 88, 95, 92, 99]
  const w = 200, h = 60
  const min = Math.min(...points)
  const max = Math.max(...points)
  const toX = i => (i / (points.length - 1)) * w
  const toY = v => h - ((v - min) / (max - min)) * h

  const pathD = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ')
  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`

  return (
    <figure aria-label="Processing throughput trend sparkline" style={{ margin: 0 }}>
      <svg viewBox={`0 0 ${w} ${h + 10}`} style={{ width: '100%' }}>
        <defs>
          <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFC801" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#FFC801" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={areaD} className="sparkline-area" />
        <path d={pathD} className="sparkline-path" />
        {/* Last point dot */}
        <circle
          cx={toX(points.length - 1)}
          cy={toY(points[points.length - 1])}
          r="3"
          fill="#FFC801"
          className="node-pulse"
        />
      </svg>
      <figcaption style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.65rem',
        color: 'rgba(241,246,244,0.35)',
        letterSpacing: '0.08em',
        marginTop: '4px',
      }}>
        30-DAY THROUGHPUT TREND ↑ +136%
      </figcaption>
    </figure>
  )
}

export default function DashboardMetrics() {
  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-heading"
      style={{
        padding: '5rem 0',
        borderBottom: '1px solid rgba(255,200,1,0.1)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Section header */}
        <header style={{ marginBottom: '3rem' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            color: '#FFC801',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            ◆ Live monitoring
          </div>
          <h2
            id="dashboard-heading"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: '#F1F6F4',
              lineHeight: 1.1,
              maxWidth: '520px',
            }}
          >
            Your stack. Visible. In real time.
          </h2>
        </header>

        {/* Dashboard panel */}
        <div style={{
          border: '1px solid rgba(255,200,1,0.12)',
          background: 'rgba(13,31,40,0.9)',
        }}>
          {/* Panel header bar */}
          <div style={{
            borderBottom: '1px solid rgba(255,200,1,0.08)',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'rgba(17,76,90,0.15)',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
                <div key={i} style={{ width: '8px', height: '8px', background: c, opacity: 0.7 }} />
              ))}
            </div>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              color: 'rgba(255,200,1,0.4)',
              letterSpacing: '0.08em',
            }}>
              dolphin / monitoring / overview — workspace: production
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ width: '6px', height: '6px', background: '#4ade80' }} />
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                color: '#4ade80',
                letterSpacing: '0.06em',
              }}>ALL SYSTEMS NOMINAL</span>
            </div>
          </div>

          {/* Metrics grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr 1fr',
            borderBottom: '1px solid rgba(255,200,1,0.08)',
          }}
          className="metrics-grid"
          >
            {/* Gauge */}
            <div style={{
              padding: '2rem',
              borderRight: '1px solid rgba(255,200,1,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                color: 'rgba(255,200,1,0.5)',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}>
                Pipeline Health
              </div>
              <Gauge value={84} label="Health Score" />
            </div>

            {/* Bar chart */}
            <div style={{
              padding: '2rem',
              borderRight: '1px solid rgba(255,200,1,0.08)',
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                color: 'rgba(255,200,1,0.5)',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}>
                Throughput / Week
              </div>
              <BarChart />
            </div>

            {/* Sparkline + quick stats */}
            <div style={{ padding: '2rem' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                color: 'rgba(255,200,1,0.5)',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}>
                30-Day Trend
              </div>
              <Sparkline />

              {/* Mini stats */}
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Avg latency', value: '78ms' },
                  { label: 'Error rate', value: '0.03%' },
                  { label: 'Active jobs', value: '1,247' },
                ].map(s => (
                  <div key={s.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid rgba(255,200,1,0.06)',
                  }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(241,246,244,0.4)' }}>
                      {s.label}
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8125rem', fontWeight: 600, color: '#FFC801' }}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Log line */}
          <div style={{
            padding: '0.625rem 1.5rem',
            display: 'flex',
            gap: '1rem',
            overflowX: 'hidden',
          }}>
            {[
              { time: '14:23:01', msg: 'dolphin.agent.optimizer — rebalanced 3 shards across partition group pg-07', type: 'info' },
              { time: '14:22:47', msg: 'dolphin.monitor — anomaly detected in stream kafka-prod-02, auto-resolved', type: 'warn' },
              { time: '14:22:31', msg: 'dolphin.transform — completed 480,000 row batch in 76ms', type: 'ok' },
            ].map((log, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                flexShrink: 0,
                maxWidth: '380px',
                padding: '0.375rem 0.75rem',
                background: 'rgba(17,76,90,0.15)',
                border: '1px solid rgba(255,200,1,0.06)',
              }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'rgba(255,200,1,0.35)', whiteSpace: 'nowrap', paddingTop: '1px' }}>{log.time}</span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  color: log.type === 'warn' ? '#FF9932' : log.type === 'ok' ? '#4ade80' : 'rgba(241,246,244,0.45)',
                  lineHeight: 1.5,
                }}>{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .metrics-grid {
            grid-template-columns: 1fr !important;
          }
          .metrics-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,200,1,0.08);
          }
        }
      `}</style>
    </section>
  )
}
