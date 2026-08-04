import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import ReactGA from "react-ga4";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Analytics } from '@vercel/analytics/react'

ReactGA.initialize("G-EJRWV7WEGF");

createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={"234828331967-vhto9e942g5go4lr35i2niq9irk44ti1.apps.googleusercontent.com"} >

   <HelmetProvider>

     <App />
     <Analytics/>
   </HelmetProvider>

  </GoogleOAuthProvider>
)
