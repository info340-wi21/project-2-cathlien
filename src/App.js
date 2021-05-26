import React from 'react';

export default function App(props) {
  return <div>
    <header><TopHeader /></header>
    <PurpleBlock />
    <MainNav />
    <Filter />
    <CardList cards={sampleMajorData} />
    <Footer />
    </div>;
}

export function TopHeader() {
  return <div className="top" >
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

const sampleMajorData = [
  {"majorName": "Aquatic and Fishery Sciences", "minor": true, degreeType: "B.S.", "majorStatus":"open", "imgURL":"img/fish.jpg", "alt":"fish in the ocean"},
  {"majorName": "Environmental Science & Terrestrail Resource Management", "minor": true, degreeType: "B.S.", "majorStatus":"open", "imgURL":"img/atmosphere.jpg", "alt":"clouds"},
  {"majorName": "Atmospheric Sciences", "minor": true, degreeType: "B.S.", "majorStatus": "Minimum major", "imgURL":"img/atmosphere.jpg", "alt":"clouds"},
  {"majorName": "Environmental Studies", "minor": true, degreeType: "B.A.", "majorStatus": "open", "imgURL":"img/hill.jpg", "alt":"a hill with windmills"},
  {"majorName": "Bioresource Science and Engineering", "minor": true, degreeType: "B.S.", "majorStatus":"Capacity-constrained major", "imgURL":"img/bioresource.jpg", "alt":"laboratory tubes"},
  {"majorName": "Marine Biology", "minor": true, degreeType: "B.S.", "majorStatus":"Open", "imgURL":"img/marine bio.jpg", "alt":"marine biology"},
  {"majorName": "Earth and Space Sciences", "minor": true, degreeType: "B.S., B.A.", "majorStatus":"open", "imgURL":"img/earth.jpg", "alt":"earth from space"},
  {"majorName": "Oceanography", "minor": true, degreeType: "B.S., B.A.", "majorStatus":"Open", "imgURL":"img/o.jpg", "alt":"Ocean"}
  ];


// creates card for majors, need to add ability to take data from json for content and add client side routing to the links
// Prop name is expected to be majorCard, and represent a single major object
export function MajorCard(props) {
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

    return (
      <div className={cardClasses}>
        <img
         className="card-img-top" src={majorCard.imgURL} alt={majorCard.alt}> 
        </img>
        <div className="card-body">
          <h4 className="card-title text-center">{majorCard.majorName}</h4>
          <p className="card-text text-center"> {degreeInfo} </p>
          <a href="aquatic.html" class="btn btn-outline-success" role="button">Learn more</a>
        </div>
        <div className="card-footer text-center text-muted">Image from <a
              href="https://unsplash.com/photos/TiTblwCHZFY"><cite>Unsplash</cite></a>
        </div>
      </div>
    )
}

export function CardList(props) {
  let cards = props.cards;
  let element = cards.map((card) => {
    return <MajorCard key={card.majorName} majorCard={card} />;
  })
  return <div class="container"><div class="card-columns">{element}</div></div>
}

/* Can add props for image citations for major individual pages later on to this */
export function Footer() {
  return <footer className="text-center">
  <p>
      Authors: Catherine Lien, Jessie Chen, Jesse Sershon, Jason Jung. Information from <a
          href="https://www.washington.edu/students/gencat/academic/college_environment.html">
          <cite>UW Degree Program</cite>.</a> Favicon from
      <a
          href="https://www.iconfinder.com/icons/1936907/eco_environment_green_leaves_nature_recycle_recycling_icon">
          <cite>Iconfinder</cite></a>. Cover image from <a
          href="https://unsplash.com/s/photos/green-leaf"><cite>Unsplash</cite></a>
  </p>
</footer>;
}
