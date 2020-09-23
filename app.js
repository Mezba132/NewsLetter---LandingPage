const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

const route = require("./Controller/signup");
app.use(route);

// To make CSS and Images Public
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () =>
{
  console.log("Server is running on port 3000");
})
