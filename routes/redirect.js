const express = require("express");
const router = express.Router();
const redirectController = require("../controllers/redirectController");

router.get("/:id", redirectController.get_id);

module.exports = router;
