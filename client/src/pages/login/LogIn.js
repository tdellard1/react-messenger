import { TextField, Button, Link } from '@material-ui/core';
import React, {useState} from "react";
import {useAppContext} from "../../libs/contextLib";
import {useHistory} from "react-router-dom";

function LogInPage() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userHasAuthenticated } = useAppContext();

    const loginContainer = {
        display: 'flex',
        flexDirection: 'column'
    };

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
                userHasAuthenticated(true);
                history.push("/");
            })

    }

    function routeToSignUp() {
        history.push("/signup");
    }

    return (
        <form style={loginContainer} onSubmit={logInUser}>
            <TextField label='Email'
                       onChange={(e) => setEmail(e.target.value)}/>
            <TextField label='Password'
                       onChange={(e) => setPassword(e.target.value)}/>

            <Button variant="contained"
                    type="type"
                    color="primary">LogIn</Button>
            <p>or</p>
            <Button variant="contained" onClick={routeToSignUp}>
                Sign Up
            </Button>
        </form>
    );
}

export default LogInPage;
