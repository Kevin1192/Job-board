const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require('body-parser')
  port = 5000,
  User = require("./models/userSchema");

const userRoutes = require('./routes/users-routes')
const HTTPError = require('./models/http-error')
//Connect mongodb
const dataUrl = process.env.DATABASEURL || 'mongodb://localhost/job';

mongoose.connect(dataUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(express.urlencoded());

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE"
  );
  next();
});

// User authentication
app.use('/api/users', userRoutes)

app.use((request, response, next) => {
  const error = new HTTPError("Could not find this route!", 404);
  throw error;
});


// Register Routes
app.post('/signup', (req, res)=>{
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          req.flash("error", err.message);
          return res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, () => {
            currentUser = user
          res.redirect("/");
        });
      }
    );
})



//Log out route


app.listen(port, ()=>{
    console.log(`listening at ${port}`);
})