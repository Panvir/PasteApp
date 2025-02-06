import { StrictMode } from 'react'
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <App />
       <Toaster/>
    </Provider>
   
  </StrictMode>,
)
