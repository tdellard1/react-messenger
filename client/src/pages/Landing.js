import React, { Component } from "react";

import { Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link, withRouter } from "react-router-dom";

import Ping from "./Ping";

const landingPageStyle = theme => ({
  landingContainer: {
    margin: theme.spacing(2)
  }
});

class LandingPage extends Component {
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
  }


  state = {
    welcomeMessage: "Step 1: Run the server and refresh (not running)",
    step: 0
  };

  logOut() {
    localStorage.removeItem('user');
    const { history, setAuthentication } = this.props;
    setAuthentication(false);
    history.push("/login");
  }

  componentDidMount() {
    fetch("/welcome")
      .then(res => {
        if (res.status === 200) return res.json();
        else throw Error("Couldn't connect to the server");
      })
      .then(res => {
        this.setState({ welcomeMessage: res.welcomeMessage });
        this.incrementStep();
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  incrementStep = () => {
    this.setState(prevState => ({ step: (prevState.step += 1) }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
        <Typography>{this.state.welcomeMessage}</Typography>
        {this.state.step >= 1 && (
          <React.Fragment>
            <Link to="/ping">Step 2: Click here </Link>
            <Route
              path="/ping"
              render={props => {
                return (
                  <Ping
                    {...props}
                    incrementStep={this.incrementStep}
                    step={this.state.step}
                  />
                );
              }}
            />
          </React.Fragment>
        )}
        {this.state.step >= 3 && (
          <Typography>All done! Now go make a pull request!</Typography>
        )}
        <Button variant="contained"
                color="primary"
                onClick={this.logOut}>
          Log Out
        </Button>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(withRouter(LandingPage));
