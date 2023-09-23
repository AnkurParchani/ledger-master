const mongoose = require("mongoose");
const slugify = require("slugify");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  passwordConfirm: {
    type: String
  },
  slug: String,
  createdAt: { type: Date, default: Date.now() }
});

userSchema.pre("save", function() {
  this.passwordConfirm = undefined;
  this.slug = slugify(this.username, { lower: true });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
