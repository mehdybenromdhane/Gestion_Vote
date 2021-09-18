const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  nom: String,
  email: String,
  passwordHash: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema, "user");
