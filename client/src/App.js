import React from "react";
import {MuiThemeProvider} from "@material-ui/core";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import {theme} from "./themes/theme";
import Messenger from "./pages/messenger/Messenger";
import SignUpPage from "./pages/auth/signup/SignUp";
import LogInPage from "./pages/auth/login/LogIn";
import backGround from "./images/bg-img.png";

import {ConversationProvider} from "./contexts/ConversationProvider";
import {SocketProvider} from "./contexts/SocketProvider";
import {AuthorizationProvider, useAuthorization} from "./contexts/AuthorizationProvider";

import "./App.css";

function App() {

    function ProtectedRoutes({children}) {
        const {authentication} = useAuthorization();
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
            <AuthorizationProvider>
                <SocketProvider>
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <ProtectedRoutes>
                                    <ConversationProvider>
                                        <Messenger/>
                                    </ConversationProvider>
                                </ProtectedRoutes>
                            </Route>
                            <Route path="/signup">
                                <AuthBackground>
                                    <SignUpPage/>
                                </AuthBackground>
                            </Route>
                            <Route path="/login">
                                <AuthBackground>
                                    <LogInPage/>
                                </AuthBackground>
                            </Route>
                        </Switch>
                    </Router>
                </SocketProvider>
            </AuthorizationProvider>
        </MuiThemeProvider>
    );
}

export default App;
