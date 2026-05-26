const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  if (!user || !user.isActive) {
    res.status(401);
    throw new Error("Not authorized");
  }

  req.user = user;
  next();
});

const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Forbidden");
    }

    next();
  };

module.exports = { protect, authorize };
