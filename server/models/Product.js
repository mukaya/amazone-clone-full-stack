const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSChema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  owner: { type: Schema.Types.ObjectId, ref: "Owner" },
  title: { type: String, required: false },
  description: { type: String, required: false },
  photo: { type: String, required: false },
  price: { type: Number },
  stockQuantity: { type: Number },
  rating: [Number],
});

module.exports = mongoose.model("Product", ProductSChema);
