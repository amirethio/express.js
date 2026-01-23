const express = require("express");
const router = express.Router();
const { newUserHandler } = require("./../controllers/register.controller");

router.post("/", newUserHandler);

module.exports = router;
