import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} catch (error) {
  console.error('Error rendering app:', error)
  document.getElementById('root').innerHTML = `
    <div style="padding: 20px; font-family: Arial;">
      <h1>Error loading application</h1>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    </div>
  `
}

