import { Home } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import React from "react";

 // MainNav returns the nav bar element at the top of the page.
  export function MainNav() {
    return  (
        <div className="main-nav" role="navigation">
          <Link to="/"><Home />Home Page</Link>
          <Link to="/favorites">
            Favorites                                 
          </Link> 
          <Link to="/progress">Check List</Link>
        </div>
    )
  }
