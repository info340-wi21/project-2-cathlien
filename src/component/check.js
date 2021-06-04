import { useState } from "react";

export function Task(props) {
    const thisCheck = props.task
    
    const [taskState, setState] = useState(thisCheck.complete)
    
    let className = '';
    if(thisCheck.complete) {
        className = 'bg-success';
    } else {
        className = 'bg-danger';
    }

    const handleClick = (event) => {
        setState(!taskState)
    }
    return (
        <li className={className} onClick={handleClick}>
            {thisCheck.checkText}
        </li>
    )
}

export default function TaskList(props) {
    let checks = props.tasks.map((eachCheck) => {
        let singleTaskElem = <Check key={eachCheck.id} task={eachCheck} />
        return singleTaskElem;
    })
    return (
        <ol>
            {checks}
        </ol>
    );
}
