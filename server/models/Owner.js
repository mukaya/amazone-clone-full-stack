const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OwnerSChema = new Schema({
  name: { type: String, required: false },
  about: { type: String, required: false },
  photo: { type: String, required: false },
});

module.exports = mongoose.model("Owner", OwnerSChema);
