const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const sujetSchema = new Schema({
  titre: String,
  description: String,
  oui: Number,
  non: Number,
  total: Number,
});

module.exports = mongoose.model("sujet", sujetSchema, "sujet");
