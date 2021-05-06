const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySChema = new Schema({
  type: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Category", CategorySChema);
