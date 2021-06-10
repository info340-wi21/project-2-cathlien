import { useState, useEffect } from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export function ProgressList(props) {
  const [taskState, setState] = useState(props.progresses);

  // The firebase realtime data is updated based on what the user does on the checklist
  useEffect(() => {
    const userRef = firebase.database().ref('users/' + props.user + '/checks');
    userRef.on('value', (snapshot) => {
      const theValue = snapshot.val();
      setState(theValue);
    })
  }, [props.user])
  
    let handleClick = (text) => {
        let copy = taskState.map((task) => {
          if (task.checkText === text) {
            task.complete = !task.complete;
          }  return task;
        });
        setState(copy);
    };

    let checks = taskState.map((eachCheck) => {
        let thisCheck = <Check key={eachCheck.id} progress={eachCheck} clickCallback={handleClick}/>;
        return thisCheck;
    })

    const userRef = firebase.database().ref('users/' + props.user + '/checks');
    userRef.set(taskState);

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
        changeFont = 'text-decoration-line-through';
    } else {
        changeFont = 'text-decoration-none';
    }

    return (
        <li className={changeFont} onClick={()=> {props.clickCallback(thisCheck.checkText)}}>
            {thisCheck.checkText}
        </li>
    );
}

