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
  if (user.password) {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  }
});

userSchema.statics.authenticate = function (user, password, callback) {
  User.findOne({username: user}, function(err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
}

const User = mongoose.model("user", userSchema);

module.exports = User;
