import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>  { /* Keep this so that we can be notified for buggy or suspicious code */}

    <BrowserRouter>
      <App />
    </BrowserRouter>


  </React.StrictMode>
);
