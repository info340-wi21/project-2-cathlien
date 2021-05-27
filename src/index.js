import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MAJORS from './majors.json';


ReactDOM.render(<App majors={MAJORS}/>, document.getElementById('root'));

