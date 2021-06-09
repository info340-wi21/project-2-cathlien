import { useState } from "react";

export function ProgressList(props) {
    const [taskState, setState] = useState(props.progresses);
    let handleClick = (text) => {
        let copy = taskState.map((task) => {
          if (task.checkText === text) {
            task.complete = !task.complete;
          }  return task;
        });
        setState(copy);
      };



    let checks = props.progresses.map((eachCheck) => {
        let thisCheck = <Check key={eachCheck.id} progress={eachCheck} clickCallback={handleClick}/>;
        return thisCheck;
    })
    return (
        <main>
        <p>Click to mark each as complete or incomplete:</p>
        <ol>
            {checks}
        </ol>
        </main>
    );
}



export function Check(props) {
    const thisCheck = props.progress;
    
    
    let changeFont = '';
    if(thisCheck.complete) {
        changeFont = 'bg-success';
    } else {
        changeFont = 'bg-danger';
    }

    return (
        <li className={changeFont} onClick={()=> {props.clickCallback(thisCheck.checkText)}}>
            {thisCheck.checkText}
        </li>
    );
}

