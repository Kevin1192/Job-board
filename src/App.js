import React from "react";
import "./App.css";
import Jobs from "./jobs";

const JOB_API = "http://localhost:3001/jobs";

const mockjobs = [
  { title: "SWE 1", company: "Google" },
  { title: "SWE 1", company: "Facebook" }
];

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API);
  const json = await res.json();

  updateCb(json);
}
function App() {
  const [jobList, updateJobs] = React.useState([]);
  React.useEffect(() => {
    fetchJobs(updateJobs);
  },[])
  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
