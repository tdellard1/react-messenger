import React from "react";
import {MuiThemeProvider} from "@material-ui/core";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import useLocalAuth from "./libs/local-auth";

import {theme} from "./themes/theme";
import Messenger from "./pages/Messenger";
import SignUpPage from "./pages/auth/signup/SignUp";
import LogInPage from "./pages/auth/login/LogIn";
import backGround from "./images/bg-img.png";

import "./App.css";

function App() {
    const [authentication, setAuthentication] = useLocalAuth();

    function ProtectedRoutes({children}) {
        return !!authentication ? (children) :
            (<Redirect to="/signup"/>)
    }

    function AuthBackground({children}) {
        return (
            <div className="auth-container">
                <div className="signUpBackground">
                    <img src={backGround} alt="background"/>
                </div>
                {children}
            </div>);
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <ProtectedRoutes>
                            <Messenger setAuthentication={setAuthentication} user={authentication}/>
                        </ProtectedRoutes>
                    </Route>
                    <Route path="/signup">
                        <AuthBackground>
                            <SignUpPage setAuthentication={setAuthentication}/>
                        </AuthBackground>
                    </Route>
                    <Route path="/login">
                        <AuthBackground>
                            <LogInPage setAuthentication={setAuthentication}/>
                        </AuthBackground>
                    </Route>
                </Switch>
            </Router>
        </MuiThemeProvider>
    );
}

export default App;
