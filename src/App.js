import React from 'react';

export default function App() {
  return <div>
    <header><TopHeader /></header>
    <PurpleBlock />
    <MainNav />
    <Filter />
    <majorCard majorCard={sampleMajorData} />
    </div>;
}

export function TopHeader() {
  return <div className="top">
    <h1>
      ExploreUW
    </h1>
    <h2>UW College of Environment</h2>
    </div>
}

export function PurpleBlock() {
  return <div className="purple-block" aria-label="a purple rectangular block">
    <h3>Undergraduate Programs</h3>
  </div>;
}

/* Doesn't link to anything at the moment */
export function MainNav() {
  return <div className="main-nav" role="navigation"><a href="resources.html">Additional resources</a></div>;
}

export function Filter() {
  return <form className="filters">
  <label for="filter"><p className="filter-label">Filter programs by: </p></label>
  <div className="row justify-content-center">
      <select id="filter" className="custom-select custom-select-lg mb-6">
          <option selected>No filter</option>
          <option value="1">Bachelor of Sciences</option>
          <option value="2">Bachelor of Arts</option>
          <option value="3">Capacity-contrained major</option>
          <option value="4">Minimum major</option>
          <option value="5">Open major</option>
      </select>
  </div>
</form>;
}

// Sample dataset format for majorCard

const sampleMajorData = {majorName: "Aquatic and Fishery Sciences", minor: true, degreeType: "bs", majorStatus: "open", imgURL: "../img/test", alt: "fish in the ocean"}



// creates card for majors, need to add ability to take data from json for content and add client side routing to the links
// Prop name is expected to be majorCard, and represent a single major object
export function majorCard(props) {
    let majorCard = props.majorCard
    
    // Classes for major card, used for sorting
    let cardClasses = "card text-center m-4" + majorCard.degreeType + majorCard.majorStatus
    if (majorCard.minor == true) {
      let cardClasses = cardClasses + "minor"
    }

    // Adding formatting for the type of degree it is and if there is a minor
    let degreeInfo = majorCard.degreeType.substring(0) + "." + majorCard.degreeType.substring(1) + "."
    if (majorCard.minor == true) {
      degreeInfo = degreeInfo + ", " + "Minor"
    }

    return (
      <div className={cardClasses}>
        <img
         className="card-img-top" src={majorCard.imgURL} alt={majorCard.alt}> 
        </img>
        <div className="card-body">
          <h4 className="card-title text-center">{majorCard.majorName}</h4>
          <p className="card-text text-center"> {majorCard.degreeInfo} </p>
          <p> Button will go here </p>
        </div>
        <div className="card-footer text-center text-muted">Image from <a
              href="https://unsplash.com/photos/TiTblwCHZFY"><cite>Unsplash</cite></a>
        </div>
      </div>
    )
}
