/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Yuhuan Zhou Student ID: 149528192 Date: Feb/12/2021
*
*
********************************************************************************/ 



import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
