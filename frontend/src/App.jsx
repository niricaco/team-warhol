import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import { useArtworks } from "./api/useData";
import Artworks from "./components/artworks";
import Registration from "./components/RegistrationForm";
import Home from "./components/Home";
import Collections from "./components/Collections";

// import About from './components/About';
// import Contact from './components/Contact';
import Error from "./components/Error";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"



//class App extends Component {
  const App = () => {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

    return (
      <BrowserRouter>
        <div>
          <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn} setMessage={setMessage}/>
          <Routes>
            <Route path="/" element={<Home loggedIn={loggedIn} setMessage={setMessage} />} />
            <Route path="/artworks" element={<Artworks loggedIn={loggedIn} setMessage={setMessage}/>} />
            <Route path="/signup" element={<Registration loggedIn={loggedIn} setLoggedIn={setLoggedIn} setMessage={setMessage} />} />
            <Route path="/collections" element={<Collections loggedIn={loggedIn} setMessage={setMessage}/>} />
            <Route element={<Error />} />
          </Routes>
        </div>
        <div id="message">{message}</div>
        <Footer/>
      </BrowserRouter>
    );
  }

  /*   const [artworks, setArtworks] = useState([]);
  const [xappToken, setXappToken] = useState([]);
  const clientID = "efcb8eb8f8778d39695f",
    clientSecret = "bb837994bfd8df9f962b9862c81e3a83",
    apiUrl = "https://api.artsy.net/api/tokens/xapp_token";

  const token = async () => {
    const response = await axios.post(apiUrl, {
      client_id: clientID,
      client_secret: clientSecret,
    });
    setXappToken(response.data.token);
  };

  const load = async () => {
    const response = await axios.get("https://api.artsy.net/api/artworks", {
      headers: { "X-Xapp-Token": xappToken },
    });
    setArtworks(response);
  };

  useEffect(() => {
    token();
    load();
  }, [xappToken]);
  console.log(artworks); */

  /*
  return (
    <div>
      <p>szoveg</p>
      <SignupForm />
      <Artworks />
    </div>
  );
  */


export default App;
