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
import favorites from "./component/favorites";



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
  console.log("app", props);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else { 
        setUser(null)
      }
    })
    return function cleanup() { 
      authUnregisterFunction()
    }
  }, [])

  const [unfavorite, setUnfavorite] = useState(favorites);
    const handleUnfavorite = (name) => {
        let listIndex = 0;
        for (let i = 0; i < unfavorite.length; i++) {
          if (unfavorite[i] === name) {
            listIndex = i;
          }
        }
        unfavorite.splice(listIndex, 1);   
        setUnfavorite(unfavorite);
        console.log("button clicked");
      };

  

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
            <FavoritePage majors={props.majors} removeCallback={handleUnfavorite}/>
          </Route>
          <Route exact path="/progress">
          <CheckListPage progresses={props.progresses}/>
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
    {/* <Filter /> */}
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
export function CheckListPage(props) {
  return <div>
    <header><TopHeader /></header>
    <PurpleBlock name="Check List" />
    <MainNav />
    <ProgressList progresses={props.progresses} />
    <Footer />
  </div>;
}

export function FavoritePage(props) {
  
  return <div>
    <header><TopHeader /></header>
    <PurpleBlock name={"Favorite Programs"}/>
    <MainNav />
    <FavoriteList cards={props.majors} removeCallback={props.removeCallback}/>
    <Footer />
    </div>;
}

