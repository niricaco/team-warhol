import React from "react";
import "./navigation.css";

import { NavLink } from "react-router-dom";

/*
    
*/

const Navigation = () => {
  return (
    <nav>
      <div className="navicon">
        <div></div>
      </div>

      <div className="nav_item">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="nav_item">
        <NavLink to="/signup">Register</NavLink>
      </div>
      <div className="nav_item">
        <NavLink to="/artworks">Artworks</NavLink>
      </div>
    </nav>
  );
};

export default Navigation;

/*
<div className='navbar'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/signup">Register</NavLink>
            <NavLink to="/artworks">Artworks</NavLink>
        </div>
*/
