import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import StatsBar from './components/StatsBar.jsx'
import Marquee from './components/Marquee.jsx'
import DashboardMetrics from './components/DashboardMetrics.jsx'
import Features from './components/Features.jsx'
import Pricing from './components/Pricing.jsx'
import Testimonials from './components/Testimonials.jsx'
import CTAPanel from './components/CTAPanel.jsx'
import Footer from './components/Footer.jsx'
import { useState, useCallback } from 'react'
import Loader from './components/Loader.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleDone = useCallback(() => setLoading(false), [])

  return (
    <>
      {loading && <Loader onDone={handleDone} />}
      <Nav />
      <main id="main-content" aria-label="Dolphin landing page main content">
        <Hero />
        <StatsBar />
        <Marquee />
        <DashboardMetrics />
        <Features />
        <Pricing />
        <Testimonials />
        <CTAPanel />
      </main>
      <Footer />
    </>
  )
}