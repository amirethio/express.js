const fsPromise = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");

const userDb = {
  users: require("./../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const logoutHandler = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token missing" });
  }
  try {
    const currentUser = userDb.users.filter(
      (data) => data.refreshToken !== refreshToken,
    )[0];
    if (!currentUser) {
      res.clearCookie("refreshToken");
      return res
        .status(201)
        .json({ success: true, message: "logged out sucesssfully" });
    }
    const otherUser = userDb.users.filter(
      (data) => data.refreshToken !== refreshToken,
    );
    userDb.setUser([
      ...otherUser,
      { user: currentUser.user, password: currentUser.password },
    ]);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDb.users),
    );
    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "logged out sucessfully ",
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = { logoutHandler };
