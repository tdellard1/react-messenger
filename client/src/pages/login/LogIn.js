import {TextField, Button} from '@material-ui/core';
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import './LogIn.css';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

function LogInPage({setAuthentication}) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState("");

    function logInUser(event) {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        };

        fetch("login", requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.user) {
                    setAuthentication(response.user);
                    history.push("/");
                } else if (response.error) {
                    setOpen(response.error[0].msg);
                } else {
                    console.log("Other issue: ", response)
                }
            });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function navigateToSignUp() {
        history.push("/signup");
    }

    return (
        <div className="LogIn">
            <Snackbar open={!!open}
                      onClose={handleClose}
                      autoHideDuration={3000}>
                <Alert severity="error">
                    {open}
                </Alert>
            </Snackbar>
            <div className="sign-up">
                <small className="sign-up__text">Don't have an account?</small>
                <Button variant="contained"
                        className="sign-up__button"
                        onClick={navigateToSignUp}>Create account</Button>
            </div>

            <form onSubmit={logInUser}
                  className="login">
                <h3 className="login__welcome">Welcome Back!</h3>
                <TextField required
                           fullWidth={true}
                           className="login__email"
                           id="standard-basic"
                           label='Email Address'
                           type="email"
                           onChange={(e) => setEmail(e.target.value)}/>
                <TextField required
                           fullWidth={true}
                           className="login__password"
                           label='Password'
                           type="password"
                           onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained"
                        className="login__button"
                        type="password"
                        color="primary">Login</Button>
            </form>
        </div>
    );
}

export default LogInPage;
