import { useState, useEffect } from 'react'
import { IconCube, IconSearch } from './Icons.jsx'

const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background-color 200ms ease-out, border-color 200ms ease-out',
        backgroundColor: scrolled ? 'rgba(13, 31, 40, 0.96)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,200,1,0.12)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          aria-label="Dolphin — Home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
          }}
        >
          <IconCube
            style={{ width: '18px', height: '18px', color: '#FFC801' }}
          />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
            fontSize: '0.9375rem',
            letterSpacing: '0.04em',
            color: '#F1F6F4',
          }}>
            DOLPHIN
          </span>
        </a>

        {/* Desktop nav — pipe-separated */}
        <nav
          aria-label="Site sections"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link, i) => (
            <span key={link.href} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && (
                <span style={{
                  color: 'rgba(255,200,1,0.2)',
                  margin: '0 0.75rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  userSelect: 'none',
                }}>|</span>
              )}
              <a href={link.href} className="nav-link" aria-label={`Go to ${link.label} section`}>
                {link.label}
              </a>
            </span>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            aria-label="Search"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(241,246,244,0.5)',
              transition: 'color 160ms ease-out',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFC801'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(241,246,244,0.5)'}
          >
            <IconSearch style={{ width: '16px', height: '16px' }} />
          </button>
          <a
            href="#pricing"
            className="btn-ghost"
            style={{ fontSize: '0.7rem', padding: '0.5rem 1rem' }}
          >
            Log in
          </a>
          <a
            href="#pricing"
            className="btn-primary"
            style={{ fontSize: '0.7rem', padding: '0.5rem 1rem' }}
          >
            Start free
          </a>
        </div>
      </nav>
    </header>
  )
}
