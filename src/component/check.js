import { useState } from "react";

export function Check(props) {
    const thisCheck = props.progress
    
    const [taskState, setState] = useState(thisCheck.complete)
    
    let changeFont = '';
    if(thisCheck.complete == true) {
        changeFont = 'bg-success';
    } else {
        changeFont = 'bg-danger';
    }

    const handleClick = (event) => {
        setState(!taskState)
        console.log("you clicked on", thisCheck.complete)
    }
    return (
        <li className={changeFont} onClick={handleClick}>
            {thisCheck.checkText}
        </li>
    )
}

export function ProgressList(props) {
    let checks = props.progresses.map((eachCheck) => {
        let thisCheck = <Check key={eachCheck.id} progress={eachCheck} />
        return thisCheck;
    })
    return (
        <ol>
            {checks}
        </ol>
    );
}
