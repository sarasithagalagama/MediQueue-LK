const express = require("express");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");
const { buildCrudRouter } = require("../utils/buildCrudRouter");

const router = express.Router();

router.use(protect, authorize("ADMIN"));
router.use(buildCrudRouter(User, { searchFields: ["name", "email", "phone"] }));

module.exports = router;
