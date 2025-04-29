// index.tsx 또는 main.tsx
/*import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element with id "root" not found.');
}*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css'; // ✅ Tailwind 스타일 적용을 위한 CSS import

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
