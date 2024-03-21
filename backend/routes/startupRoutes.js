const express = require("express");
const router = express.Router();
const startupController = require("../controllers/startupController");

// GET all startups
router.get("/", startupController.getAll);

// GET startup by ID
router.get("/:id", startupController.getById);

// POST a new startup
router.post("/", startupController.create);

// UPDATE startup by ID
router.put("/:id", startupController.updateById);

// DELETE startup by ID
router.delete("/:id", startupController.deleteById);

module.exports = router;
