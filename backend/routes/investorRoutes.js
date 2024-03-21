const express = require("express");
const router = express.Router();
const investorController = require("../controllers/investorController");

// GET all investors
router.get("/", investorController.getAll);

// GET investor by ID
router.get("/:id", investorController.getById);

// POST a new investor
router.post("/", investorController.create);

// UPDATE investor by ID
router.put("/:id", investorController.updateById);

// DELETE investor by ID
router.delete("/:id", investorController.deleteById);

module.exports = router;
