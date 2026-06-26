import { useRef, useCallback, useEffect } from 'react'
import { IconChevronRight, IconChevronDown } from './Icons.jsx'

// Multi-dimensional price matrix — never hardcoded in JSX
const PRICE_MATRIX = {
  USD: {
    symbol: '$',
    monthly:  { starter: 49,  growth: 199,   enterprise: 899  },
    annual:   { starter: 39,  growth: 159,   enterprise: 719  },
  },
  INR: {
    symbol: '₹',
    monthly:  { starter: 4099, growth: 16599, enterprise: 74999 },
    annual:   { starter: 3299, growth: 13299, enterprise: 59999 },
  },
  EUR: {
    symbol: '€',
    monthly:  { starter: 45,  growth: 185,   enterprise: 829  },
    annual:   { starter: 36,  growth: 148,   enterprise: 663  },
  },
}

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For small teams moving fast',
    features: [
      '5 pipelines',
      '50M rows / month',
      '3 destinations',
      'Community support',
      '7-day data retention',
      'Basic observability',
    ],
    cta: 'Start free',
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For teams scaling their stack',
    features: [
      'Unlimited pipelines',
      '500M rows / month',
      '25 destinations',
      'Slack + email support',
      '30-day retention',
      'Advanced observability',
      'AI-generated transforms',
      'Column-level lineage',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For orgs with serious data needs',
    features: [
      'Unlimited everything',
      'Custom row volume',
      'Unlimited destinations',
      'Dedicated SRE + SLA',
      'Custom retention',
      'Full governance suite',
      'Custom agent SDK',
      'SSO / SAML / SCIM',
      'Private deployment',
    ],
    cta: 'Contact sales',
    featured: false,
  },
]

