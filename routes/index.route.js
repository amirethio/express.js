const express = require("express");
const router = express.Router();
const Register = require("./register.routes");
const login = require("./login.routes");
const verifyJWT = require('./../middleware/verifyJWT.middleware')

router.use("/register", Register);
router.use("/login", login);





router.get("/get",verifyJWT , (req, res) => {
  res.status(200).json({
    messge: "hello",
  });
});



module.exports = router;
