import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setupInterceptors } from './apis/interceptor.ts'

const queryClient = new QueryClient();
setupInterceptors();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <App />
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </AuthProvider>
    </QueryClientProvider>
  // </StrictMode>,
)
