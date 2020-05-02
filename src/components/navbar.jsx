import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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
  // Menu item
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //

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
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {auth.name}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    underline="none"
                    href="/subscribe"
                    style={{ color: "black" }}
                  >
                    Subscribe
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>Favorites</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    underline="none"
                    href="/logout"
                    onClick={auth.logout}
                    style={{ color: "black" }}
                  >
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
