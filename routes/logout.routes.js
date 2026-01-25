const express = require("express");
const router = express.Router();
const { logoutHandler } = require("./../controllers/logout.controller");

router.get("/", logoutHandler);

module.exports = router;
