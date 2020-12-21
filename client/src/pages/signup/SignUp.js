import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';
import {authenticationStatus} from "../../libs/authentication-status";
import './SignUp.css';

function SignUpPage({ setAuthentication }) {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    function registerUser(event) {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        };

        fetch("register", requestOptions)
            .then(response => {
                if (response.status === 201) return response.json()
                else throw Error("Issue with request");
            })
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.user));
                setAuthentication(true);
                history.push("/");
            });
    }

    function navigateToSignUp() {
        history.push("/login");
    }

    return (
        <div className="SignUp">
            <form onSubmit={registerUser}>
                <TextField label='Username'
                           onChange={(e) => setUsername(e.target.value)}/>
                <TextField label='Email'
                           onChange={(e) => setEmail(e.target.value)}/>
                <TextField label='Password'
                           onChange={(e) => setPassword(e.target.value)}/>
                <TextField label='Confirm Password'
                           onChange={(e) => setConfirmPass(e.target.value)}/>

                <Button variant="contained"
                        type="type"
                        color="primary">Register</Button>
                <p>or</p>
                <Button variant="contained" onClick={navigateToSignUp}>
                    Log In
                </Button>
            </form>
        </div>
    );
}

export default SignUpPage;
