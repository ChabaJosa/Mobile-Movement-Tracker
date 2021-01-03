const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({userID: user._id}, 'MY_SECRET_KEY') // Here we create the token
    res.send({token: token});

  } catch (err) {
    // 422: Invalid data in the req
    res.status(422).send(err.message);
  }
});

module.exports = router;
