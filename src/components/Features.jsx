import { useState, useEffect, useRef, useCallback } from 'react'
import { IconArrowPath, IconArrowTrendingUp, IconChartPie, IconCog, IconCube, IconLink, IconChevronDown } from './Icons.jsx'

const FEATURES = [
  {
    id: 0,
    icon: IconArrowPath,
    eyebrow: 'Ingestion',
    title: 'Zero-config connectors',
    body: 'Dolphin auto-discovers schema and configures connectors from 200+ sources. Drop a credential — the agent handles the rest.',
    detail: 'Incremental syncs, change-data-capture, and full-table refreshes are selected automatically based on source characteristics and SLA requirements.',
    span: 'col-span-4 row-span-2',
    accentColor: '#FFC801',
  },
  {
    id: 1,
    icon: IconCog,
    eyebrow: 'Transformation',
    title: 'AI-generated transforms',
    body: 'Describe your output schema in plain English. Dolphin writes, tests, and deploys the dbt models.',
    detail: 'Full lineage tracking with column-level impact analysis. Every generated model ships with unit tests and documentation.',
    span: 'col-span-4 row-span-1',
    accentColor: '#FF9932',
  },
  {
    id: 2,
    icon: IconArrowTrendingUp,
    eyebrow: 'Observability',
    title: 'Anomaly detection at ingest',
    body: 'Statistical models flag schema drift, volume drops, and freshness violations before they reach your warehouse.',
    detail: 'Configurable alert thresholds with auto-escalation to Slack, PagerDuty, or your on-call system. Mean-time-to-detect under 90 seconds.',
    span: 'col-span-4 row-span-1',
    accentColor: '#FFC801',
  },
  {
    id: 3,
    icon: IconChartPie,
    eyebrow: 'Orchestration',
    title: 'Dependency-aware scheduling',
    body: 'Forget cron. Dolphin builds a dynamic DAG from your data dependencies and triggers jobs as upstream data lands.',
    detail: 'Automatic backfill, smart retries with exponential backoff, and cost-aware scheduling to hit your SLAs without blowing your compute budget.',
    span: 'col-span-6 row-span-1',
    accentColor: '#FF9932',
  },
  {
    id: 4,
    icon: IconLink,
    eyebrow: 'Governance',
    title: 'Column-level lineage & PII tagging',
    body: 'Every cell in your warehouse knows where it came from. PII is auto-tagged at source and enforced through the pipeline.',
    detail: 'GDPR and CCPA deletion requests propagate automatically. Audit logs meet SOC 2 Type II requirements out of the box.',
    span: 'col-span-6 row-span-1',
    accentColor: '#FFC801',
  },
  {
    id: 5,
    icon: IconCube,
    eyebrow: 'Agent SDK',
    title: 'Build custom agents in minutes',
    body: 'Extend Dolphin with Python agents that tap into the same event bus, scheduling engine, and secrets manager.',
    detail: 'Deploy agents from your CI pipeline. Version, rollback, and blue-green deploy with a single CLI command. Full OpenTelemetry tracing included.',
    span: 'col-span-4 row-span-1',
    accentColor: '#FF9932',
  },
]

// Bento grid layout col/row spans
const BENTO_STYLES = [
  { gridColumn: 'span 4', gridRow: 'span 2' },
  { gridColumn: 'span 4', gridRow: 'span 1' },
  { gridColumn: 'span 4', gridRow: 'span 1' },
  { gridColumn: 'span 6', gridRow: 'span 1' },
  { gridColumn: 'span 6', gridRow: 'span 1' },
  { gridColumn: 'span 12', gridRow: 'span 1' },
]

// ---- Bento Grid (desktop) ----
function BentoGrid({ activeIndex, setActiveIndex }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'auto',
        border: '1px solid rgba(255,200,1,0.1)',
      }}
      role="list"
    >
      {FEATURES.map((f, i) => {
        const Icon = f.icon
        const isActive = activeIndex === i
        return (
          <article
            key={f.id}
            role="listitem"
            aria-expanded={isActive}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            style={{
              ...BENTO_STYLES[i],
              border: '1px solid rgba(255,200,1,0.08)',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'background-color 180ms ease-out',
              backgroundColor: isActive ? 'rgba(17,76,90,0.35)' : 'transparent',
            }}
          >
            {/* Accent bar */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '2px',
              background: `linear-gradient(90deg, ${f.accentColor}, transparent)`,
              opacity: isActive ? 0.8 : 0.2,
              transition: 'opacity 180ms ease-out',
            }} aria-hidden="true" />

            {/* Hover glow corner */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '120px', height: '120px',
              background: `radial-gradient(circle at top left, ${f.accentColor}0a, transparent 70%)`,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 180ms ease-out',
              pointerEvents: 'none',
            }} aria-hidden="true" />

            <header>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Icon style={{
                  width: '18px', height: '18px',
                  color: isActive ? f.accentColor : 'rgba(255,200,1,0.4)',
                  transition: 'color 180ms ease-out',
                }} />
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: isActive ? f.accentColor : 'rgba(255,200,1,0.35)',
                  textTransform: 'uppercase',
                  transition: 'color 180ms ease-out',
                }}>
                  {f.eyebrow}
                </span>
              </div>
              <h3 style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#F1F6F4',
                marginBottom: '0.625rem',
                lineHeight: 1.2,
              }}>
                {f.title}
              </h3>
            </header>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              lineHeight: 1.65,
              color: 'rgba(241,246,244,0.55)',
              marginBottom: isActive ? '1rem' : '0',
              transition: 'margin-bottom 200ms ease-out',
            }}>
              {f.body}
            </p>

            {/* Expanded detail */}
            <div style={{
              overflow: 'hidden',
              maxHeight: isActive ? '120px' : '0',
              opacity: isActive ? 1 : 0,
              transition: 'max-height 320ms ease-in-out, opacity 280ms ease-in-out',
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8125rem',
                lineHeight: 1.6,
                color: 'rgba(241,246,244,0.38)',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(255,200,1,0.08)',
              }}>
                {f.detail}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

