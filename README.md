# sample-bot-messenger

This is an example of a Facebook Messenger bot in node.js, that will echo back any message sent by the user. Its primary use is to test message logging with the Botmeter analytics tool.

## Run the bot locally
Follow these steps to launch the bot example :
```
git clone https://github.com/Botfuel/sample-bot-messenger.git
cd sample-bot-messenger
npm install
BOTMETER_USER_KEY=<YOUR_USER_KEY> node app.js
APP_SECRET=[[YOUR_APP_SECRET]] VALIDATION_TOKEN=[[YOUR_VALIDATION_SECRET]] PAGE_ACCESS_TOKEN=[[YOUR_PAGE_ACCESS]] USER_KEY=[[YOUR_USER_KEY]] node app.js
```

(The APP_SECRET, VALIDATION_TOKEN and PAGE_ACCESS_TOKEN can be retrieved on the Facebook app page)

## Test the bot

Install ngrok and launch it :
```
npm install -g ngrok
ngrok http 5000
```
Provide your Facebook app with the URL provided by ngrok + "/webhook" (ex : https://10573be9.ngrok.io/webhook).

You should now be able to message your bot from the Facebook Page that is linked to your App.

