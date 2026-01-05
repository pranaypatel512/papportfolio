import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          background: '#fff', 
          minHeight: '100vh',
          color: '#000'
        }}>
          <h1 style={{ color: 'red' }}>Something went wrong</h1>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '1rem', 
            overflow: 'auto',
            color: '#000'
          }}>
            {this.state.error?.toString()}
            {this.state.error?.stack}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

