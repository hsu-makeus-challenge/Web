
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App'; 
// import './index.css'; // ✅ Tailwind 스타일 적용을 위한 CSS import

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // ✅ 반드시 필요
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ✅ 여기서 Router 먼저 */}
      <AuthProvider> {/* ✅ Router 안에서 동작해야 함 */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

