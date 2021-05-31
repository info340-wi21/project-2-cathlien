import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MAJORS from './majors.json';
import CONTENT from './majorsContent.json';


ReactDOM.render(<App majors={MAJORS} content={CONTENT}/>, document.getElementById('root'));

