import reactDom from "react-dom";
import React from 'react'
import CheckListPage from "../App"
const sample_progress = [
    { id: 1, checkText: "Personal Statement", complete:false},
    { id: 2, checkText: "Complete required courses", complete:false},
    { id: 3, checkText: "Start application", complete:false}
];

// app is not defined so currently i am commenting this out so npm start can work

reactDom.render(<CheckListPage progresses={sample_progress} />,
    document.getElementById('root'));

