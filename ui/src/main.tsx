import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'



import './scss/common.scss'; //core common styles
import './scss/themes/default/index.scss'; // default theme styles
import '@devgateway/customizer/dist/css/index.css'; //custom styles
import 'semantic-ui-css/semantic.min.css'; //semantic ui styles

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// serviceWorker.unregister();
