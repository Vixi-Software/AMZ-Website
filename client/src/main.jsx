<<<<<<< HEAD
// import { StrictMode } from 'react'
=======
>>>>>>> fix-admin
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store.js'
// import '@ant-design/v5-patch-for-react-19';
createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
  <>
    <App />
  </>,
=======
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  ,
>>>>>>> fix-admin
)