export default function Pricing() {
  // Isolated state via refs — zero parent re-renders
  const annualRef = useRef(false)
  const currencyRef = useRef('USD')
  const toggleTrackRef = useRef(null)
  const toggleThumbRef = useRef(null)
  const billingLabelRef = useRef(null)
  const currencyRefs = useRef({})
  const priceRefs = useRef({})  // keyed by tier id
  const periodRefs = useRef({})
  const saveBadgeRef = useRef(null)

  // Mutate DOM nodes directly — no state, no re-render
  const updatePrices = useCallback(() => {
    const isAnnual = annualRef.current
    const currency = currencyRef.current
    const matrix = PRICE_MATRIX[currency]
    const tier = isAnnual ? 'annual' : 'monthly'

    TIERS.forEach(t => {
      const priceNode = priceRefs.current[t.id]
      const periodNode = periodRefs.current[t.id]
      if (priceNode) {
        priceNode.textContent = `${matrix.symbol}${matrix[tier][t.id].toLocaleString()}`
      }
      if (periodNode) {
        periodNode.textContent = isAnnual ? '/ mo, billed annually' : '/ month'
      }
    })

    // Update toggle visual
    if (toggleTrackRef.current) {
      if (isAnnual) {
        toggleTrackRef.current.classList.add('active')
      } else {
        toggleTrackRef.current.classList.remove('active')
      }
    }

    // Billing label
    if (billingLabelRef.current) {
      billingLabelRef.current.textContent = isAnnual ? 'Annual billing' : 'Monthly billing'
      billingLabelRef.current.style.color = isAnnual ? '#FFC801' : 'rgba(241,246,244,0.5)'
    }

    // Save badge
    if (saveBadgeRef.current) {
      saveBadgeRef.current.style.opacity = isAnnual ? '1' : '0'
    }
  }, [])

  const handleToggle = useCallback(() => {
    annualRef.current = !annualRef.current
    updatePrices()
  }, [updatePrices])

  const handleCurrency = useCallback((cur) => {
    currencyRef.current = cur
    // Update active currency button styles
    Object.entries(currencyRefs.current).forEach(([key, node]) => {
      if (!node) return
      if (key === cur) {
        node.style.color = '#FFC801'
        node.style.borderColor = '#FFC801'
        node.style.background = 'rgba(255,200,1,0.08)'
      } else {
        node.style.color = 'rgba(241,246,244,0.45)'
        node.style.borderColor = 'rgba(255,200,1,0.12)'
        node.style.background = 'transparent'
      }
    })
    updatePrices()
  }, [updatePrices])

  // Init prices on mount
  useEffect(() => { updatePrices() }, [updatePrices])

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      style={{
        padding: '5rem 0',
        borderBottom: '1px solid rgba(255,200,1,0.1)',
        background: 'rgba(13,31,40,0.4)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            color: '#FFC801',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            ◆ Pricing
          </div>
          <h2
            id="pricing-heading"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: '#F1F6F4',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Transparent pricing.<br />No surprise bills.
          </h2>

          {/* Controls row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '2rem',
            flexWrap: 'wrap',
          }}>
            {/* Billing toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                color: 'rgba(241,246,244,0.5)',
                letterSpacing: '0.06em',
              }}>Monthly</span>
              <button
                ref={toggleTrackRef}
                className="toggle-track"
                role="switch"
                aria-checked="false"
                aria-label="Toggle annual billing"
                onClick={handleToggle}
                onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleToggle() } }}
              >
                <div ref={toggleThumbRef} className="toggle-thumb" />
              </button>
              <span
                ref={billingLabelRef}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  color: 'rgba(241,246,244,0.5)',
                  letterSpacing: '0.06em',
                  transition: 'color 180ms ease-out',
                }}
              >
                Annual billing
              </span>
              <span
                ref={saveBadgeRef}
                className="tag-accent tag"
                style={{ opacity: 0, transition: 'opacity 200ms ease-out' }}
              >
                Save 20%
              </span>
            </div>

            {/* Separator */}
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,200,1,0.15)' }} />

            {/* Currency switcher */}
            <div style={{ display: 'flex', gap: '0.375rem' }} role="group" aria-label="Currency selector">
              {['USD', 'INR', 'EUR'].map(cur => (
                <button
                  key={cur}
                  ref={el => currencyRefs.current[cur] = el}
                  onClick={() => handleCurrency(cur)}
                  aria-label={`Switch to ${cur} pricing`}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    padding: '0.375rem 0.75rem',
                    border: '1px solid rgba(255,200,1,0.12)',
                    background: cur === 'USD' ? 'rgba(255,200,1,0.08)' : 'transparent',
                    color: cur === 'USD' ? '#FFC801' : 'rgba(241,246,244,0.45)',
                    cursor: 'pointer',
                    transition: 'color 160ms ease-out, border-color 160ms ease-out, background 160ms ease-out',
                  }}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Pricing cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
          border: '1px solid rgba(255,200,1,0.12)',
        }}
        className="pricing-grid"
        >
          {TIERS.map((tier, i) => (
            <article
              key={tier.id}
              className={`price-card ${tier.featured ? 'featured' : ''}`}
              aria-label={`${tier.name} pricing tier`}
              data-sr
              data-sr-delay={`${i * 120}`}
              style={{
                borderRight: i < 2 ? '1px solid rgba(255,200,1,0.1)' : 'none',
                position: 'relative',
                padding: '2.5rem 2rem',
              }}
            >
              {tier.featured && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #FFC801, transparent)',
                }} aria-hidden="true" />
              )}
              {tier.featured && (
                <div style={{
                  position: 'absolute',
                  top: '1rem', right: '1rem',
                }}>
                  <span className="tag tag-accent">Most popular</span>
                </div>
              )}

              <header style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: tier.featured ? '#FFC801' : '#F1F6F4',
                  letterSpacing: '0.06em',
                  marginBottom: '0.375rem',
                }}>
                  {tier.name}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8125rem',
                  color: 'rgba(241,246,244,0.4)',
                  marginBottom: '1.25rem',
                }}>
                  {tier.tagline}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span
                    ref={el => priceRefs.current[tier.id] = el}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: '#F1F6F4',
                      lineHeight: 1,
                    }}
                  >
                    —
                  </span>
                </div>
                <div
                  ref={el => periodRefs.current[tier.id] = el}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    color: 'rgba(241,246,244,0.35)',
                    marginTop: '0.25rem',
                  }}
                >
                  / month
                </div>
              </header>

              <a
                href="#"
                className={tier.featured ? 'btn-primary' : 'btn-ghost'}
                aria-label={`${tier.cta} — ${tier.name} plan`}
                style={{ width: '100%', justifyContent: 'center', marginBottom: '2rem', display: 'flex' }}
              >
                {tier.cta}
                <IconChevronRight style={{ width: '14px', height: '14px' }} />
              </a>

              <ul
                aria-label={`${tier.name} plan features`}
                style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}
              >
                {tier.features.map(feat => (
                  <li
                    key={feat}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8125rem',
                      color: 'rgba(241,246,244,0.6)',
                      lineHeight: 1.45,
                    }}
                  >
                    <span style={{ color: '#FFC801', flexShrink: 0, marginTop: '2px', fontSize: '0.65rem' }}>◆</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Enterprise note */}
        <p style={{
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.8125rem',
          color: 'rgba(241,246,244,0.35)',
          marginTop: '2rem',
        }}>
          All plans include a 14-day free trial. No credit card required.
          Enterprise contracts available with custom SLAs, private cloud deployment, and dedicated support.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
          }
          .pricing-grid > article {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,200,1,0.1);
          }
        }
      `}</style>
    </section>
  )
}
