/**
 * Model for users. 
 * 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type:  String,
  },
  googleId: String, 
  facebookId: String
});

userSchema.pre('save', function(next) {
  var user = this;

  if (user.password !== undefined) {
      bcrypt.hash(user.password, 10, function (err, hash) {

          if (err) {
              return next(err);
          }

          if (user.password) {
              user.password = hash;
          }
          next();
      });
  } else {
    next();
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
