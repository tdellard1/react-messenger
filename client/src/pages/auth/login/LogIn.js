import {TextField, Button} from '@material-ui/core';
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from "../AuthCSS";
import {useAuthorization} from "../../../contexts/AuthorizationProvider";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

function LogInPage() {
    const {setAuthentication} = useAuthorization();
    const classes = useStyles();
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
        <div className={classes.root}>
            <Snackbar open={!!open}
                      onClose={handleClose}
                      autoHideDuration={3000}>
                <Alert severity="error">
                    {open}
                </Alert>
            </Snackbar>
            <div className={classes.otherAuth}>
                <small className={classes.otherAuth_text}>Don't have an account?</small>
                <Button variant="contained"
                        className={classes.otherAuth_button}
                        onClick={navigateToSignUp}>Create account</Button>
            </div>
            <form onSubmit={logInUser}
                  className={classes.form}>
                <h3 className={classes.greeting}>Welcome Back!</h3>
                <TextField required
                           fullWidth={true}
                           className={classes.formFields}
                           id="standard-basic"
                           label='Email Address'
                           type="email"
                           onChange={(e) => setEmail(e.target.value)}/>
                <TextField required
                           fullWidth={true}
                           className={classes.lastField}
                           label='Password'
                           type="password"
                           onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained"
                        className={classes.button}
                        type="password"
                        color="primary">Login</Button>
            </form>
        </div>
    );
}

export default LogInPage;
