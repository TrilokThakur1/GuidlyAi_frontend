import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';

import {
    BrowserRouter,
} from "react-router-dom";

import UserData from './context/UserData.jsx';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <UserData>
        <App />
        <ToastContainer />
      </UserData>
    </BrowserRouter>
)
