import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TodoPorvider } from './context/TodoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoPorvider>
    <App />
    </TodoPorvider>
  </StrictMode>,
)
