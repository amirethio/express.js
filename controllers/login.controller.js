const fsPromise = require("fs").promises;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const path = require("path");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;
const userDb = {
  users: require("./../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

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
    const userExist = userDb.users.find((data) => data.user == userName);
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
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "1d",
    });


    const otherUser = userDb.users.filter((data) => data.user !== userName);
    const currentUser = { ...userExist, refreshToken };
    userDb.setUser([...otherUser, currentUser]);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDb.users),
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).send(accessToken);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error ",
    });
  }
};

module.exports = { loginUser };


// {
//       success: true,
//       message: "logedin correctly",
//       data: {
//         access_token: accessToken,
//       },
//     }