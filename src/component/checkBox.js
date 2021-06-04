import reactDom from "react-dom";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

const checkBox = [
    { id: 1, checkText: "Personal Statement", complete:false},
    { id: 2, checkText: "Complete required courses", complete:false},
    { id: 3, checkText: "Start application", complete:false}
];

reactDom.render(<App app={checkBox} />,
    document.getElementById('root'));

