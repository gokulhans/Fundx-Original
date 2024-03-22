const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// GET all feedback
router.get("/", feedbackController.getAll);

// GET feedback by ID
router.get("/:id", feedbackController.getById);

// POST new feedback
router.post("/", feedbackController.create);

// UPDATE feedback by ID
router.put("/:id", feedbackController.updateById);

// DELETE feedback by ID
router.delete("/:id", feedbackController.deleteById);

module.exports = router;
