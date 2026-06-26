const TICKER_ITEMS = [
  'Postgres', 'Snowflake', 'BigQuery', 'Redshift',
  'dbt', 'Kafka', 'Airbyte', 'Fivetran',
  'S3 / GCS', 'Databricks', 'Pinecone', 'MongoDB',
  'Salesforce', 'HubSpot', 'Stripe', 'Segment',
  'Looker', 'Metabase', 'Grafana', 'PagerDuty',
]

const DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS]

export default function Marquee() {
  return (
    <section
      aria-label="Supported integrations ticker"
      style={{
        borderTop: '1px solid rgba(255,200,1,0.08)',
        borderBottom: '1px solid rgba(255,200,1,0.08)',
        background: 'rgba(13,31,40,0.6)',
        overflow: 'hidden',
        padding: '0.875rem 0',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: '100px',
        background: 'linear-gradient(90deg, #0d1f28 0%, transparent 100%)',
        zIndex: 2, pointerEvents: 'none',
      }} aria-hidden="true" />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: '100px',
        background: 'linear-gradient(-90deg, #0d1f28 0%, transparent 100%)',
        zIndex: 2, pointerEvents: 'none',
      }} aria-hidden="true" />

      <div
        className="marquee-track"
        style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}
        role="marquee"
        aria-live="off"
      >
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: i % 5 === 0 ? '#FFC801' : 'rgba(241,246,244,0.3)',
              padding: '0 2rem',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            ◆ {item}
          </span>
        ))}
      </div>
    </section>
  )
}