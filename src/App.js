import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { MainNav } from "./component/MainNav";
import { Overview } from "./component/Overview";
import { TopHeader } from "./component/TopHeader";
import { PurpleBlock } from "./component/PurpleBlock";import { MajorImages } from "./component/MajorImages";
import { CardList, FavoriteList } from "./component/cards";
import { Footer } from "./component/Footers";
import { MajorFooter } from "./component/MajorFooter";
import { ProgressList } from "./component/check.js";
import 'firebase/auth';
import 'firebase/database';

// uiConfig used for firebase authentication
const uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  credentialHelper: 'none',
  signInFlow: 'popup',
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  }
};


// Returns the single page app representing the UW College of Environment information.
export default function App(props) {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        writeUserData(firebaseUser.uid, firebaseUser.displayName);
      } else { 
        setUser(null)
      }
    })
    return function cleanup() { 
      authUnregisterFunction()
    }
  }, [])

  // User database is created on the Firebase Realtime Database
  const dbRef = firebase.database().ref();
  function writeUserData(uid, displayName) {
    dbRef.child("users").child(uid).get().then((snapshot) => {
      if (!snapshot.exists()) {
        firebase.database().ref('users/' + uid).set({
          username: displayName,
          uid: uid, 
          checks: props.progresses
        });
      }
    });
  }


  let content = null;


  if (!user) {
    content = (
      <div className="container">
        <h1>Sign Up</h1>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  } else {
    content = (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" >
           <HomePage majors={props.majors} />
          </Route>
          <Route exact path="/major/:majorName">
             <MajorPage content={props.content}/>
          </Route>
          <Route exact path="/favorites">
            <FavoritePage majors={props.majors}/>
          </Route>
          <Route exact path="/progress">
          <CheckListPage user={user.uid} progresses={props.progresses}/>
            </Route> 
         </Switch>
         
      </BrowserRouter>);
  }

  return (<div>{content}</div>);
}


// HomePage returns the homepage element with a header, the purple block, the main nav bar, the filter function, the card list representing all of the majorCards, and a footer.
export function HomePage(props) {
  return <div>
    <header><TopHeader /></header>
    <PurpleBlock name={"Undergraduate Programs"}/>
    <MainNav />
    <CardList cards={props.majors} />
    <Footer />
    </div>;
}

// MajorPage is a template for each individual major page, which contains overview information and an image about the major.
export function MajorPage(props) {
  const params = useParams();
  let majorName = params.majorName;
  return <div>
    <header><TopHeader /></header>
    <PurpleBlock name={majorName}/>
    <MainNav />
    <main>
      <MajorImages name={majorName} content={props.content}/>
      <Overview name={majorName} content={props.content}/>
    </main>
    <MajorFooter name={majorName} content={props.content}/>
  </div>;
}

// The Template for the Check List page 
export function CheckListPage(props) {
  return <div>
    <header><TopHeader /></header>
    <PurpleBlock name="Check List" />
    <MainNav />
    <ProgressList user={props.user} progresses={props.progresses} />
    <Footer />
  </div>;
}

// The template for the Favorite Page
export function FavoritePage(props) {
  
  return <div>
    <header><TopHeader /></header>
    <PurpleBlock name={"Favorite Programs"}/>
    <MainNav />
    <FavoriteList cards={props.majors}/>
    <Footer />
    </div>;
}

