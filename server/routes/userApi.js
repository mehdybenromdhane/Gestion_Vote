const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/vote";

mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
  if (err) {
    console.error("Error!" + err);
  } else {
    console.log("Connected to mongodb");
  }
});

// register

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify, nom } = req.body;

    // validation

    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newUser = new User({
      email,
      passwordHash,
      nom
      
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      'YL8J97Akpwf"5wZZ9skbK)KRb?m7Dv(x=cLrzM#4s]vJ74~+$~'
    );

    // send the token in a HTTP-only cookie
    const decoded = jwt.verify(
      token,
      'YL8J97Akpwf"5wZZ9skbK)KRb?m7Dv(x=cLrzM#4s]vJ74~+$~'
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send(decoded.user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// log in

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      'YL8J97Akpwf"5wZZ9skbK)KRb?m7Dv(x=cLrzM#4s]vJ74~+$~'
    );

    // send the token in a HTTP-only cookie
    const decoded = jwt.verify(
      token,
      'YL8J97Akpwf"5wZZ9skbK)KRb?m7Dv(x=cLrzM#4s]vJ74~+$~'
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })

      .send(decoded.user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    jwt.verify(token, 'YL8J97Akpwf"5wZZ9skbK)KRb?m7Dv(x=cLrzM#4s]vJ74~+$~');

    res.send(true);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

router.get("/user/:id", (req, res) => {
  const id = req.params.id;

  User.findById(id).exec(function (err, user) {
    if (err) {
      console.log("error user");
    } else {
      res.send(user);
    }
  });
});

module.exports = router;
