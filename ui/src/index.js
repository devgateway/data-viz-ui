import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './tools/serviceWorker';
import './scss/common.scss';

import '@devgateway/customizer/dist/css/index.css';

ReactDOM.render(<App/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
serviceWorker.unregister();
