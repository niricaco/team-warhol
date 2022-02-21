import React, {useState, useEffect } from "react";
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

  const [loggedIn, setLoggedIn] = useState("");

  useEffect(() => {
    setLoggedIn(localStorage.getItem("email"));
  }, [loggedIn]);
  

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
        {loggedIn.length > 1 && 
        <li>
          <NavLink to="/collection">Collection</NavLink>
        </li>
        }
        <li>
          <NavLink to="/signup">{!localStorage.getItem("email") ? "Login or Sign up" : "Logout"}</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

