const express = require("express");
const router = express.Router();
const Register = require('./register.routes')
const login = require('./login.routes')



router.use("/register", Register);
router.use("/login", login);

module.exports = router;
