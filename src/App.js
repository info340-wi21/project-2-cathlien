import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { MainNav } from "./component/pageElement";
import { SideNav } from "./component/pageElement";
import { PurpleBlock } from "./component/pageElement";  
import { TopHeader } from "./component/pageElement";
import { Overview } from "./component/pageElement";
import { MajorImages } from "./component/MajorImages";
import { CardList } from "./component/cards";
import { Footer } from "./component/Footers";
import { MajorFooter } from "./component/MajorFooter";
import { Filter } from "./component/filter";
import { favoriteMajors } from "./component/favoriteMajors"

// uiConfig used for firebase authentication
const uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  credentialHelper: "none",
  signInFlow: "popup",
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};


// Returns the single page app representing the UW College of Environment information.
export default function App(props) {
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


  let content = null;
  if (!user) {
    content = (
      <div className="container">
        <h1>sign up</h1>
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
         </Switch>
      </BrowserRouter>);
  }

  return <div>{content}</div>;
}

// HomePage returns the homepage element with a header, the purple block, the main nav bar, the filter function, the card list representing all of the majorCards, and a footer.
export function HomePage(props) {
  return <div>
    <header><TopHeader /></header>
    <PurpleBlock name={"Undergraduate Programs"}/>
    <MainNav />
    <Filter />
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
    <SideNav />
    <main>
      <MajorImages name={majorName} content={props.content}/>
      <Overview name={majorName} content={props.content}/>
    </main>
    <MajorFooter name={majorName} content={props.content}/>
  </div>;
}

export function favoritePage() {
  return ( 
  <div>
  <header><TopHeader /></header>
  <PurpleBlock name={"Favorited Programs"}/>
  <MainNav />
  <Filter />
  <favoriteMajors />
  <Footer />
  </div>
  );
}
