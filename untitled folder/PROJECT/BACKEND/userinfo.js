const mongoose = require("mongoose");

const UserInfo = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserInfo);
module.exports = User;
