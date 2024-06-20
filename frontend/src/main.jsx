import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './routes/index.jsx'
import { AuthContextProvider } from '../contexts/AuthContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  </React.StrictMode>,
)
