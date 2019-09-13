![Cognifide logo](http://cognifide.github.io/images/cognifide-logo.png)

# AET
<p align="center">
  <img src="https://github.com/Cognifide/aet/blob/master/misc/img/aet-logo-black.png?raw=true"
         alt="AET Logo"/>
</p>

## Suite Generator

Client side application that can be used for generating *suite.xml* files used in AET testing. The app is written using React + Redux.

### Development environment

To run the app locally you need: 
* [Node.js][node-js] with [npm][npm-install] package manager
* Webpack installed globally: `npm i webpack -g`

#### Running web application locally

1. Navigate to app's main directory. 
2. Run `npm i` to install required npm modules.
3. To start the app run `npm start`

### Known bugs

1. URL `name` parameter is being ignored. 

[node-js]: https://nodejs.org/en/
[npm-install]: https://docs.npmjs.com/getting-started/installing-node#updating-npm
[docker install guide]: https://docs.docker.com/docker-for-windows/install/

## How to set up Dockerised version (WIP)

1. Install Docker Windows version - [docker install guide]. Ommit this step if already installed.
2. Navigate to app's main workspace folder.
3. Run `docker-compose up -d --build`

## User Guide

Please read the short description on how to use the basic features of the generator: 
