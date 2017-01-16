# Test-Bot for Facebook Messenger

This is an example of a Facebook Messenger bot in node.js, that will echo back any message sent by the user. Its primary use is to test message logging with various bot analytics platforms (Dashbot.io, BotAnalytics, GetBotMetrics, Wordhop ...).

# Setup

Requirements :

A Facebook Page (currently https://www.facebook.com/Test-bot-msngr-1806491322945031/ ).
A Facebook App that is linked to the page (currently https://developers.facebook.com/apps/259085554509822/dashboard/ ).

The Facebook App needs to be provided with a Webhook (Left Panel -> Webhooks). This webhook can be retrieved from the platform on which the app is deployed (currently Heroku : https://test-bot-msngr.herokuapp.com/webhook). For local use, the app can be run using "node app.js" and a webhook can be created using ngrok (./ngrok http [localhost port]). 

Analytics :

Message logging on the aforementioned Analytics platforms is usually performed by loading the corresponding packages with an API key and a Page Acces Token that can be generated from the Facebook App dashboard.
Please refer to the respective platforms' SDK docs for further explanation.


# Credentials

The logging credentials for the analytics platforms can be found in the Google Drive sysadmin folder.

