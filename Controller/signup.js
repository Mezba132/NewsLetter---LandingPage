const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("home");
})

app.post("/", (req, res) => {

  // From signup Html
  const fn = req.body.fname;
  const ln = req.body.lname;
  const mail = req.body.email;
  const pNumber = req.body.phone;

  // Check here -- https://mailchimp.com/developer/api/marketing/lists/batch-subscribe-or-unsubscibe/
  const data = {
    members: [{
      email_address: mail,
      status: "subscribed",
      merge_fields: {
        FNAME: fn,
        LNAME: ln,
        PHONE: pNumber
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
      res.render("success");
    }
    else
    {
      res.render("failure");
    }
    // response.on("data", (data) => {
    //   console.log(JSON.parse(data));
    //   console.log(response.statusCode);
    // })
  })

  request.write(jsonData);
  request.end();
})

// redirect page
app.post("/failure", (req, res) => {
  res.redirect("/")
})

module.exports = app;
