import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// NOT NEEDED WITH RE-BASE
// import * as firebase from 'firebase';
//
// var config = {
//   apiKey: "AIzaSyBksdy8GwgHaur39OrM_OPRFoKzOvqjTS0",
//   authDomain: "react-first-4fb71.firebaseapp.com",
//   databaseURL: "https://react-first-4fb71.firebaseio.com",
//   storageBucket: "react-first-4fb71.appspot.com",
//   messagingSenderId: "523141866521"
// };
// firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
