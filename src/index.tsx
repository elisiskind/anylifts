import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorkerRegistration from "serviceWorkerRegistration";
import reportWebVitals from "reportWebVitals";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import StorageProvider from "store/StorageProvider";

// const firebaseConfig = {
//   apiKey: "AIzaSyBPHyEuVw6pjLi7J23dbiIlHsvLwBLNKGE",
//   authDomain: "anylifts.firebaseapp.com",
//   databaseURL: "https://anylifts-default-rtdb.firebaseio.com",
//   projectId: "anylifts",
//   storageBucket: "anylifts.appspot.com",
//   messagingSenderId: "826852575492",
//   appId: "1:826852575492:web:0174edf9ba70e809d0e851",
//   measurementId: "G-PXC5YY149E",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCOl1xTxoBStpXqdiGxUJC-V9Ndz7gL4f4",
  authDomain: "anylifts-dev-a2afb.firebaseapp.com",
  projectId: "anylifts-dev-a2afb",
  storageBucket: "anylifts-dev-a2afb.appspot.com",
  messagingSenderId: "74773365167",
  appId: "1:74773365167:web:317f50617dc86dbecdaf5a",
  measurementId: "G-H250DLQ9B6",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

const render = () => {
  const App = require("./App").default;

  ReactDOM.render(
    <React.StrictMode>
      <StorageProvider>
        <App />
      </StorageProvider>
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
