const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");

const buildCrudRouter = (Model, options = {}) => {
  const router = express.Router();
  const { searchFields = [], softDelete } = options;

  router.get(
    "/",
    asyncHandler(async (req, res) => {
      const filter = {};
      if (searchFields.length && req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i");
        filter.$or = searchFields.map((field) => ({ [field]: regex }));
      }
      const items = await Model.find(filter).sort({ createdAt: -1 });
      res.json(items);
    }),
  );

  router.post(
    "/",
    asyncHandler(async (req, res) => {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    }),
  );

  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      const item = await Model.findById(req.params.id);
      if (!item) {
        res.status(404);
        throw new Error("Resource not found");
      }
      res.json(item);
    }),
  );

  router.put(
    "/:id",
    asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) {
        res.status(404);
        throw new Error("Resource not found");
      }
      res.json(item);
    }),
  );

  router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
      const item = await Model.findById(req.params.id);
      if (!item) {
        res.status(404);
        throw new Error("Resource not found");
      }
      if (softDelete) {
        Object.assign(item, softDelete(item, req) || {});
        await item.save();
        res.json({ message: "Resource updated instead of deleted", item });
        return;
      }
      await item.deleteOne();
      res.json({ message: "Resource deleted" });
    }),
  );

  return router;
};

module.exports = { buildCrudRouter };
