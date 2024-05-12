import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppProvider} from "./context/AppProvider.jsx";
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from "./router.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AppProvider>
          <RouterProvider router={router}/>
      </AppProvider>
  </React.StrictMode>,
)
