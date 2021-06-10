import { useState, useEffect } from "react";
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

export function ProgressList(props) {
    const [check, setCheck] = useState([]) //an array

    useEffect(() => {
        const checkReference = firebase.database().ref('users/reQnafcyrPSLFF7ewL452GcUgMs2/checks')
        checkReference.on('value', (snapshot) => {
          const theCheck = snapshot.val()
          console.log(theCheck);
          setCheck(theCheck);
        })
      },[])

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
        console.log(eachCheck.id);
        console.log(check["check" + eachCheck.id]); 
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

