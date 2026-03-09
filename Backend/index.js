const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const userRoute = require("./routes/user.route");
const connecttoDB = require("./db/db");
connecttoDB();

app.use("/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
