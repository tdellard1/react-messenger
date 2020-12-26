import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {TextField, Button} from '@material-ui/core';
import './SignUp.css';
import signUpFormValidation from './services/signUpFormValidation';

const INITIAL_STATE  = {
    username: "",
    email: "",
    password: "",
    confirmPass: ""
};

function SignUpPage({setAuthentication}) {
    signUpFormValidation(INITIAL_STATE);
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [errorObject, setErrorObject] = useState({
        emailError: false,
        emailErrorText: "",
        passwordError: false,
        passwordErrorText: "",
        confirmPasswordError: false,
        confirmPasswordErrorText: "",
    });

    function registerUser(event) {
        event.preventDefault();

        if (password.length < 6) {
            return setErrorObject({
                ...errorObject,
                passwordError: true,
                passwordErrorText: "Password must be 6 characters or longer"
            });
        }

        if (confirmPass !== password) {
            return setErrorObject({
                ...errorObject,
                confirmPasswordError: true,
                confirmPasswordErrorText: "Passwords do not match"
            });
        }

        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        };

        fetch("register", requestOptions)
            .then(r => r.json())
            .then(response => {
                if (response.error) {
                    // Create Toast
                } else {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    setAuthentication(true);
                    history.push("/");
                }
            });
    }

    function clearErrors({target}) {
        const { name } = target;
        const errorName = name + "Error";
        const errorText = name + "ErrorText";

        setErrorObject({
            ...errorObject,
            [errorName]: false,
            [errorText]: ""
        });
    }

    function navigateToSignUp() {
        history.push("/login");
    }

    return (
        <div className="SignUp">
            <form onSubmit={registerUser}>
                <TextField required
                           label='Username'
                           name="username"
                           onChange={(e) => setUsername(e.target.value)}/>
                <TextField required
                           type="email"
                           label='Email'
                           name="email"
                           onFocus={clearErrors}
                           error={errorObject.emailError}
                           helperText={errorObject.emailErrorText}
                           onChange={(e) => setEmail(e.target.value)}/>
                <TextField required
                           type="password"
                           label='Password'
                           name="password"
                           onFocus={clearErrors}
                           error={errorObject.passwordError}
                           helperText={errorObject.passwordErrorText}
                           onChange={(e) => setPassword(e.target.value)}/>
                <TextField required
                           type="password"
                           label='Confirm Password'
                           name="confirmPass"
                           onFocus={clearErrors}
                           error={errorObject.confirmPasswordError}
                           helperText={errorObject.confirmPasswordErrorText}
                           onChange={(e) => setConfirmPass(e.target.value)}/>

                <Button variant="contained"
                        type="type"
                        color="primary">Register</Button>
                <p>or</p>
                <Button variant="contained" type="submit" onClick={navigateToSignUp}>
                    Log In
                </Button>
            </form>
        </div>
    );
}

export default SignUpPage;
