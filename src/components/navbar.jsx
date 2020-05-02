import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";

import { LoginContext } from '../shared/context/login-context'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkStyle: {
    color: "white",
  },
}));



export default function NavBar() {
  const classes = useStyles();
  
  const auth = useContext(LoginContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link style={{ color: "white" }} underline="none" href="/">
              JobBoard
            </Link>
          </Typography>

          {!auth.isLoggedIn ? (
            <div>
              <Link underline="none" href="/signin">
                <Button style={{ color: "white" }}>Login</Button>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <Link underline="none" href="/logout">
                <Button onClick={auth.logout} style={{ color: "white" }}>Logout</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
