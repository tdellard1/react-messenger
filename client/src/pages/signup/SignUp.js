import React from 'react';
import {useHistory} from "react-router-dom";
import {TextField, Button} from '@material-ui/core';
import './SignUp.css';
import FormValidation from './services/formValidation';
import signUpValidation from "./services/sign-up-validation";

const INITIAL_STATE  = {
    username: "",
    email: "",
    password: "",
    confirmPass: ""
};

function SignUpPage({setAuthentication}) {
    const history = useHistory();
    const {handleChange, handleSubmit, handleBlur, errors} =
        FormValidation(INITIAL_STATE, signUpValidation, signUpCallback);

    function navigateToLogin() {
        history.push("/login");
    }

    function signUpCallback(user) {
        setAuthentication(user);
        history.push("/");
    }

    return (
        <div className="SignUp">
            <div className="SignUp_login">
                <small className="SignUp_login__text">Already have an account?</small>
                <Button variant="contained"
                        className="SignUp_login__button"
                        onClick={navigateToLogin}>Login</Button>
            </div>
            <form onSubmit={handleSubmit}
                  className="SignUp__form">
                <h3 className="SignUp__create">Create an account.</h3>
                <TextField required
                           fullWidth={true}
                           label='Username'
                           name="username"
                           className="SignUp__username"
                           onChange={handleChange}/>
                <TextField required
                           fullWidth={true}
                           type="email"
                           label='Email'
                           name="email"
                           className="SignUp__email"
                           onChange={handleChange}/>
                <TextField required
                           fullWidth={true}
                           type="password"
                           label='Password'
                           name="password"
                           className="SignUp__password"
                           error={!!errors.password}
                           helperText={errors.password}
                           onBlur={handleBlur}
                           onChange={handleChange}/>
                <TextField required
                           fullWidth={true}
                           type="password"
                           label='Confirm Password'
                           name="confirmPass"
                           className="SignUp__confirmPass"
                           error={!!errors.confirmPass}
                           helperText={errors.confirmPass}
                           onBlur={handleBlur}
                           onChange={handleChange}/>

                <Button variant="contained"
                        className="SignUp__button"
                        type="submit"
                        color="primary">Create</Button>
            </form>
        </div>
    );
}

export default SignUpPage;
