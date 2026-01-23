const usersData = require("./../model/users.json");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).json({
      success: false,
      message: "username and password are required",
    });
  }
  //   check if the user exist indb
  try {
    const userExist = usersData.find((data) => data.user == userName);
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const hashedPassword = userExist.password;

    const result = await bcrypt.compare(password, hashedPassword);
    if (result === false) {
      return res.status(401).json({
        success: false,
        message: "wrong password",
      });
    }

    // finally generating a token and sending to the user

    const payload = {
      name: userName,
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: "15m" });

    res.status(200).json({
      success: true,
      message: "logedin correctly",
      data: {
        token: token,
      },
    });
  } catch (error) {
   return res.status(500).json({
     success: false,
     message: "internal server error ",
   });
  }
};

module.exports = { loginUser };
