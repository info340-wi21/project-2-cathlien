import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, useParams, Link, Redirect } from 'react-router-dom';

export default function App(props) {
  return <BrowserRouter>
    <Switch>
    <Route exact path="/" >
      <HomePage majors={props.majors} />
    </Route>
    <Route exact path="/major/:majorName">
      <MajorPage content={props.content}/>
    </Route>
    </Switch>
  </BrowserRouter>;
}

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
  </div>
}

export function MajorImages(props) {
  let content;
  props.content.forEach((major) => {
    if (major.majorName === props.name) {
      content = major;
    }
  })
  return <div><img className="major-img small-img" src={content.smallImg} alt={content.smallAlt}/>
  <img className="major-img big-img" src={content.bigImg} alt={content.bigAlt} /></div>;
}

export function Overview(props) {
  let content;
  props.content.forEach((major) => {
    if (major.majorName === props.name) {
      content = major;
    }
  })
  return <section>
    <h4 id="Overview">Overview</h4>
    <p>{content.overview}</p>
  </section>
}

export function TopHeader() {
  return <div className="top" >
    <h1>
      ExploreUW
    </h1>
    <h2>UW College of Environment</h2>
    </div>
}

export function PurpleBlock(props) {
  return <div className="purple-block" aria-label="a purple rectangular block">
    <h3>{props.name}</h3>
  </div>;
}

/* Doesn't link to anything at the moment */
export function MainNav() {
  return <div className="main-nav" role="navigation"><a href="resources.html">Additional resources</a></div>;
}

export function SideNav() {
  return <nav>
        <div className="sidenav" role="navigation">
            <a href="#Overview">Overview</a>
            <Link to="/">Return to Home Page</Link>
          </div>
    </nav>;
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

// creates card for majors, need to add ability to take data from json for content and add client side routing to the links
// Prop name is expected to be majorCard, and represent a single major object
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

export function MajorFooter(props) {
  let content;
  props.content.forEach((major) => {
    if (major.majorName === props.name) {
      content = major;
    }
  })
  return <footer className="text-center">
  <p>
      Authors: Catherine Lien, Jessie Chen, Jesse Sershon, Jason Jung. Information from <a
          href="https://www.washington.edu/students/gencat/academic/college_environment.html">
          <cite>UW Degree Program</cite>.</a> Favicon from
      <a
          href="https://www.iconfinder.com/icons/1936907/eco_environment_green_leaves_nature_recycle_recycling_icon">
          <cite>Iconfinder</cite></a>. 
          
          Image of {content.smallAlt} from
            <a href={content.smallLink}>
            <cite>Unsplash</cite></a>. Image of {content.bigAlt} from <a href={content.bigLink}><cite>Unsplash</cite>.</a>
            Cover image from <a href="https://unsplash.com/s/photos/green-leaf"><cite>Unsplash</cite></a>.
          
          Cover image from <a
          href="https://unsplash.com/s/photos/green-leaf"><cite>Unsplash</cite></a>
  </p>
</footer>;
}

