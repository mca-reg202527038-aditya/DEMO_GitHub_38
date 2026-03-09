const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: String,
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
