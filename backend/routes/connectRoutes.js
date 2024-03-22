const express = require("express");
const connectController = require("../controllers/connectController");
const router = express.Router();

router.post("/", connectController.create);
router.get("/:type/:id", connectController.getAllById);

module.exports = router;
