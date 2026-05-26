const express = require("express");
const Patient = require("../models/Patient");
const { protect, authorize } = require("../middleware/auth");
const { buildCrudRouter } = require("../utils/buildCrudRouter");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR", "RECEPTIONIST"));
router.use(
  buildCrudRouter(Patient, {
    searchFields: ["fullName", "nic", "phone", "address"],
  }),
);

router.get(
  "/search/:keyword",
  protect,
  authorize("ADMIN", "DOCTOR", "RECEPTIONIST"),
  async (req, res, next) => {
    try {
      const regex = new RegExp(req.params.keyword, "i");
      const patients = await Patient.find({
        $or: [{ fullName: regex }, { nic: regex }, { phone: regex }],
      }).sort({ createdAt: -1 });
      res.json(patients);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
