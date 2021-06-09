import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorkerRegistration from "serviceWorkerRegistration";
import reportWebVitals from "reportWebVitals";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import UserProvider from "store/UserProvider";

const firebaseConfig = {
  apiKey: "AIzaSyBPHyEuVw6pjLi7J23dbiIlHsvLwBLNKGE",
  authDomain: "anylifts.firebaseapp.com",
  databaseURL: "https://anylifts-default-rtdb.firebaseio.com",
  projectId: "anylifts",
  storageBucket: "anylifts.appspot.com",
  messagingSenderId: "826852575492",
  appId: "1:826852575492:web:0174edf9ba70e809d0e851",
  measurementId: "G-PXC5YY149E",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.database();

const render = () => {
  const App = require("./App").default;

  ReactDOM.render(
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
