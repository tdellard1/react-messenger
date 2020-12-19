import React, {useEffect, useState} from "react";
import {Button, MuiThemeProvider} from "@material-ui/core";
import {BrowserRouter as Router, Route, Switch, useHistory, withRouter} from "react-router-dom";
import {AppContext} from "./libs/contextLib";

import {theme} from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignUpPage from "./pages/signup/SignUp";
import LogInPage from "./pages/login/LogIn";

import "./App.css";

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const history = useHistory();

    useEffect(() => {
        onLoad();
    }, []);

    function onLoad() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            userHasAuthenticated(true);
        } else {
            userHasAuthenticated(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem('user');
        userHasAuthenticated(false);
        // history.push("/login");
    }

    return (
        <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
            <MuiThemeProvider theme={theme}>
                <Router>
                    {isAuthenticated && (<Button variant="contained"
                                                 color="primary"
                                                 onClick={handleLogout}>Logout</Button>)}
                    <Switch>
                        <Route path="/signup" component={SignUpPage}/>
                        <Route path="/login" component={LogInPage}/>
                        <Route path="/" component={LandingPage}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        </AppContext.Provider>
    );
}

export default App;
