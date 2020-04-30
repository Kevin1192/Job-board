import React from "react";
import Jobs from "./components/jobs";
import AppBar from './components/navbar';

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
  },[]);
  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
