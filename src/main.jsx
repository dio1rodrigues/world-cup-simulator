import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ActionPanel from './components/ActionPanel.jsx'

function renderApplication() {
  const rootElement = document.getElementById('root')
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

renderApplication()