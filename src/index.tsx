import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

const containerId = process.env.NODE_ENV === 'production' ? 'UMC-widget' : 'root';

ReactDOM.render(
  <HashRouter hashType={'noslash'}>
    <App />
  </HashRouter>,
  document.getElementById(containerId)
);
