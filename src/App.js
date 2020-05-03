import React from "react";
import Jobs from "./components/jobs";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import NavBar from "./components/navbar";
import SignIn from "./components/signIn";
import Subscribe from "./components/subscribe";

import { LoginContext } from "./shared/context/login-context";
import { useAuth } from "./shared/hooks/auth-hook";


// fetch jobs from backend
const JOB_API = `${
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api"
}/users/api/jobs`;
async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  updateCb(json);
}

function App() {

  // update jobs
  const [jobList, updateJobs] = React.useState([]);
  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, []);

  const { name, token, login, logout, userId } = useAuth();

  let routes;

  routes = (
    <Switch>
      <Route exact path="/">
        <Jobs jobs={jobList} />
      </Route>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      <Route exact path="/subscribe">
        <Subscribe />
      </Route>
    </Switch>
  );
  return (
    <LoginContext.Provider
      value={{
        name: name,
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
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
