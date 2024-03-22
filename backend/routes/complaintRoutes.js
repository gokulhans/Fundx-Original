const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");

// GET all complaints
router.get("/", complaintController.getAll);

// GET complaint by ID
router.get("/:id", complaintController.getById);

// POST a new complaint
router.post("/", complaintController.create);

// UPDATE complaint by ID
router.put("/:id", complaintController.updateById);

// DELETE complaint by ID
router.delete("/:id", complaintController.deleteById);

module.exports = router;
