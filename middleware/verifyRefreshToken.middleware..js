var jwt = require("jsonwebtoken");
const { REFRESH_SECRET_KEY } = process.env;

const verrifyRefreshToken = (refreshToken) => {
  try {
    console.log();
    
    const decode = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    return decode.name;
  } catch (error) {
    console.log(error);

    return null;
  }
};

module.exports = verrifyRefreshToken;
