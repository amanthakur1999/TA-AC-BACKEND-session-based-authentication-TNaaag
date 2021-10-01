var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const { Result } = require('postcss');
var userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 5, required: true },
    age: { type: Number },
    phone: { type: Number },
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
