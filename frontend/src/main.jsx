import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { WorkoutContextProvider } from './WorkoutContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkoutContextProvider>
    <App />
    </WorkoutContextProvider>
  </StrictMode>,
)
