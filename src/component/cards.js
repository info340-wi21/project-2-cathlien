import React, { useState } from "react";
import { Redirect } from 'react-router-dom';


// MajorCard returns a MajorCard component that is made up of several divs holding an image, a header, and information about the major.
export function MajorCard(props) {

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

    return (
      <div className={cardClasses}>
        <img
         className="card-img-top" src={majorCard.imgURL} alt={majorCard.alt}> 
        </img>
        <div className="card-body">
          <h4 className="card-title text-center">{majorCard.majorName}</h4>
          <p className="card-text text-center"> {degreeInfo} </p>
          <div class="btn btn-outline-success" role="button" onClick={handleClick}>Learn more</div>
        </div>
        <div className="card-footer text-center text-muted">Image from <a
              href="https://unsplash.com/photos/TiTblwCHZFY"><cite>Unsplash</cite></a>
        </div>
      </div>
    )
}

// CardList returns a set of card components from MajorCard based on the dataset of information passed in. 
export function CardList(props) {
  let cards = props.cards;
  let element = cards.map((card) => {
    return <MajorCard key={card.majorName} majorCard={card} />;
  })
  return <div className="container"><div className="card-columns">{element}</div></div>
}

