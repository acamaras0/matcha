import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from "react-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
    <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

