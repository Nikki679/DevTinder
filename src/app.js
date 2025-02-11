const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const app = express();
const validateSignUpData = require("../utils/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth");

//Middleware to convert json data to object
app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req, res) => {
  //Create a instance of User modal

  const { firstName, lastName, emailId, password } = req.body;
  try {
    validateSignUpData(req);
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await user.save();
    res.send("User Added Successfully !!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    if (!validator.isEmail(emailId)) {
      throw new Error("Email is not in format");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }
    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {
      const token = await user.getJwt()
      res.cookie("token", token,{expires:new Date(Date.now()+ 10 * 900000)});
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});
app.get("/profile",userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection established");
    });
  })
  .catch((err) => {
    console.log("There is issue connecting to database");
  });
