// import axios from "axios";
import http from "axios";
import { useState } from "react";
import "./style/registrationForm.css";
import Picture from "./style/img/peakpx.jpg";

function SignupForm() {
  const [nameValue, setNameValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await http.post("http://localhost:3000/signup", {
        name: nameValue,
        password: password,
        email: email,
      });
      alert("Successful sign up");
      setNameValue("");
      setPassword("");
      setEmail("");
    } catch (err) {
      if (!err.response) {
        alert("Ooops... something went wrong");
      }
      if (err.response.status === 409) {
        alert("user already exists");
      }
      if (err.response.status === 400) {
        alert("Missing credentials");
      }
    }
  };

  return (
    <>
      <hr class="separator1" /> <br />
      <div className="form-container">
        <div className="form-picture">
          <img src={Picture} alt="" height={500} />{" "}
        </div>
        <div className="form-register">
          <h3 className="h3Reg">Register to the Art Magazine</h3>
          {/* <input type='text' placeholder='Username' value={nameValue} onChange={(e) => setNameValue(e.target.value)} ></input> */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="form-btn" onClick={signup}>
            Sign up
          </button>
        </div>
      </div>
      <br></br>
      <br></br>
      <hr class="separator1" /> <br />
    </>
  );
}

export default SignupForm;
