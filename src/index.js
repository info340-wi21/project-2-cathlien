import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MAJORS from './majors.json';
import CONTENT from './majorsContent.json';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const sample_progress = [
  { id: 1, checkText: "Personal Statement", complete:false},
  { id: 2, checkText: "Complete required courses", complete:false},
  { id: 3, checkText: "Start application", complete:false}
];
const firebaseConfig = {
  apiKey: "AIzaSyDpjYTAcZMzBTIiIMs9JD84-wNSuXNnRAQ",
  authDomain: "info-340-project-2-c6fec.firebaseapp.com",
  databaseURL: "https://info-340-project-2-c6fec-default-rtdb.firebaseio.com",
  projectId: "info-340-project-2-c6fec",
  storageBucket: "info-340-project-2-c6fec.appspot.com",
  messagingSenderId: "176068516336",
  appId: "1:176068516336:web:b8afc1a4a1bb8ff7986535",
  measurementId: "G-TBDPJSEMZT"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


ReactDOM.render(<App majors={MAJORS} content={CONTENT} progresses={sample_progress}/>, document.getElementById('root'));

