import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
import './styles/themes.css'
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
  </React.StrictMode>
)
