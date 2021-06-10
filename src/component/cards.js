import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import favorites from "./favorites";
import firebase from 'firebase/app';

import { Button, Card, CardText, CardImg, CardBody, CardTitle, CardFooter } from 'reactstrap';


// MajorCard returns a MajorCard component that is made up of several divs holding an image, a header, and information about the major.
export function MajorCard(props) {
    const [redirectTo, setRedirectTo] = useState(undefined);
    const handleClick = () => {
      setRedirectTo(true);
    }
    
    const handleFavorite = () => {
      const f = [];
      const userReference = firebase.database().ref('users/' + props.user + '/favorites');
      console.log(props.user);
      // builds the array of favorites for the favorite page
        if (!favorites.includes(majorCard.majorName)) {
          favorites.push(majorCard.majorName);
          userReference.set(favorites);
        }
        
    };


    let majorCard = props.majorCard;
    
    // Classes for major card, used for sorting
    let cardClasses = "card text-center m-4" + majorCard.degreeType + majorCard.majorStatus;
    if (majorCard.minor === true) {
      cardClasses = cardClasses + "minor";
    }

    // Adding formatting for the type of degree it is and if there is a minor
    let degreeInfo = majorCard.degreeType;
    if (majorCard.minor === true) {
      degreeInfo = degreeInfo + ", Minor";
    }

    if (redirectTo) {
      let link = "/major/" + props.majorCard.majorName;
      return <Redirect push to={link}/>
    }

    let homePageCard = (
      <div className={cardClasses}>
        <Card>
          <CardImg top width="100%" src={majorCard.imgURL} alt={majorCard.alt}></CardImg>
          <CardBody>
            <CardTitle tag="h4" className="text-center">{majorCard.majorName}</CardTitle>
            <CardText tag="p" className="text-center">{degreeInfo}</CardText>
            <Button outline color="success" onClick={handleClick}>Learn more</Button>
            <Button outline color="success" onClick={handleFavorite}>Add to favorites</Button>
          </CardBody>
          <CardFooter className="text-center text-muted">Image from <a
              href="https://unsplash.com/photos/TiTblwCHZFY"><cite>Unsplash</cite></a></CardFooter>
        </Card>
      </div>
    )

    return(homePageCard);
}

// CardList returns a set of card components from MajorCard based on the dataset of information passed in. 
export function CardList(props) {
  let cards = props.cards;
  let element = cards.map((card) => {
    return <MajorCard key={card.majorName} user={props.user} majorCard={card} />;
  })
  return <div className="container"><div className="card-columns">{element}</div></div>
}


// Creates the major cards that the users have favorited 
export function FavoriteList(props) {
  

  // State will be changed when the user has unfavorited a card 
  const [unfavorite, setUnfavorite] = useState(favorites);
  const handleUnfavorite = (name) => {
    let copy = unfavorite.map((item) => {
      if (item !== name) {
        return item;
      }
    })
      setUnfavorite(copy);
      
    };

    

    

  const [redirectTo, setRedirectTo] = useState(undefined);
  const handleClick = () => {
    setRedirectTo(true);
  }
  
  let favoriteCard = (card, cards) => {
    if (card !== undefined) {

    let major = cards.filter((object) => {
      if (object.majorName === card) {
        return object;
      }
    });
    card = major[0];

  
    // Classes for major card, used for sorting
    let cardClasses = "card text-center m-4" + card.degreeType + card.majorStatus;
    if (card.minor === true) {
      cardClasses = cardClasses + "minor";
    }

    // Adding formatting for the type of degree it is and if there is a minor
    let degreeInfo = card.degreeType;
    if (card.minor === true) {
      degreeInfo = degreeInfo + ", Minor";
    }

    if (redirectTo) {
      let link = "/major/" + card.majorName;
      return <Redirect push to={link}/>
    }

    return (
      <div className={cardClasses}>
        <Card>
          <CardImg top width="100%" src={card.imgURL} alt={card.alt}></CardImg>
          <CardBody>
            <CardTitle tag="h4" className="text-center">{card.majorName}</CardTitle>
            <CardText tag="p" className="text-center">{degreeInfo}</CardText>
            <Button outline color="success" onClick={handleClick}>Learn more</Button>
            <Button outline color="success" onClick={() => {handleUnfavorite(card.majorName)}}>Remove from favorites</Button>
          </CardBody>
          <CardFooter className="text-center text-muted">Image from <a
              href="https://unsplash.com/photos/TiTblwCHZFY"><cite>Unsplash</cite></a></CardFooter>
        </Card>
      </div>
    )
    }
  }

  let cards = props.cards;

  /*
  useEffect(() => {
    const userRef = firebase.database().ref('users/' + props.user + '/favorites');
    userRef.on('value', (snapshot) => {
      const theValue = snapshot.val();
      userRef.set(theValue);
    })
  }, [props.user])*/
 
  return (
    <div className="container">
      <div className="card-columns">
      {
        unfavorite.map((card) => {
          return (favoriteCard(card, cards))
       })
       
      } 
      </div>
    </div>
  )
}