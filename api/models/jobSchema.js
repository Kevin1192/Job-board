var mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
  type: String,
  url: String,
  created_at: String,
  
});
