const express = require("express");
var jwt = require("jsonwebtoken");
const { ACCESS_SECRET_KEY } = process.env;

const verifyJWT = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  jwt.verify(accessToken, ACCESS_SECRET_KEY, (err, decoded) => {
    if (err) {
      if ("jwt expired" === err.message) {
        return res.status(401).json({
          success: false,
          message: "Access token expired",
        });
      } else {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired token",
        });
      }
    } else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = verifyJWT;
