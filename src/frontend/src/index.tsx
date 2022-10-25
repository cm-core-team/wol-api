import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    { /* Keep this so that we can be notified for buggy or suspicious code */}
    <React.StrictMode>

      { /* For more info about react-router-dom, see: https://www.javatpoint.com/browserrouter-in-react */}
      < BrowserRouter >
        <App />
      </BrowserRouter >


    </React.StrictMode >
  </>
);
