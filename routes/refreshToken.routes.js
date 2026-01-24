const express = require("express");
const router = express.Router();

const {
  handleRefershToken,
} = require("./../controllers/refershToken.controller");

router.get("/", handleRefershToken);

module.exports = router;
