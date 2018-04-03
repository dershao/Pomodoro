const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleId: String //temporarily only for google users
});

const User = mongoose.model("user", userSchema);

module.exports = User;
