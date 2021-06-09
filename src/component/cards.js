import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import favorites from "./favorites";

// MajorCard returns a MajorCard component that is made up of several divs holding an image, a header, and information about the major.
export function MajorCard(props) {

    const [redirectTo, setRedirectTo] = useState(undefined);
    const handleClick = () => {
      console.log("You clicked on", props.majorCard.majorName);
      setRedirectTo(true);
    }
    
    const handleFavorite = () => {
      // builds the array of favorites for the favorite page
        if (!favorites.includes(majorCard.majorName)) {
          favorites.push(majorCard.majorName);
        }
    }

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

    let homePageCard =  (
      <div className={cardClasses}>
        <img
         className="card-img-top" src={majorCard.imgURL} alt={majorCard.alt}> 
        </img>
        <div className="card-body">
          <h4 className="card-title text-center">{majorCard.majorName}</h4>
          <p className="card-text text-center"> {degreeInfo} </p>
          <div class="btn btn-outline-success" role="button" onClick={handleClick}>Learn more</div>
          <div class="btn btn-outline-success" role="button" onClick={handleFavorite}>Add to favorites</div>
        </div>
        <div className="card-footer text-center text-muted">Image from <a
              href="https://unsplash.com/photos/TiTblwCHZFY"><cite>Unsplash</cite></a>
        </div>
      </div>
    )

    
    return(homePageCard);
}

// CardList returns a set of card components from MajorCard based on the dataset of information passed in. 
export function CardList(props) {
  let cards = props.cards;
  let element = cards.map((card) => {
    return <MajorCard key={card.majorName} majorCard={card} />;
  })
  return <div className="container"><div className="card-columns">{element}</div></div>
}


export function FavoriteCard(props) {
  const [redirectTo, setRedirectTo] = useState(undefined);
  const handleClick = () => {
    console.log("You clicked on", props.majorCard.majorName);
    setRedirectTo(true);
  }
  
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

  let favoriteCard =  (
    <div className={cardClasses}>
      <img
       className="card-img-top" src={majorCard.imgURL} alt={majorCard.alt}> 
      </img>
      <div className="card-body">
        <h4 className="card-title text-center">{majorCard.majorName}</h4>
        <p className="card-text text-center"> {degreeInfo} </p>
        <div class="btn btn-outline-success" role="button" onClick={handleClick}>Learn more</div>
        <div class="btn btn-outline-success" role="button" onClick={() => {props.removeCallback(majorCard.majorName)}}>Remove from favorites</div>
      </div>
      <div className="card-footer text-center text-muted">Image from <a
            href="https://unsplash.com/photos/TiTblwCHZFY"><cite>Unsplash</cite></a>
      </div>
    </div>
  )
  
  return(favoriteCard);
}

export function FavoriteList(props) {
  let cards = props.cards;
  let element = cards.map((card) => {
    if (favorites.includes(card.majorName)) {
      return <FavoriteCard key={card.majorName} majorCard={card} removeCallback={props.removeCallback} />;
    }
  })
  return <div className="container"><div className="card-columns">{element}</div></div>
}