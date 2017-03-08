'use strict';

/*jslint unparam: true */

if (!(process.env.APP_SECRET && process.env.VALIDATION_TOKEN && process.env.PAGE_ACCESS_TOKEN)) {
  console.error("Missing config values");
  process.exit(1);
}

var callSendAPI;

// External Libraries

var
  bodyParser = require('body-parser'),
  express = require('express'),
  request = require('request');

// Including libraries for message logging

var botmeterApiUrl = 'http://botmeter-proxy-staging.herokuapp.com/';
var botmeter = require('@botfuel/botmeter-logger')(botmeterApiUrl, process.env.BOTMETER_USER_KEY).facebook;

// Defining ExpressJS app

var app = express();
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/webhook', function (req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function (pageEntry) {
      // Iterate over each messaging event
      pageEntry.messaging.forEach(function (messagingEvent) {
        if (messagingEvent.message) {
          callSendAPI(messagingEvent.message.text);
        }
      });
    });
    res.sendStatus(200);
  }
});

callSendAPI = function (originalRequest) {
  var requestData = {
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  };

  request(requestData, function (error, response, body) {
    // Botmeter user.bot message logging
    botmeterLogger.logDocument(originalRequest, messageData, function (e, d) {
      if (e) {
        console.log(e);
      } else {
        console.log(d);
      }
    });
  });
};

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;

/*jslint unparam: false */
