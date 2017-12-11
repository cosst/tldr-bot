# TL;DR Bot

A silly little bot that I created as a learning project. Responds to 280 character tweets with a variety of friendly yet biting TL;DR replies.

## Local Setup

1. Install [yarn](https://yarnpkg.com/en/).
2. Install yarn dependencies with `yarn install`
3. Create an app with [Twitter](https://apps.twitter.com/) and generate an access token.
4. Create a config.js file in the root of your project using the below template and add the necessary key/token/secret values from the Twitter app that you created in the previous step.

```
module.exports = {
  consumer_key: 'xxxxx',  
  consumer_secret: 'xxxxx',
  access_token: 'xxxxx',  
  access_token_secret: 'xxxxx'
}
```

## Running Locally

The bot is currently set to run every minute using node-cron until you manually stop it. It will log all of the 100 recent tweet results from each search to the console but only respond to 280 character tweets (excluding RTs or replies) from users with 200+ followers and a >1.49 follower-to-following ratio.

```
yarn start
```
