import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BudgetProvider } from './context/BudgetContext.tsx'

// Monta la aplicación y deja disponible el presupuesto en todos sus componentes.
createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </StrictMode>
  ,
)
