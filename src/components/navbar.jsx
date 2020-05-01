import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";

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
    color: 'white'
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link style={{ color: "white" }}  underline='none' href="/">
              JobBoard
            </Link>
          </Typography>
          <Link underline="none" href="/signin">
            <Button style={{ color: "white" }}>Login</Button>
          </Link>
          <Link underline="none" href="/signup">
            <Button style={{ color: "white" }}>SignUp</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
