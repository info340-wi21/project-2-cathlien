import { Link, Redirect } from 'react-router-dom';
import React, { useState } from "react";

// TopHeader returns a few elements containing glossary information for the header.
export function TopHeader() {
    return <div className="top" >
      <h1>
        ExploreUW
      </h1>
      <h2>UW College of Environment</h2>
      </div>
  }

  // PurpleBlock returns a large purple div block containing header text. 
  export function PurpleBlock(props) {
    return <div className="purple-block" aria-label="a purple rectangular block">
      <h3>{props.name}</h3>
    </div>;
  }

  // MainNav returns the nav bar element at the top of the page.
  export function MainNav() {
    const [redirectTo, setRedirectTo] = useState(undefined);
    const handleClick = () => {
      setRedirectTo(true);
    }
  
    if (redirectTo) {
      return <Redirect push to="/favorites"/>
    }

    return  (
        <div className="main-nav" role="navigation">
          <a href="resources.html">
            Additional resources
          </a>
          <p onClick={handleClick}>
            Favorites
          </p>
        </div>
    )
  }

  // SideNav returns a nav column used on the individual major pages.
  export function SideNav() {
    return <nav>
          <div className="sidenav" role="navigation">
              <a href="#Overview">Overview</a>
              <Link to="/">Return to Home Page</Link>
            </div>
      </nav>;
  }

  // Overview returns a set of text containing the overview information for that major page.
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