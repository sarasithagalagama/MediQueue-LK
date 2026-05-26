const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role = "PATIENT" } = req.body;

  const exists = await User.findOne({ email: email?.toLowerCase() });
  if (exists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  res.status(201).json({
    token: signToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() }).select(
    "+password",
  );

  if (!user || !user.isActive) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.json({
    token: signToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});

const getMe = asyncHandler(async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
    },
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");
  const valid = await bcrypt.compare(currentPassword, user.password);

  if (!valid) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: "Password updated" });
});

module.exports = { registerUser, loginUser, getMe, changePassword };
