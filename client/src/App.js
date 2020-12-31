import React from "react";
import {MuiThemeProvider} from "@material-ui/core";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import useLocalAuth from "./libs/local-auth";

import {theme} from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignUpPage from "./pages/signup/SignUp";
import LogInPage from "./pages/login/LogIn";
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
                            <LandingPage setAuthentication={setAuthentication}/>
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

    /*
    return (
         <MuiThemeProvider theme={theme}>
             <Router>
                 <img src={backGround} alt="background"/>
                 <Switch>
                     <Route path="/signup">
                         {!!authentication ? <Redirect to="/"/> : <SignUpPage setAuthentication={setAuthentication}/>}
                     </Route>
                     <Route path="/login">
                         {!!authentication ? <Redirect to="/"/> : <LogInPage setAuthentication={setAuthentication}/>}
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
     */
}

export default App;
