const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const Routes = require('./routes.js');

var app = express();
// .use is for using middleware
app.use(urlencoded({ extended: false}));
app.use(function (req, res, next) {
  res.header("Content-Type",'text/xml');
  next();
});

// Main menu
app.post('/voice', Routes.mainMenu);

app.post('/gather', Routes.gather);

app.post('/menuTwo', Routes.menuTwo);

app.post('/testAPI', Routes.testAPICallback);


app.listen(3000, function(){console.log('App is running on port 3000')});