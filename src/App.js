import React from "react";
import Jobs from "./components/jobs";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  NavLink,
} from "react-router-dom";

import "./App.css";

import NavBar from "./components/navbar";
import SignIn from "./components/signIn";

import { LoginContext } from "./shared/context/login-context";
import { useAuth } from "./shared/hooks/auth-hook";

const JOB_API = "/api/jobs";
async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API);
  const json = await res.json();
  updateCb(json);
}

function App() {
  const [jobList, updateJobs] = React.useState([]);
  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, []);

  const { token, login, logout, userId } = useAuth();

  let routes;

  routes = (
    <Switch>
      <Route exact path="/">
        <Jobs jobs={jobList} />
      </Route>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  return (
    <LoginContext.Provider value ={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout
    }} >
    <div className="App">
      <Router>
        <NavBar />
        {routes}
      </Router>
    </div>
    </LoginContext.Provider>
  );
}

export default App;
