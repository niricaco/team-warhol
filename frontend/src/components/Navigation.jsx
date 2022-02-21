import React, {useState} from "react";
import "./style/navigation.css";

import { NavLink } from "react-router-dom";


/*
    <nav>
	<div className="dot"></div>
	<ul>
		<li className="active"><NavLink to="/">Home</NavLink></li>
		<li><NavLink to="/signup">Register</NavLink></li>
		<li><NavLink to="/artworks">Artworks</NavLink></li>
	</ul>
</nav>
*/

const Navigation = () => {

  const [isLoggedin, setIsLoggedIn] = useState(false);

  return (
    <nav>
      <div className="dot"></div>
      <ul>
        <li className="active">
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/artworks">Artworks</NavLink>
        </li>
        <li>
          <NavLink to="/signup">{isLoggedin ? "Login or Sign up" : "Logout"}</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

