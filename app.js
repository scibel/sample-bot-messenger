const bodyParser = require('body-parser');
const express = require('express');
const BotmeterLogger = require('botmeter-logger');
const request = require('request');

const messengerLogger = new BotmeterLogger({
  appId: process.env.APP_ID,
  appKey: process.env.APP_KEY,
}).messenger;

// This code code is mostly taken from
// developers.facebook.com/docs/messenger-platform/guides/quick-start/

const callSendAPI = (senderId, requestBody) => {
  const responseJson = {
    recipient: {
      id: senderId,
    },
    message: {
      text: 'Hello World',
    },
  };

  const response = {
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.MESSENGER_PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: responseJson,
  };

  request(response, () => {
    // Function that logs into Botmeter
    messengerLogger.logDocument(requestBody, responseJson, (e, r) => {
      if (e) {
        console.log('BOTMETER ERROR: ', e);
      } else {
        console.log('BOTMETER LOGGING: ', r);
      }
    });
  });
};

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/webhook', (req, res) => {
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === process.env.MESSENGER_VALIDATION_TOKEN
  ) {
    console.log('Validating webhook');
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  const data = req.body;
  if (data.object === 'page') {
    data.entry.forEach((pageEntry) => {
      pageEntry.messaging.forEach((messagingEvent) => {
        if (messagingEvent.message) {
          callSendAPI(messagingEvent.sender.id, messagingEvent.message.text);
        }
      });
    });
    res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Node app is running on port', PORT);
});

module.exports = app;
