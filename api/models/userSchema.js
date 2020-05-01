var mongoose = require("mongoose");
var Validator = require("mongoose-unique-validator");


var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 7 },
  saved: [
    {
      id: String,
      title: String,
    },
  ],
});

userSchema.plugin(Validator);

module.exports = mongoose.model("User", userSchema);