const express = require("express");
const path = require("node:path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3600;
const indexRoute = require("./routes/index.route");

app.use(express.json());

//  *Routes
app.use(indexRoute);

app.get("/", (req, res) => {
  // res.sendFile('./views/index.html' , {root:__dirname})
  // res.sendFile( path.join(__dirname , "views" ,"index.html"));
  res.send("working");
});

app.listen(PORT, (err) => {
  console.log(`app is listening on port ${PORT}`);
});
