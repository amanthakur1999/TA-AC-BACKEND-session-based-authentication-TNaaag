var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const { Result } = require('postcss');
var userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    age: Number,
    phone: Number,
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      next();
    });
  } else {
    next();
  }
});
userSchema.methods.verifyPassword = function (password, cd) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cd(err, result);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
