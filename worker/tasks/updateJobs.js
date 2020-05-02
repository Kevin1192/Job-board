require("dotenv").config();
var fetch = require("node-fetch");
const Users = require("../../api/models/userSchema");
const mongoose = require("mongoose");


//Connect mongodb
const dataUrl = process.env.DATABASEURL || "mongodb://localhost/job";
mongoose.connect(dataUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Twilio authentication
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);

const baseURL = "https://jobs.github.com/positions.json";

async function updateJobs() {
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
  const jrJobs = allJobs.filter((job) => {
    const jobTitle = job.title.toLowerCase();
    let isJunior = true;
    if (
      jobTitle.includes("senior") ||
      jobTitle.includes("manager") ||
      jobTitle.includes("sr.") ||
      jobTitle.includes("architect")
    ) {
      isJunior = false;
    } else {
      return true;
    }
  });

  // Send update to users

  const jobUpdates = await jrJobs.slice(0, 5);

  const messages = [];
  jobUpdates.forEach((job, i) => {
    let message = `
    ${i + 1}.  
    title: ${job.title}
    company: ${job.company}
    location: ${job.location}
    detail: ${job.url}
    `;
    messages.push(message);
  });

  let phones = [];
  const users = await Users.find();
  users.forEach((user) => {
    if (user.phone) {
      phones.push(user.phone);
    }
  });

  phones.forEach((phone) => {
    sendMessage(phone, messages);
  });
}

function sendMessage(phone, messages) {

  client.messages
    .create({
      body: messages.join(`
      `),
      from: "+13346001946",
      to: "+" + phone.toString(),
    })
    .then((message) => console.log(message.body))
    .catch((err) => console.log("message not sent", err));
}

updateJobs();

module.exports = updateJobs;
