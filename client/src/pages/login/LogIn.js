import { TextField, Button } from '@material-ui/core';
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import './LogIn.css';

function LogInPage({ setAuthentication }) {
    const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorObject, setErrorObject] = useState({});

    function logInUser(event) {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        };

        fetch("login", requestOptions)
            .then(response => {
                if (response.status === 200) return response.json()
                else throw Error("Issue with request");
            })
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.user));
                setAuthentication(true);
                history.push("/");
            });
    }

    function navigateToSignUp() {
        history.push("/signup");
    }

    return (
        <div className="LogIn">
            <form onSubmit={logInUser}>
                <TextField required
                           label='Email'
                           type="email"
                           onChange={(e) => setEmail(e.target.value)}/>
                <TextField required
                           label='Password'
                           type="password"
                           onChange={(e) => setPassword(e.target.value)}/>

                <Button required
                        variant="contained"
                        type="password"
                        color="primary">LogIn</Button>
                <p>or</p>
                <Button variant="contained" onClick={navigateToSignUp}>
                    Sign Up
                </Button>
            </form>
        </div>
    );
}

export default LogInPage;
