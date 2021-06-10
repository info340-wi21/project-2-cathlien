import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import favorites from "./favorites";
import firebase from "firebase/app";


// MajorCard returns a MajorCard component that is made up of several divs holding an image, a header, and information about the major.
export function MajorCard(props) {

    const [redirectTo, setRedirectTo] = useState(undefined);
    const handleClick = () => {
      console.log("You clicked on", props.majorCard.majorName);
      setRedirectTo(true);
    }
    
    const handleFavorite = () => {
      var f =[];
      // builds the array of favorites for the favorite page
        if (!favorites.includes(majorCard.majorName)) {
          favorites.push(majorCard.majorName);
          const newFavObject = {
            major: majorCard.majorName,
            degreeType: majorCard.degreeType
          }
          f.push(newFavObject);
        }
        //userRef.child('favorites').set(f);
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
  const [favs, setFavs] = useState([]) //an array
    useEffect(() => {
      const favReference = firebase.database().ref('myFavs')
      favReference.on('value', (snapshot) => {
        const theFavObj = snapshot.val()
        let ObjKeyArray = Object.keys(theFavObj) //turn into an array
        let favArray = ObjKeyArray.map((key) => {
          let singleFavObj = theFavObj[key]
          singleFavObj.key = key
          return singleFavObj;
        }
        )
        setFavs(favArray);
      })
    },[])


  const [unfavorite, setUnfavorite] = useState(favorites);
  const handleUnfavorite = (name) => {
    let copy = unfavorite.map((item) => {
      if (item !== name) {
        return item;
      }
    })
      setUnfavorite(copy);

    };

    console.log("favorite list running again");

  const [redirectTo, setRedirectTo] = useState(undefined);
  const handleClick = () => {
    console.log("You clicked on", props.majorCard.majorName);
    setRedirectTo(true);
  }
  
  let favoriteCard = (card, cards) => {
    if (card !== undefined) {

    console.log("this is card", card);
    let major = cards.filter((object) => {
      if (object.majorName === card) {
        return object;
      }
    });
    card = major[0];
    console.log(card, "card");

  
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

    return (<div className={cardClasses}>
      <img
       className="card-img-top" src={card.imgURL} alt={card.alt}> 
      </img>
      <div className="card-body">
        <h4 className="card-title text-center">{card.majorName}</h4>
        <p className="card-text text-center"> {degreeInfo} </p>
        <div class="btn btn-outline-success" role="button" onClick={handleClick}>Learn more</div>
        <div class="btn btn-outline-success" role="button" onClick={() => {handleUnfavorite(card.majorName)}}>Remove from favorites</div>
      </div>
      <div className="card-footer text-center text-muted">Image from <a
            href="https://unsplash.com/photos/TiTblwCHZFY"><cite>Unsplash</cite></a>
      </div>
    </div>)
    }
  }


  let cards = props.cards;
 
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