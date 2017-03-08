'use strict';

if (!(process.env.APP_SECRET && process.env.VALIDATION_TOKEN && process.env.PAGE_ACCESS_TOKEN)) {
  console.error("Missing config values");
  process.exit(1);
}

var
  bodyParser = require('body-parser'),
  express = require('express'),
  request = require('request');

var botmeterApiUrl = 'http://api.botmeter.io/';
var botmeter = require('@botfuel/botmeter-logger')(botmeterApiUrl, process.env.BOTMETER_USER_KEY).facebook;

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
  if (data.object === 'page') {
    data.entry.forEach(function (pageEntry) {
      pageEntry.messaging.forEach(function (messagingEvent) {
        if (messagingEvent.message) {
          callSendAPI(messagingEvent.sender.id, messagingEvent.message.text);
        }
      });
    });
    res.sendStatus(200);
  }
});

var callSendAPI = function (senderId, originalRequest) {
  var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      text: 'Hello World',
    }
  };
  var requestData = {
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  };

  request(requestData, function (error, response, body) {
    botmeter.logDocument(originalRequest, messageData, function (e, d) {
      if (e) {
        console.log('BOTMETER ERROR: ', e);
      } else {
        console.log('BOTMETER LOGGING: ', d);
      }
    });
  });
};

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
