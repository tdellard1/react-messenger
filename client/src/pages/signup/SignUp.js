import {useState} from 'react';
import { useHistory } from "react-router-dom";
import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { useAppContext } from "../../libs/contextLib";

function SignUpPage() {
    const { userHasAuthenticated } = useAppContext();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const registerContainer = {
        display: 'flex',
        flexDirection: 'column'
    };

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
                userHasAuthenticated(true);
                history.push("/");
            });
    }

    function routeToLogIn() {
        history.push("/login");
    }

    return (
        <form style={registerContainer} onSubmit={registerUser}>
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
            <Button variant="contained" onClick={routeToLogIn}>
                Log In
            </Button>
        </form>
    );
}

export default SignUpPage;
