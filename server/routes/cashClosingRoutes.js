const express = require("express");
const CashClosing = require("../models/CashClosing");
const { protect, authorize } = require("../middleware/auth");
const { buildCrudRouter } = require("../utils/buildCrudRouter");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR", "RECEPTIONIST"));
router.use(buildCrudRouter(CashClosing, { searchFields: ["status", "notes"] }));

router.get(
  "/today",
  protect,
  authorize("ADMIN", "DOCTOR", "RECEPTIONIST"),
  async (req, res, next) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const closings = await CashClosing.find({
        closingDate: { $gte: today },
      }).sort({ createdAt: -1 });
      res.json(closings);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id/review",
  protect,
  authorize("ADMIN", "DOCTOR"),
  async (req, res, next) => {
    try {
      const closing = await CashClosing.findByIdAndUpdate(
        req.params.id,
        { ...req.body, reviewedBy: req.user._id, reviewedAt: new Date() },
        { new: true, runValidators: true },
      );
      res.json(closing);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
