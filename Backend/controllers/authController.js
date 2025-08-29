const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password)
      res.status(400).json({
        message: "Username,Email and Password are mandatory",
      });
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ username, email, password });
    await user.save();

    res.status(201).json({
      token: generateToken({
        _id: user._id,
        username: user.username,
        email: user.email,
      }),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      res.status(400).json({
        message: "Email and Password are mandatory",
      });
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        token: generateToken({
          _id: user._id,
          username: user.username,
          email: user.email,
        }),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
