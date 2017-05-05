# sample-bot-messenger

This is an example of a Facebook Messenger bot in node.js. It always answers `Hello World`. Its primary use is to test message logging with the Botmeter analytics tool.

## How to Run the bot locally
Follow these steps to launch the bot on Facebook:
```
git clone https://github.com/Botfuel/sample-bot-messenger.git
cd sample-bot-messenger
npm install
npm install -g ngrok
ngrok http 5000
MESSENGER_VALIDATION_TOKEN=<...> MESSENGER_PAGE_ACCESS_TOKEN=<...> BOTMETER_USER_KEY=<...> node app.js
```
Note:  
In order to create the bot on Facebook's side follow this [tutorial](https://developers.facebook.com/docs/messenger-platform/guides/quick-start/).  
You have to decide on the `MESSENGER_VALIDATION_TOKEN`'s value, and use it for the webhook token in Facebook for Developpers.
The url you will use for the webhook will be the one provided by ngrok. 
The `BOTMETER_USER_KEY` comes from one of your bots in [BotMeter](https://dev.botmeter.io/).  

## Test the bot

Install ngrok and launch it :
```
npm install -g ngrok
ngrok http 5000
```
Provide your Facebook app with the URL provided by ngrok + "/webhook" (eg. https://10573be9.ngrok.io/webhook).

You should now be able to message your bot from the Facebook Page that is linked to your App.
