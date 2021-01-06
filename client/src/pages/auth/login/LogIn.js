import {TextField, Button} from '@material-ui/core';
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from "../AuthCSS";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

function LogInPage({setAuthentication}) {
    const { root, otherAuth, otherAuth_text, otherAuth_button, form, greeting, formFields, lastField, button } = useStyles();
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
        <div className={root}>
            <Snackbar open={!!open}
                      onClose={handleClose}
                      autoHideDuration={3000}>
                <Alert severity="error">
                    {open}
                </Alert>
            </Snackbar>
            <div className={otherAuth}>
                <small className={otherAuth_text}>Don't have an account?</small>
                <Button variant="contained"
                        className={otherAuth_button}
                        onClick={navigateToSignUp}>Create account</Button>
            </div>
            <form onSubmit={logInUser}
                  className={form}>
                <h3 className={greeting}>Welcome Back!</h3>
                <TextField required
                           fullWidth={true}
                           className={formFields}
                           id="standard-basic"
                           label='Email Address'
                           type="email"
                           onChange={(e) => setEmail(e.target.value)}/>
                <TextField required
                           fullWidth={true}
                           className={lastField}
                           label='Password'
                           type="password"
                           onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained"
                        className={button}
                        type="password"
                        color="primary">Login</Button>
            </form>
        </div>
    );
}

export default LogInPage;
