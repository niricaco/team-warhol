// import axios from "axios";
import http from 'axios';
import { useState } from "react";

function SignupForm() {
    const [nameValue, setNameValue] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signup = async () => {
        try {
            await http.post('http://localhost:4000/api/signup', {
                name: nameValue,
                password: password,
                email: email
            });
            alert("Successful sign up");
            setNameValue('');
            setPassword('');
            setEmail('');

        } catch (err) {
            if (!err.response) {
                alert('Ooops... something went wrong')
            }
            if (err.response.status === 409) {
                alert('user already exists')
            }
            if (err.response.status === 400) {
                alert('Missing credentials')
            }

        }
    }



    return (
        <div>
            <h1>Register to the Art Magazine</h1>
            <input type='text' placeholder='username' value={nameValue} onChange={(e) => setNameValue(e.target.value)} ></input>
            <input type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

            <button onClick={signup}>Reg me in</button>
        </div>
    )
}

export default SignupForm