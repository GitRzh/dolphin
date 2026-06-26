import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initScrollReveal, initStagger } from './scrollReveal.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Init scroll reveals after React has fully rendered
// setTimeout(0) queues after all synchronous paint + React commits
setTimeout(() => {
  initStagger()      // must run before initScrollReveal so data-sr attrs are set
  initScrollReveal()
}, 100)