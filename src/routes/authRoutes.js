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
    // 422: Invalid data in request
    res.status(422).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password){
    return res.status(404).send({error: 'Must provide email and password.(3)'})
  }

  const user = await User.findOne({email: email})

  if (!user){
    return res.status(404).send({error: 'Email not found.'})
  }

  try {
    await user.comparePassword(password)
    const token = jwt.sign({userID: user._id}, "MY_SECRET_KEY")
    res.send({token})
  } catch (err) {
    return res.status(404).send({error: 'Invalid pwd or email.'})
  }

})

module.exports = router;
