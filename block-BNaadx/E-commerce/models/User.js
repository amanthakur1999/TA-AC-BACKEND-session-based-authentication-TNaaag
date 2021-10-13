var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, minlength: 5, required: true },
    isAdmin: { type: String },
  },
  { timestamps: true }
);
userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;

      if (this.isAdmin === 'isAdmin') {
        this.isAdmin === 'true';
      }
      if (this.isAdmin === 'user') {
        this.isAdmin === 'false';
      }
      return next();
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
