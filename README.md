# sample-bot-messenger

This is an example of a Facebook Messenger bot in node.js. It always answers `Hello World`. Its primary use is to test message logging with the Botmeter analytics tool.

## How to set up the bot's environment
In the command line execute the following commands:
```
git clone https://github.com/Botfuel/sample-bot-messenger.git
cd sample-bot-messenger
npm install
npm install -g ngrok
```

## How to run the bot on Facebook 
Follow these steps to launch the bot on Facebook:
  
* In order to create the bot on Facebook's side follow this [tutorial](https://developers.facebook.com/docs/messenger-platform/guides/quick-start/).  
* The`MESSENGER_VALIDATION_TOKEN` comes from Facebook for Developpers.
* The `BOTMETER_USER_KEY` comes from one of your bots in [BotMeter](https://dev.botmeter.io/).  
* Run the following commands:  
```
ngrok http 5000
MESSENGER_VALIDATION_TOKEN=<...> MESSENGER_PAGE_ACCESS_TOKEN=<...> BOTMETER_USER_KEY=<...> node app.js
```
* You have to decide on the `MESSENGER_VALIDATION_TOKEN`'s value, and use it for the webhook token in Facebook for Developpers.  
* The url you will use for the webhook will be the one provided by ngrok.   

