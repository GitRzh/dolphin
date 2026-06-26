/**
 * scrollReveal.js
 * Pure WAAPI + IntersectionObserver — zero dependencies, contest-compliant.
 * Import and call initScrollReveal() once in main.jsx after mount.
 */

export function initScrollReveal() {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-sr]').forEach(el => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target
        const delay = parseInt(el.dataset.srDelay || '0', 10)
        const dir = el.dataset.srDir || 'up'  // 'up' | 'left' | 'right' | 'none'
        const dist = parseInt(el.dataset.srDist || '28', 10)

        let fromTransform = `translateY(${dist}px)`
        if (dir === 'left')  fromTransform = `translateX(-${dist}px)`
        if (dir === 'right') fromTransform = `translateX(${dist}px)`
        if (dir === 'none')  fromTransform = 'none'

        el.animate(
          [
            { opacity: 0, transform: fromTransform },
            { opacity: 1, transform: dir === 'none' ? 'none' : 'translateY(0) translateX(0)' },
          ],
          {
            duration: 420,
            delay,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // expo-out — fast in, settles clean
            fill: 'forwards',
          }
        )
        observer.unobserve(el)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )

  // Set initial hidden state and observe
  document.querySelectorAll('[data-sr]').forEach(el => {
    el.style.opacity = '0'
    observer.observe(el)
  })

  return observer
}

/**
 * Stagger children of a container.
 * Usage: <div data-sr-stagger data-sr-stagger-delay="80"> children </div>
 * Each direct child gets data-sr automatically with incremental delay.
 */
export function initStagger() {
  document.querySelectorAll('[data-sr-stagger]').forEach(container => {
    const baseDelay = parseInt(container.dataset.srStaggerDelay || '80', 10)
    const startDelay = parseInt(container.dataset.srStaggerStart || '0', 10)
    Array.from(container.children).forEach((child, i) => {
      child.setAttribute('data-sr', '')
      child.setAttribute('data-sr-delay', String(startDelay + i * baseDelay))
      child.setAttribute('data-sr-dist', '20')
    })
  })
}
