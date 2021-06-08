import { useState } from "react";

export function Check(props) {
    console.log("Check", props)
    
    const [taskState, setState] = useState(props.complete)
    
    let changeFont = '';
    if(props.complete) {
        changeFont = 'bg-success';
    } else {
        changeFont = 'bg-danger';
    }

    const handleClick = (event) => {
        setState(!taskState)
    }
    return (
        <li className={changeFont} onClick={handleClick}>
            {props.checkText}
        </li>
    )
}

export function ProgressList(props) {
    console.log("ProgressList", props);
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
