import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='w-full'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </div>
  </StrictMode>,
)
