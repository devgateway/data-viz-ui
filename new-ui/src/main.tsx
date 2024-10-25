import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import * as serviceWorker from './tools/serviceWorker';

import './scss/common.scss';
import '@devgateway/customizer/dist/css/index.css';
import 'semantic-ui-css/semantic.min.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// serviceWorker.unregister();
