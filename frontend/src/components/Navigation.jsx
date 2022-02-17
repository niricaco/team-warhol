import React from "react";
import "./style/navigation.css";

import { NavLink } from "react-router-dom";

/*
    <nav>
	<div class="dot"></div>
	<ul>
		<li class="active"><NavLink to="/">Home</NavLink></li>
		<li><NavLink to="/signup">Register</NavLink></li>
		<li><NavLink to="/artworks">Artworks</NavLink></li>
	</ul>
</nav>
*/

const Navigation = () => {
  return (
    <nav>
	    <div class="dot"></div>
	    <ul>
		    <li class="active"><NavLink to="/">Home</NavLink></li>
		    <li><NavLink to="/signup">Sign up or Login</NavLink></li>
		    <li><NavLink to="/artworks">Artworks</NavLink></li>
	    </ul>
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
