import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyBPHyEuVw6pjLi7J23dbiIlHsvLwBLNKGE",
  authDomain: "anylifts.firebaseapp.com",
  databaseURL: "https://anylifts-default-rtdb.firebaseio.com",
  projectId: "anylifts",
  storageBucket: "anylifts.appspot.com",
  messagingSenderId: "826852575492",
  appId: "1:826852575492:web:0174edf9ba70e809d0e851",
  measurementId: "G-PXC5YY149E"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
