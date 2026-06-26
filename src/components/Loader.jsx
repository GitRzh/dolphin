import { useEffect, useRef } from 'react'

export default function Loader({ onDone }) {
  const loaderRef = useRef(null)

  useEffect(() => {
    const el = loaderRef.current
    if (!el) return

    // Exit after 1200ms — animate out then unmount
    const exitTimer = setTimeout(() => {
      el.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 300, easing: 'ease-out', fill: 'forwards' }
      ).finished.then(onDone)
    }, 1200)

    return () => clearTimeout(exitTimer)
  }, [onDone])

  return (
    <div
      ref={loaderRef}
      aria-label="Loading Dolphin"
      aria-live="polite"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0A141A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
      }}
    >
      {/* Logo mark + wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28" height="28"
          viewBox="0 0 16 16"
          aria-hidden="true"
          style={{ animation: 'dlp-pulse 1.2s ease-in-out infinite' }}
        >
          <path
            fill="#FFC801"
            d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z"
          />
        </svg>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700,
          fontSize: '1.125rem',
          letterSpacing: '0.08em',
          color: '#F1F6F4',
        }}>
          DOLPHIN
        </span>
      </div>

      {/* Spinning arrow-path icon as spinner */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20" height="20"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ animation: 'dlp-spin 900ms linear infinite', opacity: 0.5 }}
      >
        <path
          fill="none"
          stroke="#FFC801"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>

      <style>{`
        @keyframes dlp-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes dlp-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.9); }
        }
      `}</style>
    </div>
  )
}
