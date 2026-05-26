const express = require("express");
const Medicine = require("../models/Medicine");
const { protect, authorize } = require("../middleware/auth");
const { buildCrudRouter } = require("../utils/buildCrudRouter");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR", "RECEPTIONIST"));
router.use(
  buildCrudRouter(Medicine, {
    searchFields: [
      "name",
      "genericName",
      "brandName",
      "batchNumber",
      "category",
    ],
  }),
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN", "DOCTOR"),
  async (req, res, next) => {
    try {
      const medicine = await Medicine.findByIdAndUpdate(
        req.params.id,
        { status: "DISCONTINUED" },
        { new: true },
      );
      res.json({ message: "Medicine marked as discontinued", medicine });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
