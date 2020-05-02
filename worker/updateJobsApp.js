var CronJob = require("cron").CronJob;

const updateJobs = require("./tasks/updateJobs");


var updateJobsApp = new CronJob(
  "* * * 1 * *",
  updateJobs(),
  null,
  true,
  "America/Los_Angeles"
);

updateJobsApp.start();
