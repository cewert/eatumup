# Eat Um Up Twitter Bot

### Prerequisites

[Node.js](https://nodejs.org)
[NPM](https://www.npmjs.com/) (Comes with Node.js)

### Installing

Clone the repo to your local machine
```
git clone https://github.com/cewert/eatumup.git
```
Open **default-config.js** and insert your Twitter API credentials.
```
// These keys are obtained from Twitter @ https://apps.twitter.com
module.exports = {
    consumer_key: 'CHANGEME',
    consumer_secret: 'CHANGEME',
    access_token: 'CHANGEME',
    access_token_secret: 'CHANGEME',
    timeout_ms: 60*1000, // optional HTTP request timeout to apply to all requests.
};
```
Save As **config.js**

## Deployment

Open a command prompt (or terminal) from the app's root directory and tell Node to run app.js
```
node app.js
```

## Built With

* [Node.js](https://nodejs.org) - the latest LTS version
* [NPM](https://www.npmjs.com/) - Comes with Node.js
* [twit](https://github.com/ttezel/twit) - Node.js module to access the Twitter API
* [Visual Studio Code](https://code.visualstudio.com/) - Text editor








