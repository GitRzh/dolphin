import { IconArrowTrendingUp, IconChevronRight } from './Icons.jsx'

export default function CTAPanel() {
  return (
    <section
      aria-labelledby="cta-heading"
      style={{
        borderBottom: '1px solid rgba(255,200,1,0.1)',
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '400px',
      }}
      className="cta-grid"
      >
        {/* Left — dark panel */}
        <div data-sr data-sr-dir="left" style={{
          padding: '5rem 3rem',
          background: 'rgba(17,76,90,0.2)',
          borderRight: '1px solid rgba(255,200,1,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative corner accent */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '200px', height: '200px',
            background: 'radial-gradient(circle at top left, rgba(255,200,1,0.06), transparent 70%)',
            pointerEvents: 'none',
          }} aria-hidden="true" />

          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            color: '#FFC801',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            ◆ Get started today
          </div>

          <h2
            id="cta-heading"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              fontWeight: 700,
              color: '#F1F6F4',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
            }}
          >
            Your data stack<br />
            deserves a <span style={{ color: '#FFC801' }}>brain</span>.
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: 'rgba(241,246,244,0.55)',
            maxWidth: '400px',
            marginBottom: '2.5rem',
          }}>
            Start automating your pipelines in under 20 minutes.
            No infrastructure to provision, no YAML to write.
            Connect a source, define an output — Dolphin handles the rest.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#" className="btn-primary" aria-label="Start your free Dolphin trial">
              Start free trial
              <IconChevronRight style={{ width: '14px', height: '14px' }} />
            </a>
            <a href="#" className="btn-ghost" aria-label="Book a Dolphin demo">
              Book a demo
            </a>
          </div>
        </div>

        {/* Right — accent panel with terminal snippet */}
        <div data-sr data-sr-dir="right" data-sr-delay="100" style={{
          padding: '5rem 3rem',
          background: 'rgba(13,31,40,0.6)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0',
            border: '1px solid rgba(255,200,1,0.1)',
            marginBottom: '2rem',
          }}>
            {[
              { value: '20 min', label: 'Average time to first pipeline' },
              { value: '2,800+', label: 'Teams on Dolphin today' },
              { value: '14-day', label: 'Free trial, no card needed' },
              { value: '24/7', label: 'Agent uptime, guaranteed' },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: '1.25rem 1.5rem',
                borderRight: i % 2 === 0 ? '1px solid rgba(255,200,1,0.08)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(255,200,1,0.08)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: '#FFC801',
                  marginBottom: '0.25rem',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  color: 'rgba(241,246,244,0.4)',
                  lineHeight: 1.4,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CLI snippet */}
          <div style={{
            background: 'rgba(10,20,26,0.8)',
            border: '1px solid rgba(255,200,1,0.08)',
            padding: '1.25rem 1.5rem',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: 'rgba(255,200,1,0.35)',
              marginBottom: '0.75rem',
              letterSpacing: '0.06em',
            }}>
              $ quick start
            </div>
            {[
              { prompt: '$', cmd: 'npm install -g @dolphin/cli', color: 'rgba(241,246,244,0.7)' },
              { prompt: '$', cmd: 'dolphin init my-workspace', color: 'rgba(241,246,244,0.7)' },
              { prompt: '$', cmd: 'dolphin connect postgres://prod', color: 'rgba(241,246,244,0.7)' },
              { prompt: '✓', cmd: 'Workspace ready. 3 sources detected.', color: '#4ade80' },
            ].map((line, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '0.375rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
              }}>
                <span style={{ color: '#FFC801', opacity: 0.5 }}>{line.prompt}</span>
                <span style={{ color: line.color }}>{line.cmd}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
          }
          .cta-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,200,1,0.1);
          }
        }
      `}</style>
    </section>
  )
}
