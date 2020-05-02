import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { LoginContext } from "../shared/context/login-context";
import { Redirect } from 'react-router-dom'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();

  const auth = useContext(LoginContext);

  // generate login state
  const [isLogin, setIsLogin] = useState(true);
  // generate redirect state
  const [isRedirect, setRedirect] = useState(false);

  // generate form State 
const [formSta, setFormDa] = React.useState({
});


// Input change functions
const handleNameChange = (evt) =>{
  setFormDa({
    ...formSta,
    [evt.target.name]: evt.target.value
  })
  console.log('name', evt.target.value)
}

const handleEmailChange = (evt) => {
  setFormDa({
    ...formSta,
    [evt.target.name]: evt.target.value
  });
  console.log(formSta,evt.target.value);
};

const handlePasswordChange = (evt) => {
  setFormDa({
    ...formSta,
    [evt.target.name]: evt.target.value,
  });
};

// Submit function
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    console.log(formSta);

    if (isLogin) {
      try {
        const fetchData = await fetch(
          `${
            process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api"
          }/users/login`,{
          method: "POST",
          body: JSON.stringify({
            email: formSta.email,
            password: formSta.password
          }),
          headers: { "Content-Type": "application/json" }
        });
        console.log('fetched', fetchData)
        const data = await fetchData.json()
        auth.login(data.userId, data.token);
         (data.userId && setRedirect(true))
      } catch (error) {console.log(error)}
    } else {
      try {
        const formData = JSON.stringify({
          name: formSta.name,
          email: formSta.email,
          password: formSta.password
        });

        const fetchData = await fetch(
          `${
            process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api"
          }/users/signup`,
          {
            method: "POST",
            body: formData,
            headers: { "Content-Type": "application/json" }
          }
        );
        
        const data = await fetchData.json();
        console.log("fetch signup", data);
        auth.login(data.userId, data.token);
        data.userId && setRedirect(true);
      } catch (err) {console.log(err)}
    }
  };

  const showSignUp = () => {
    setIsLogin(prev => !prev)
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "Login" : "Sign Up"}
        </Typography>
        <form className={classes.form} onSubmit={handleLoginSubmit}>
          <Grid container spacing={2}>
            {!isLogin && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  element="input"
                  type="text"
                  name='name'
                  label="Full Name"
                  onChange={handleNameChange}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                element="input"
                type="email"
                name='email'
                label="Email"
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <Button inverse onClick={showSignUp}>
          {isLogin ? "Sign Up" : "Login"}
        </Button>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      { isRedirect &&  <Redirect to='/' />}
    </Container>
  );
}

export default SignUp