import React, {useState} from "react";
import {MuiThemeProvider} from "@material-ui/core";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {authenticationStatus} from "./libs/authentication-status";

import {theme} from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignUpPage from "./pages/signup/SignUp";
import LogInPage from "./pages/login/LogIn";

import "./App.css";

function App() {
    const [isAuthenticated, setAuthentication] = useState(authenticationStatus);

    function ProtectedRoutes({children}) {
        return isAuthenticated ? (children) :
            (<Redirect to="/login"/>)
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path="/signup">
                        {isAuthenticated ? <Redirect to="/"/> : <SignUpPage setAuthentication={setAuthentication}/>}
                    </Route>
                    <Route path="/login">
                        {isAuthenticated ? <Redirect to="/"/> : <LogInPage setAuthentication={setAuthentication}/>}
                    </Route>
                    <Route exact path="/">
                        <ProtectedRoutes>
                            <LandingPage setAuthentication={setAuthentication}/>
                        </ProtectedRoutes>
                    </Route>
                </Switch>
            </Router>
        </MuiThemeProvider>
    );
}

export default App;
