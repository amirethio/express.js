const express = require("express");
const path = require("node:path");
var cookieParser = require("cookie-parser");
require("dotenv").config();
const indexRoute = require("./routes/index.route");

const app = express();
const PORT = process.env.PORT || 3600;

// *MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(indexRoute);





app.get("/", (req, res) => {
  // res.sendFile('./views/index.html' , {root:__dirname})
  // res.sendFile( path.join(__dirname , "views" ,"index.html"));
  res.send("working");
});

app.listen(PORT, (err) => {
  console.log(`app is listening on port ${PORT}`);
});
