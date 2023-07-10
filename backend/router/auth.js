const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const authenticate = require("../middleware/checkAuthenticate");
require("../database/dbConnection");
const cookieParser = require("cookie-parser");

// 1296000000 = 15 days  --> Milliseconds into days

router.use(cookieParser());

router.get("/", (req, res) => {
  res.send("This is from Server");
});

router.post("/register", async (req, res) => {
  const { name, email, role, phone, password, cpassword } = req.body;

  if (!name || !email || !role || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Pls Fill all Data" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(409)
        .json({ error: "User Already Exits", type: "userExits" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password does not Match" });
    } else {
      const user = new User({
        name,
        email,
        role,
        phone,
        password,
        cpassword,
      });

      const saveData = await user.save();
      if (saveData) {
        res
          .status(201)
          .json({ message: "User Sign Up Sucessfully", type: "success" });
      } else {
        res.status(500).json(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Pls fill email and Password" });
  }

  userLogin = await User.findOne({ email: email });

  if (userLogin) {
    const isMatchPass = await bcrypt.compare(password, userLogin.password);

    const token = await userLogin.generateAuthToken();
    // console.log(token);

    res.cookie("loginToken", token, {
      expires: new Date(Date.now() + 216000000),
      httpOnly: true,
    });

    if (!isMatchPass) {
      res.status(400).json({ error: "Invalid Credentials" });
    } else {
      res.status(200).json({ message: "Login Sucessfull", type: "success" });
    }
  } else {
    return res.status(404).json({ error: "Invalid Credentials" });
  }
});

router.get("/about", authenticate, (req, res) => {
  res.send(req.checkUser);
});
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(422).send({ error: "Plzz filled the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userId });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "Message send Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getUserData", authenticate, (req, res) => {
  res.send(req.checkUser);
});

router.get("/logout", (req, res) => {
  res.clearCookie("loginToken", { path: "/" });
  res.status(200).send("Logout");
});

module.exports = router;
