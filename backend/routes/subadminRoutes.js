const express = require("express");
const subadminController = require("../controllers/subadminController");
const router = express.Router();

router.post("/create", subadminController.create);

router.get("/get-all", subadminController.getAll);
router.post("/remove-subadmin", subadminController.removeSubadmin);
router.post("/signin", subadminController.signin);

module.exports = router;
