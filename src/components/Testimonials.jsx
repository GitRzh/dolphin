const TESTIMONIALS = [
  {
    quote: 'We cut our data engineering headcount from 8 to 3 and tripled throughput. Dolphin just handles things that used to require entire sprint cycles.',
    author: 'Priya Mehta',
    title: 'VP Engineering',
    company: 'Razorpay',
    metric: '3× throughput',
  },
  {
    quote: 'The anomaly detection alone justified the contract. It caught a schema drift in our payments table 40 minutes before it would have broken our revenue dashboard.',
    author: 'Daniel Asamoah',
    title: 'Data Platform Lead',
    company: 'Monzo',
    metric: '40min early warning',
  },
  {
    quote: "Other tools make you feel like you're fighting your warehouse. Dolphin feels like it actually understands what you're trying to do.",
    author: 'Yuki Tanaka',
    title: 'Head of Analytics',
    company: 'Mercari',
    metric: '94% fewer alerts',
  },
  {
    quote: "We went from 2-week pipeline deployments to same-day. The AI-generated transforms aren't perfect every time but they're right 90% of the time, which is still a 10× improvement.",
    author: 'Claudia Reyes',
    title: 'Director of Data',
    company: 'Clip',
    metric: '14→1 day cycles',
  },
  {
    quote: 'The column-level lineage made our GDPR audit almost painless. We could answer every deletion request in under 30 seconds with full documentation.',
    author: 'Thomas Bauer',
    title: 'Chief Data Officer',
    company: 'N26',
    metric: 'GDPR audit ready',
  },
  {
    quote: 'The SDK let us build a custom agent that validates our ML training data before it hits the feature store. That kind of extensibility is why we chose Dolphin over Airflow.',
    author: 'Fatima Al-Rashid',
    title: 'MLOps Engineer',
    company: 'Careem',
    metric: '0 bad training runs',
  },
]

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      style={{
        padding: '5rem 0',
        borderBottom: '1px solid rgba(255,200,1,0.1)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <header style={{ marginBottom: '3rem' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            color: '#FFC801',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            ◆ Customer stories
          </div>
          <h2
            id="testimonials-heading"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: '#F1F6F4',
              lineHeight: 1.1,
            }}
          >
            Teams that shipped faster.<br />
            <span style={{ color: '#FFC801' }}>With fewer engineers.</span>
          </h2>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border: '1px solid rgba(255,200,1,0.1)',
          }}
          className="testimonial-grid"
        >
          {TESTIMONIALS.map((t, i) => (
            <article
              key={i}
              className="testimonial-card"
              aria-label={`Testimonial from ${t.author}, ${t.title} at ${t.company}`}
              data-sr
              data-sr-delay={`${(i % 3) * 80}`}
              style={{
                borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,200,1,0.08)' : 'none',
                borderBottom: i < 3 ? '1px solid rgba(255,200,1,0.08)' : 'none',
                padding: '0',
                display: 'flex',
              }}
            >
              {/* Vertical company name — bold mono, rotated */}
              <div style={{
                borderRight: '1px solid rgba(255,200,1,0.08)',
                padding: '1.5rem 0.6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                minWidth: '40px',
                background: 'rgba(255,200,1,0.015)',
              }}>
                <span style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,200,1,0.4)',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  transition: 'color 200ms ease-out',
                }}
                className="testimonial-company-label"
                >
                  {t.company}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '1.75rem 1.5rem', flex: 1 }}>
                <div style={{ marginBottom: '1rem', display: 'inline-block' }}>
                  <span className="tag tag-accent">{t.metric}</span>
                </div>

                <blockquote style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: 'rgba(241,246,244,0.65)',
                  margin: '0 0 1.25rem 0',
                  padding: 0,
                  borderLeft: 'none',
                }}>
                  "{t.quote}"
                </blockquote>

                <footer>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#F1F6F4',
                    marginBottom: '2px',
                  }}>
                    {t.author}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    color: 'rgba(241,246,244,0.35)',
                  }}>
                    {t.title}
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-card:hover .testimonial-company-label {
          color: rgba(255,200,1,0.75) !important;
        }
        @media (max-width: 900px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
          .testimonial-grid > article {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,200,1,0.08) !important;
          }
        }
      `}</style>
    </section>
  )
}