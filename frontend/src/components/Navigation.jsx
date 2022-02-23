import React, {useState, useEffect } from "react";
import "./style/navigation.css";
import http from 'axios';
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

const Navigation = (props) => {

  const loggedIn = props.loggedIn;
  const setLoggedIn = props.setLoggedIn;
  const setMessage = props.setMessage;
  

  const signOut =  async () => {

    try {
      await http.delete("http://localhost:3000/api/logout", 
    {
        headers: {
          authorization: localStorage.getItem("sessionId"),
        },
      },
      {}
      );
      } catch(err) {
      } finally {
        localStorage.removeItem('sessionId')
//        setAuthUser('')
//        setAuthPassword('')
//        setSectionToAppear('login')
//***********
        setLoggedIn(false);
        setMessage("");
        //localStorage.removeItem("email");
        //localStorage.removeItem("password");
     }
  }

  // console.log("Is it logged in?" + loggedIn);

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
        {loggedIn && 
        <li>
          <NavLink to="/collections">My collections</NavLink>
        </li>
        }
        {!loggedIn &&
        <li>
          <NavLink to="/signup">Login or Sign up</NavLink>
        </li>
        }
        {loggedIn &&
        <li>
          <NavLink to="/" onClick={signOut}>Logout</NavLink>
        </li>
        }
      </ul>
    </nav>
  );
};

export default Navigation;

