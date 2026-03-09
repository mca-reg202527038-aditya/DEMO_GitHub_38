const express = require("express");
const router = express.Router();
const productModel = require("../models/product_model");
const Auth = require("../middlewares/user.middleware");

router.get("/", (req, res) => {
  return productModel.find();
});

router.post("/add", Auth, async (req, res) => {
  const { title, description, price } = req.body;
  const createdby = req.user.userid;
  const product = await productModel.create({
    title,
    description,
    price,
    createdby,
  });
  res.status(200).json({ product, message: "Created Sucessfully" });
});

router.put("update", Auth, async (req, res) => {});

router.delete("/delete", Auth, async (req, res) => {
  const { id } = req.body;
  await productModel.deleteOne({ id });

});

module.exports = router;
