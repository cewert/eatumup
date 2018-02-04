# Eat Um Up Twitter Bot

### Prerequisites

* [Node.js](https://nodejs.org)
* [NPM](https://www.npmjs.com/) (Comes with Node.js)

## Installing

1. Clone the repo folder to your local machine and open it up
```
git clone https://github.com/cewert/eatumup.git
cd eatumup
```
2. Use NPM to install app dependencies
```
npm install
```
3. Open **default-config.js** and replace all instances of CHANGEME to your [Twitter API credentials](https://apps.twitter.com).
```
module.exports = {
    consumer_key: 'CHANGEME',
    consumer_secret: 'CHANGEME',
    access_token: 'CHANGEME',
    access_token_secret: 'CHANGEME',
    timeout_ms: 60*1000, // optional HTTP request timeout to apply to all requests.
};
```
4. When finished modifying default-config.js, save file as **config.js**

## Deployment

Tell Node to run app.js
```
node app.js
```

## Built With

* [Node.js](https://nodejs.org)
* [NPM](https://www.npmjs.com/)
* [twit](https://github.com/ttezel/twit) - Twitter API Client for Node.js
* [Visual Studio Code](https://code.visualstudio.com/) - Text editor








