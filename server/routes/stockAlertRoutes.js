const express = require("express");
const StockAlert = require("../models/StockAlert");
const { protect, authorize } = require("../middleware/auth");
const { buildCrudRouter } = require("../utils/buildCrudRouter");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR", "RECEPTIONIST"));
router.use(
  buildCrudRouter(StockAlert, {
    searchFields: ["message", "alertType", "severity"],
  }),
);

router.get(
  "/active",
  protect,
  authorize("ADMIN", "DOCTOR", "RECEPTIONIST"),
  async (req, res, next) => {
    try {
      const alerts = await StockAlert.find({ status: "ACTIVE" }).sort({
        createdAt: -1,
      });
      res.json(alerts);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/critical",
  protect,
  authorize("ADMIN", "DOCTOR"),
  async (req, res, next) => {
    try {
      const alerts = await StockAlert.find({ severity: "CRITICAL" }).sort({
        createdAt: -1,
      });
      res.json(alerts);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id/resolve",
  protect,
  authorize("ADMIN", "DOCTOR"),
  async (req, res, next) => {
    try {
      const alert = await StockAlert.findByIdAndUpdate(
        req.params.id,
        {
          status: "RESOLVED",
          resolvedAt: new Date(),
          resolvedBy: req.user._id,
        },
        { new: true },
      );
      res.json(alert);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id/dismiss",
  protect,
  authorize("ADMIN", "DOCTOR"),
  async (req, res, next) => {
    try {
      const alert = await StockAlert.findByIdAndUpdate(
        req.params.id,
        { status: "DISMISSED" },
        { new: true },
      );
      res.json(alert);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
