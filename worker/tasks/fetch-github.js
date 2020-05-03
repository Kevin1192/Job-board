const redis = require("redis");
var fetch = require("node-fetch");
const client = redis.createClient();
const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const baseURL = "https://jobs.github.com/positions.json";

async function fetchGithub() {
  console.log("fetching github");

  // fetch jobs
  let resultCount = 1,
    onPage = 0;
  const allJobs = [];

  while (resultCount > 0) {
    const res = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    console.log("got", jobs.length, "jobs");
    onPage++;
  }

  


  // filter out unmatched positions
  const jrJobs = allJobs.filter(job => {
      const jobTitle = job.title.toLowerCase();
      let isJunior = true;
        if (jobTitle.includes('senior') || 
        jobTitle.includes('manager') || 
        jobTitle.includes('sr.') || 
        jobTitle.includes('architect')) {isJunior = false;} 
        else { return true;}
  })

  

  // set values in redis
  console.log('jr jobs', jrJobs.length);
  console.log("got", allJobs.length, "total jobs");
  const success = await setAsync('github',JSON.stringify(jrJobs));
  console.log({ success });

}


module.exports = fetchGithub;
