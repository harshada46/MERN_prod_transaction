// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  sold: { type: Boolean, default: false },
  dateOfSale: { type: Date, default: null },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
