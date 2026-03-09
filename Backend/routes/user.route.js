const userModel = require("../models/user_model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get("/", (req, res) => {
  res.send("Hello user");
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await userModel.findOne({ email });
  if (existing) {
    return res.status(201).json({ message: "Already existed" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const payload = {
    userid: user._id,
    user: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(200).json({ token, message: "Created Successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(201).json({ message: "not existed" });
  }

  const ismatch = await bcrypt.compare(password, user.password);

  if (!ismatch) {
    return res.status(201).json({ message: "Wrong Password" });
  }

  const payload = {
    userid: user._id,
    user: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(200).json({ token, message: "Created Successfully" });
});

module.exports = router;
