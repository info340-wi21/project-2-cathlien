import { useState, useEffect } from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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

    

    let checks = taskState.map((eachCheck) => {
        let thisCheck = <Check key={eachCheck.id} progress={eachCheck} clickCallback={handleClick}/>;
        return thisCheck;
    })


    
    useEffect(() => {
      //const userRef = firebase.database().ref('users/' + 'mWPXl4YSzKgWXaei023UfiDmBxq1' + '/checks');
      console.log("user", props.user);
      const userRef = firebase.database().ref('users/' + props.user + '/checks');
      userRef.on('value', (snapshot) => {
        const theValue = snapshot.val();
        setState(theValue);
      })

    }, [])


    //const userRef = firebase.database().ref('users/' + 'mWPXl4YSzKgWXaei023UfiDmBxq1' + '/checks');
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

