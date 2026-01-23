const userDb = {
  users: require("./../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const fsPromise = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const newUserHandler = async (req, res) => {
  const { userName, password } = req.body;

  //  * check for missing pass or username
  if (!userName || !password) {
    return res.status(400).json({
      success: false,
      message: "username and password are required",
    });
  }

  //   *check for the duplicated username
  const duplicated = userDb.users.find((data) => data.user == userName);
  if (duplicated) {
    return res.status(409).json({
      success: false,
      message: "username already taken",
    });
  }
  if (password.trim().length < 8) {
    return res.status(422).json({
      success: false,
      message: "increase the length of the password",
    });
  }

  try {
    //   create table  and store name username with hashed password
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = { user: userName, password: hashedPass };
    userDb.setUser([...userDb.users, newUser]);

    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDb.users),
    );
    res.status(201).json({
      success: true,
      message: "registered sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error ",
    });
  }
};

module.exports = { newUserHandler };
