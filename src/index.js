import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MAJORS from './majors.json';
import CONTENT from './majorsContent.json';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAHKWZKdKFFvC2dEKbgAKffJer_RblZzu8",
    authDomain: "fitfriend-d7148.firebaseapp.com",
    projectId: "fitfriend-d7148",
    storageBucket: "fitfriend-d7148.appspot.com",
    messagingSenderId: "293567760961",
    appId: "1:293567760961:web:c43e5c15d44def523e54c0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


ReactDOM.render(<App majors={MAJORS} content={CONTENT}/>, document.getElementById('root'));

