import { IconArrowTrendingUp } from './Icons.jsx'

const STATS = [
  { value: '4.2B+', label: 'Records processed daily', delta: '+18% MoM', positive: true },
  { value: '99.97%', label: 'Pipeline uptime SLA', delta: 'Industry avg: 99.5%', positive: true },
  { value: '<80ms', label: 'Median transform latency', delta: 'vs 340ms without Dolphin', positive: true },
  { value: '2,800+', label: 'Active data teams', delta: '+340 this quarter', positive: true },
]

export default function StatsBar() {
  return (
    <section
      aria-label="Platform statistics"
      style={{
        borderBottom: '1px solid rgba(255,200,1,0.1)',
        background: 'rgba(17,76,90,0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
        className="stats-grid"
      >
        {STATS.map((s, i) => (
          <article
            key={s.label}
            aria-label={`Stat: ${s.label}`}
            data-sr
            data-sr-delay={`${i * 80}`}
            style={{
              padding: '2rem 2rem',
              borderRight: i < 3 ? '1px solid rgba(255,200,1,0.08)' : 'none',
              position: 'relative',
            }}
          >
            {/* Accent line top */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: i === 0 ? '100%' : '40%',
              height: '2px',
              background: 'linear-gradient(90deg, #FFC801, transparent)',
              opacity: i === 0 ? 0.6 : 0.2,
            }} aria-hidden="true" />

            <div className="stat-value" data-appeared style={{ marginBottom: '0.375rem' }}>
              {s.value}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              color: 'rgba(241,246,244,0.55)',
              marginBottom: '0.625rem',
              lineHeight: 1.4,
            }}>
              {s.label}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              color: s.positive ? '#4ade80' : '#f87171',
              letterSpacing: '0.04em',
            }}>
              <IconArrowTrendingUp style={{ width: '12px', height: '12px' }} />
              {s.delta}
            </div>
          </article>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > article:nth-child(2) {
            border-right: none !important;
          }
          .stats-grid > article:nth-child(1),
          .stats-grid > article:nth-child(2) {
            border-bottom: 1px solid rgba(255,200,1,0.08);
          }
        }
      `}</style>
    </section>
  )
}
