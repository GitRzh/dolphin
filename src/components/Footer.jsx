import { IconCube, IconLink } from './Icons.jsx'

const FOOTER_COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Ingestion', href: '#' },
      { label: 'Transformation', href: '#' },
      { label: 'Orchestration', href: '#' },
      { label: 'Observability', href: '#' },
      { label: 'Governance', href: '#' },
      { label: 'Agent SDK', href: '#' },
    ],
  },
  {
    heading: 'Integrations',
    links: [
      { label: 'Postgres', href: '#' },
      { label: 'Snowflake', href: '#' },
      { label: 'BigQuery', href: '#' },
      { label: 'dbt Cloud', href: '#' },
      { label: 'Kafka', href: '#' },
      { label: 'View all 200+', href: '#', accent: true },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API reference', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Status page', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid rgba(255,200,1,0.1)',
        background: 'rgba(10,20,26,0.8)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Main footer grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr repeat(4, 1fr)',
          gap: '0',
          padding: '4rem 0',
          borderBottom: '1px solid rgba(255,200,1,0.08)',
        }}
        className="footer-grid"
        >
          {/* Brand col */}
          <div data-sr style={{
            paddingRight: '3rem',
            borderRight: '1px solid rgba(255,200,1,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <IconCube style={{ width: '18px', height: '18px', color: '#FFC801' }} />
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                fontSize: '0.9375rem',
                letterSpacing: '0.04em',
                color: '#F1F6F4',
              }}>
                DOLPHIN
              </span>
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              lineHeight: 1.7,
              color: 'rgba(241,246,244,0.4)',
              maxWidth: '260px',
              marginBottom: '1.5rem',
            }}>
              AI-powered data automation for teams that move fast and need their pipelines to move faster.
            </p>

            {/* Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'SOC 2 Type II',
                'GDPR compliant',
                'ISO 27001',
              ].map(badge => (
                <span key={badge} className="tag" style={{ display: 'inline-block', alignSelf: 'flex-start' }}>
                  ◆ {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col, i) => (
            <nav
              key={col.heading}
              aria-label={`${col.heading} links`}
              data-sr
              data-sr-delay={`${i * 60}`}
              style={{
                padding: '0 1.5rem',
                borderRight: i < 3 ? '1px solid rgba(255,200,1,0.08)' : 'none',
              }}
            >
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#FFC801',
                marginBottom: '1rem',
              }}>
                {col.heading}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.8125rem',
                        color: link.accent ? '#FFC801' : 'rgba(241,246,244,0.45)',
                        textDecoration: 'none',
                        transition: 'color 160ms ease-out',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = link.accent ? '#e6b400' : '#F1F6F4'}
                      onMouseLeave={e => e.currentTarget.style.color = link.accent ? '#FFC801' : 'rgba(241,246,244,0.45)'}
                    >
                      {link.label}
                      {link.accent && <IconLink style={{ width: '10px', height: '10px' }} />}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: '1.5rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: 'rgba(241,246,244,0.25)',
            letterSpacing: '0.04em',
          }}>
            © 2026 Dolphin Technologies, Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Twitter / X', 'GitHub', 'LinkedIn', 'Discord'].map(social => (
              <a
                key={social}
                href="#"
                aria-label={`Dolphin on ${social}`}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  color: 'rgba(241,246,244,0.3)',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  transition: 'color 160ms ease-out',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#FFC801'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(241,246,244,0.3)'}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .footer-grid > *:first-child {
            grid-column: span 2;
            border-right: none !important;
            padding-right: 0 !important;
            border-bottom: 1px solid rgba(255,200,1,0.08);
            padding-bottom: 2rem;
          }
          .footer-grid > nav {
            border-right: none !important;
            padding: 0 !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
