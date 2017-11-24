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

ngrok is a is a command line tool that allows you to expose a localhost port to the internet through a secure tunnel. We use it for convenience here so you don’t have to host your bot on a server.

## How to run the bot on Facebook 
Follow these steps to launch the bot on Facebook:

* In order to create the bot on Facebook's side follow this [tutorial](https://developers.facebook.com/docs/messenger-platform/guides/quick-start/).  
* The `MESSENGER_VALIDATION_TOKEN` and `MESSENGER_PAGE_ACCESS_TOKEN` come from Facebook for Developers.
* The `APP_ID` and `APP_KEY` parameters comes from one of your apps on [Botfuel Developer Portal](https://app.botfuel.io/).

* Run the following commands:  
```
ngrok http 5000
MESSENGER_VALIDATION_TOKEN=<...> MESSENGER_PAGE_ACCESS_TOKEN=<...> APP_ID=<...> APP_KEY=<...> node app.js
```
* You have to decide on the `MESSENGER_VALIDATION_TOKEN`'s value, and use it for the webhook token in Facebook for Developers.  
* The url you will use for the webhook will be the one provided by ngrok.   

## License

See the [LICENSE](LICENSE.md) file.
