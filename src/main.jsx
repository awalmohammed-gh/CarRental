import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarRentalProvider } from './context/CarRentalProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CarRentalProvider>
    <App />
  </CarRentalProvider>
  </StrictMode>,
)
