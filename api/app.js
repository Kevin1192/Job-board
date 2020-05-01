var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),


//Connect mongodb
const dataUrl = process.env.DATABASEURL || 'mongodb://localhost/job';
mongoose.connect(dataUrl, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }));

