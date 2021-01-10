const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Pre-save hook, runs before save
userSchema.pre("save", function (next) {
  const user = this;
  // If user hasn't modified their pwd, don't encrypt
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        next(err);
      }
      user.password = hash;
      // Continues process, saves user
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    const user = this;
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      // Pwd is a match
      resolve(true);
    });
  });
};

mongoose.model("User", userSchema);
