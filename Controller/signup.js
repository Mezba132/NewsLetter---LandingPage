const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + '/signup.html')
})

app.post("/", (req, res) => {
  // From signup Html
  const fn = req.body.fname;
  const ln = req.body.lname;
  const mail = req.body.email;

// Check here -- https://mailchimp.com/developer/api/marketing/lists/batch-subscribe-or-unsubscibe/
  const data = {
    members: [{
      email_address: mail,
      status: "subscribed",
      merge_fields: {
        FNAME: fn,
        LNAME: ln
      }
    }]
  };

// The JSON.stringify() method converts a JavaScript object or value to a JSON string.
  const jsonData = JSON.stringify(data);

  const url = "https://us2.api.mailchimp.com/3.0/lists/6372cea042";
  const options = {
    method: "post",
    // auth: "USERNAME:PASSWORD"
    auth : "leomezba:79efa2cce0d950b2091f376a059de6f7-us2"
  }

// Check here -- https://nodejs.org/api/https.html#https_https_request_options_callback
  const request = https.request(url, options, (response) => {
    if(response.statusCode === 200)
    {
      res.sendFile(process.cwd() + "/success.html");
    }
    else
    {
      res.sendFile(process.cwd() + "/failure.html");
    }
    response.on("data", (data) => {
      console.log(JSON.parse(data));
      console.log(response.statusCode);
    })
  })

  request.write(jsonData);
  request.end();
})

// redirect page
app.post("/failure", (req, res) => {
  res.redirect("/")
})

module.exports = app;
