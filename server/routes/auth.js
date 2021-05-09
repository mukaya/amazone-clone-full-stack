const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verify-token");

router.post("/auth/signup", async function (req, res) {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter email or password",
    });
  } else {
    try {
      let newUser = new User({ name, email, password });
      await newUser.save();
      let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
        expiresIn: 604800,
      }); // 1 week
      res.json({
        success: true,
        token: token,
        message: "Successfully created a new user",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
});

router.get("/auth/user", verifyToken, async function (req, res) {
  try {
    let foundUser = await User.findOne({ _id: req.decoded._id });
    if (foundUser) {
      res.json({ success: true, user: foundUser });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
