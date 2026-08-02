import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import ReactGA from "react-ga4";

ReactGA.initialize("G-EJRWV7WEGF");

createRoot(document.getElementById('root')).render(
   <HelmetProvider>

     <App />
   </HelmetProvider>

)
