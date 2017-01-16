# Test-Bot for Facebook Messenger

This is an example of a Facebook Messenger bot in node.js, that will echo back any message sent by the user. Its primary use is to test message logging with the Botmeter analytics tool.

# Setup

Requirements :

A Facebook Page /
A Facebook App that is linked to the page.

The Facebook App needs to be provided with a Webhook (Left Panel -> Webhooks). This webhook can be retrieved from the platform on which the app is deployed. For local use, the app can be run using "node app.js" and a webhook can be created using ngrok (./ngrok http [localhost port]). 

# Logging

Logging is done using the botmeter-logger package, with a Botmeter logging URL :

var botmeterLogger = require('@botfuel/botmeter-logger')(process.env.BOTMETER_URL).facebook;

Due to the expected format of the messages (i.e. a docuemnt in the database contains both the user message and the bot response(s)), it is currently required that the user/bot messages be logged simultaneously with the botmeterLogger.logDocument(userMessage, botResponse, callback) function.
