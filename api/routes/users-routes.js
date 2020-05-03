const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const usersController = require("../controllers/users-controller");

require("dotenv").config();

// fetching api route
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

router.get("/api/jobs", async (req, res) => {
  const jobs = await getAsync("github");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send(jobs);
});

// register routes
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 7 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);






// subscribe route
router.post("/:userId/subscribe", (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  const { phone } = req.body;
  const { userId } = req.params;

  User.findOneAndUpdate({ _id: userId }, { phone: parseInt(phone) })
    .then(console.log("updated"))
    .catch((err) => console.log(err));
  console.log("subscribed to " + phone);
  client.messages
    .create({
      body:
        "Thank you for subscribing! We will send you job update information daily! Goob Luck!!!",
      from: "+13346001946",
      to: "+" + phone,
    })
    .then((message) => console.log(message.body))
    .catch((err) => console.log("message not sent"));

  res.json("");
});

// export

module.exports = router;
