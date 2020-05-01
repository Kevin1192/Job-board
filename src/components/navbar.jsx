import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
    color: "white",
  },
}));

const currentUser = "/current";
async function fetchCurrentUser(updateCb) {
  const res = await fetch(currentUser);
  const json = await res.json();
  updateCb(json);
}

export default function NavBar() {
  const classes = useStyles();
  
  // Access current user information
  const [currentUser, updateUser] = React.useState({});
  React.useEffect(() => {
    fetchCurrentUser(updateUser);
  }, []);

  // User menu handle events
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link style={{ color: "white" }} underline="none" href="/">
              JobBoard
            </Link>
          </Typography>

          {Object.keys(currentUser).length === 0 ? (
            <div>
              <Link underline="none" href="/signin">
                <Button style={{ color: "white" }}>Login</Button>
              </Link>
              <Link underline="none" href="/signup">
                <Button style={{ color: "white" }}>SignUp</Button>
              </Link>
            </div>
          ) : (
            <div style={{display: 'flex'}}>
              <Typography variant="h6" style={{marginRight: '10px'}}>Hi, </Typography>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {currentUser.username}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <Link href='/logout'><MenuItem onClick={handleClose}>Logout</MenuItem></Link>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
