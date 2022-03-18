import React from "react";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) =>
  history.location.pathname == path
    ? { color: "#ff4081" }
    : { color: "#ffffff" };

const Menu = ({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Membership Application
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
          <Home />
        </IconButton>
      </Link>
      <Link to="/users">
        <Button style={isActive(history, "/users")}>Users</Button>
      </Link>
      {!auth.isAuthenticated() && (
        <span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up</Button>
          </Link>

          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign in</Button>
          </Link>
        </span>
      )}
      {auth.isAuthenticated() && (
        <span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button
              style={isActive(
                history,
                "/user/" + auth.isAuthenticated().user._id
              )}
            >
              My Profile
            </Button>
          </Link>

          <Button
            color="inherit"
            onClick={() => {
              auth.clearToken(() => history.push("/")); // auth.clearJWT()
            }}
          >
            Sign out
          </Button>
        </span>
      )}
    </Toolbar>
  </AppBar>
);

export default withRouter(Menu);
