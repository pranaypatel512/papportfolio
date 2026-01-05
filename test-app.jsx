// Temporary test file to check if React is working
import React from 'react'
import ReactDOM from 'react-dom/client'

function TestApp() {
  return (
    <div style={{ padding: '2rem', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333' }}>Test App - React is Working!</h1>
      <p>If you see this, React is rendering correctly.</p>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<TestApp />)

