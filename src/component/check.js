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
        <p>This is a progress check list for your desired major. You can track your progress here!</p>
        <p>Click to cross off a completed item, click again to mark as imcomplete.</p>
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
        changeFont = 'strike';
    } else {
        changeFont = '';
    }

    return (
        <li className={changeFont} onClick={()=> {props.clickCallback(thisCheck.checkText)}}>
            {thisCheck.checkText}
        </li>
    );
}

