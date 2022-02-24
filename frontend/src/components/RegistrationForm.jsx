// import axios from "axios";
import http from "axios";
import { useState, useEffect } from "react";
import "./style/registrationForm.css";
import Picture from "./style/img/peakpx.jpg";
import Navigation from "./Navigation";
import {backend_source} from "./API"

function SignupForm(props) {
  const backend = backend_source();
  const loggedIn = props.loggedIn;
  const setLoggedIn = props.setLoggedIn;
  const setMessage = props.setMessage;

  //  const [nameValue, setNameValue] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [buttonToAppear, setToAppear] = useState("login");

  const login = async () => {
    try {
      const response = await http.post(
        `${backend}/api/login`,
        {},
        {
          headers: {
            authorization: authEmail + ":::" + authPassword,
          },
        }
      );
      setToAppear("collection");
      //console.log(response);
      localStorage.setItem("sessionId", response.data);
      //     localStorage.setItem("password", authPassword);
      setLoggedIn("true");
      setMessage("Succesful login");
    } catch (err) {
      setMessage("Wrong email or password");
      return;
      //        setToAppear("signup")
    }
  };

  const signup = async () => {
    try {
      await http.post(
        `${backend}/api/signup`,
        {
          password: password,
          email: email,
        }
      );
      setToAppear("login");
      setPassword("");
      setEmail("");
      setMessage("Successful sign up");
      return;
    } catch (err) {
      if (!err.response) {
        setMessage("Ooops... something went wrong");
        return;
      } else if (err.response.status === 409) {
        setMessage("User already exists, please use the login");
        return;
      } else if (err.response.status === 400) {
        setMessage("Missing credentials");
        return;
      }
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email || !password) return;
    setAuthEmail(email);
    setAuthPassword(password);
    //    setToAppear('login')
  }, []);
  //console.log(buttonToAppear);

  return (
    <>
      {buttonToAppear === "login" && (
        <section>
          {/*console.log("!!!!")*/}
          <hr className="separator1" /> <br />
          <div className="form-container">
            <div className="form-picture">
              <img src={Picture} alt="" height={500} />{" "}
            </div>
            <div className="form-register">
              <h3 className="h3Reg">Login to the Art Magazine</h3>
              <input
                type="email"
                placeholder="Email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
              />
              {/*console.log(authPassword, authEmail)*/}
              <button className="form-btn" onClick={login} width="50%">
                Log in
              </button>
              <button
                className="form-btn"
                onClick={() => setToAppear("signup")}
                width="50"
              >
                I don't have an account
              </button>
            </div>
          </div>
          <br></br>
          <br></br>
          <hr className="separator1" /> <br />
          <div id="message"></div>
        </section>
      )}

      {buttonToAppear === "signup" && (
        <section>
          <hr className="separator1" /> <br />
          <div className="form-container">
            <div className="form-picture">
              <img src={Picture} alt="" height={500} />{" "}
            </div>
            <div className="form-register">
              <h3 className="h3Reg">Signup to the Art Magazine</h3>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="form-btn" onClick={signup}>
                Sign up
              </button>
              <button className="form-btn" onClick={() => setToAppear("login")}>
                I have an account
              </button>
            </div>
          </div>
          <br></br>
          <br></br>
          <hr className="separator1" /> <br />
        </section>
      )}
    </>
  );
}

export default SignupForm;
