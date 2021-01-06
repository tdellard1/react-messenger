import React from 'react';
import {useHistory} from "react-router-dom";
import {TextField, Button} from '@material-ui/core';
import useStyles from "../AuthCSS";
import FormValidation from './services/formValidation';
import signUpValidation from "./services/sign-up-validation";

const INITIAL_STATE  = {
    username: "",
    email: "",
    password: "",
    confirmPass: ""
};

function SignUpPage({setAuthentication}) {
    const { root, otherAuth, otherAuth_text, otherAuth_button, form, greeting, formFields, button } = useStyles();
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
        <div className={root}>
            <div className={otherAuth}>
                <small className={otherAuth_text}>Already have an account?</small>
                <Button variant="contained"
                        className={otherAuth_button}
                        onClick={navigateToLogin}>Login</Button>
            </div>
            <form onSubmit={handleSubmit}
                  className={form}>
                <h3 className={greeting}>Create an account.</h3>
                <TextField required
                           fullWidth={true}
                           label='Username'
                           name="username"
                           className={formFields}
                           onChange={handleChange}/>
                <TextField required
                           fullWidth={true}
                           type="email"
                           label='Email'
                           name="email"
                           className={formFields}
                           onChange={handleChange}/>
                <TextField required
                           fullWidth={true}
                           type="password"
                           label='Password'
                           name="password"
                           className={formFields}
                           error={!!errors.password}
                           helperText={errors.password}
                           onBlur={handleBlur}
                           onChange={handleChange}/>
                <TextField required
                           fullWidth={true}
                           type="password"
                           label='Confirm Password'
                           name="confirmPass"
                           className={lastField}
                           error={!!errors.confirmPass}
                           helperText={errors.confirmPass}
                           onBlur={handleBlur}
                           onChange={handleChange}/>

                <Button variant="contained"
                        className={button}
                        type="submit"
                        color="primary">Create</Button>
            </form>
        </div>
    );
}

export default SignUpPage;
