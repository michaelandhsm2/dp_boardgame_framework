import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './code/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
