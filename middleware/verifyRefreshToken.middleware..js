const express = require("express");
var jwt = require("jsonwebtoken");
const { ACCESS_SECRET_KEY } = process.env;

const verrifyRefreshToken = async (req, res, next) => {
  const {refreshToken} = req.cookies
  try {
    jwt.verify(refreshToken, ACCESS_SECRET_KEY);
    next()
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = verrifyRefreshToken;