// ---- Accordion Item — standalone so hooks are called at top level ----
function AccordionItem({ f, i, isOpen, onToggle }) {
  const Icon = f.icon
  const bodyRef = useRef(null)

  useEffect(() => {
    if (!bodyRef.current) return
    bodyRef.current.style.maxHeight = isOpen ? `${bodyRef.current.scrollHeight}px` : '0px'
    bodyRef.current.style.opacity = isOpen ? '1' : '0'
  }, [isOpen])

  return (
    <div className="accordion-item" role="listitem">
      <button
        className="accordion-trigger"
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${i}`}
        id={`accordion-trigger-${i}`}
        onClick={() => onToggle(isOpen ? null : i)}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <Icon style={{
            width: '16px', height: '16px',
            color: isOpen ? f.accentColor : 'rgba(255,200,1,0.4)',
            transition: 'color 160ms ease-out',
          }} />
          <span style={{ color: isOpen ? '#F1F6F4' : 'rgba(241,246,244,0.7)' }}>
            {f.title}
          </span>
        </span>
        <IconChevronDown
          className={`accordion-chevron ${isOpen ? 'open' : ''}`}
          style={{ width: '16px', height: '16px', color: isOpen ? f.accentColor : 'rgba(255,200,1,0.3)' }}
        />
      </button>
      <div
        ref={bodyRef}
        id={`accordion-body-${i}`}
        role="region"
        aria-labelledby={`accordion-trigger-${i}`}
        className="accordion-body"
      >
        <div style={{ padding: '0 1rem 1.25rem' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            lineHeight: 1.65,
            color: 'rgba(241,246,244,0.55)',
            marginBottom: '0.75rem',
          }}>
            {f.body}
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
            color: 'rgba(241,246,244,0.35)',
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(255,200,1,0.08)',
          }}>
            {f.detail}
          </p>
        </div>
      </div>
    </div>
  )
}

// ---- Accordion (mobile) ----
function Accordion({ activeIndex, setActiveIndex }) {
  return (
    <div
      style={{ border: '1px solid rgba(255,200,1,0.1)' }}
      role="list"
    >
      {FEATURES.map((f, i) => (
        <AccordionItem
          key={f.id}
          f={f}
          i={i}
          isOpen={activeIndex === i}
          onToggle={setActiveIndex}
        />
      ))}
    </div>
  )
}

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const mqlRef = useRef(null)

  const handleMqlChange = useCallback((e) => {
    const nowMobile = !e.matches
    setIsMobile(nowMobile)
    // Transfer hover→accordion state on resize crossing breakpoint
    setActiveIndex(prev => prev !== null ? prev : null)
  }, [])

  useEffect(() => {
    mqlRef.current = window.matchMedia('(min-width: 768px)')
    setIsMobile(!mqlRef.current.matches)
    mqlRef.current.addEventListener('change', handleMqlChange)
    return () => mqlRef.current?.removeEventListener('change', handleMqlChange)
  }, [handleMqlChange])

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      style={{
        padding: '5rem 0',
        borderBottom: '1px solid rgba(255,200,1,0.1)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div data-sr style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: '#FFC801',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>
              ◆ Platform capabilities
            </div>
            <h2
              id="features-heading"
              data-sr
              data-sr-delay="80"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: '#F1F6F4',
                lineHeight: 1.1,
              }}
            >
              Everything the pipeline needs.<br />
              <span style={{ color: '#FFC801' }}>Nothing it doesn't.</span>
            </h2>
          </div>
          <p data-sr data-sr-delay="160" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9375rem',
            lineHeight: 1.65,
            color: 'rgba(241,246,244,0.5)',
            maxWidth: '360px',
          }}>
            Six capabilities, unified in one agent platform. No stitching six vendors together. No 3 AM on-call alerts.
          </p>
        </header>

        {isMobile
          ? <Accordion activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          : <BentoGrid activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        }
      </div>
    </section>
  )
}
