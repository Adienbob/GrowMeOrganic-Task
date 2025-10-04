import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserSelectionProvider } from "../context/userSelectionProvider.tsx"
import './index.css'
import App from './App.tsx'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


createRoot(document.getElementById('root')!).render(
  <UserSelectionProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </UserSelectionProvider>
)
