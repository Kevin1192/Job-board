var CronJob = require("cron").CronJob;

const fetchGithub = require('./tasks/fetch-github');


var fetchJob = new CronJob(
  "* * * * *",
  fetchGithub(),
  null,
  true,
  "America/Los_Angeles"
);
fetchJob.start();

