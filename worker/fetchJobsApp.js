// run fetchGithub every hour

var CronJob = require("cron").CronJob;

const fetchGithub = require('./tasks/fetch-github');


var fetchJob = new CronJob(
  "* * 1 * * *",
  fetchGithub(),
  null,
  true,
  "America/Los_Angeles"
);
fetchJob.start();

