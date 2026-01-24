var jwt = require("jsonwebtoken");
const verrifyRefreshToken = require("./../middleware/verifyRefreshToken.middleware.");

const { ACCESS_SECRET_KEY } = process.env;
const userData = require("./../model/users.json")


const handleRefershToken = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token missing" });
  }
  const userName = verrifyRefreshToken(refreshToken);

  if (!userName) {
    res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  } else {
    const userExist = userData.users.find((data) => data.user === userName);
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const payload = {
      name: userName,
    };

    try {
      const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "30s" });
      res.status(200).json({
        success: true,
        message: "new toekn issued",
        data: {
          access_token: accessToken,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "internal server error ",
      });
    }
  }
};

module.exports = { handleRefershToken };
