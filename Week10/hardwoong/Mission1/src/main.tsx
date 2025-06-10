import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // 렌더링 체크를 위해 StrictMode 잠시 해제
  <>
    <App />
  </>,
);
