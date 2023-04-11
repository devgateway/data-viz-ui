


import React from 'react';
import ReactDOM from 'react-dom';



import App from './App';
import * as serviceWorker from './tools/serviceWorker';

import './scss/themes/common.scss';




require(`./scss/themes/${process.env.REACT_APP_THEME}/index.scss`);

ReactDOM.render(<App/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
serviceWorker.unregister();
