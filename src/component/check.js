import { useState } from "react";

export function CheckOff(props) {
    const thisCheck = props.check
    
    const [taskState, setState] = useState(thisCheck.complete)
    
    let changeFont = '';
    if(thisCheck.complete) {
        changeFont = 'bg-success';
    } else {
        changeFont = 'bg-danger';
    }

    const handleClick = (event) => {
        setState(!taskState)
    }
    return (
        <li className={changeFont} onClick={handleClick}>
            {thisCheck.checkText}
        </li>
    )
}

export default function Progress(props) {
    let checks = props.app.map((eachCheck) => {
        let thisCheck = <Check key={eachCheck.id} check={eachCheck} />
        return thisCheck;
    })
    return (
        <ol>
            {checks}
        </ol>
    );
}
