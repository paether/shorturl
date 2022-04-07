const express = require("express");
const router = express.Router();
const shorturlController = require("../controllers/shorturlController");

router.get("/", shorturlController.get_root);

router.post("/create", shorturlController.post_create);

module.exports = router;
