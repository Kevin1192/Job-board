import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { LoginContext } from "../shared/context/login-context";
import { Redirect } from "react-router-dom";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        JobBoard
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Subscribe() {
  const classes = useStyles();

  const auth = useContext(LoginContext);
  //generate phone number state
  const [phone, setPhone] = useState(0);
  // generate redirect state
  const [isRedirect, setRedirect] = useState(false);

  //handle Input Change
  const handlePhoneChange = (evt) => {
    setPhone(evt.target.value);
  };

  // Submit function
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const fetchData = await fetch(
        `${
          process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api"
        }/users/${auth.userId}/subscribe`,
        {
          method: "POST",
          body: JSON.stringify({
            phone: phone,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h6' variant='h6'>
            Simply enter your phone number with area code and get updates daily!
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="phone number with area code"
            name="phone"
            autoComplete="phone"
            autoFocus
            onChange={handlePhoneChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Subscribe
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {isRedirect && <Redirect to="/" />}
    </Container>
  );
}
