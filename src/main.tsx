import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from './context/userContext.tsx'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContext>
    <div className='w-full'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </div>
    </UserContext>
  </StrictMode>,
)
