import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import 'semantic-ui-css/semantic.min.css'; // semantic ui styles
import './scss/common.scss'; // core common styles

const rawEnv = import.meta.env.VITE_REACT_APP_LOAD_DEFAULT_THEME;
const shouldLoadDefaultTheme = !(rawEnv && rawEnv.toString().toLowerCase() === 'false');
if (shouldLoadDefaultTheme) {
  import('./scss/themes/default/index.scss'); // default theme styles
}
import '@devgateway/customizer/dist/index.css'; // customizer styles

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
