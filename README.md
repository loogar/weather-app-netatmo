### Front-End Developer Interview Challenge


## Goal
The goal of this exercise is to develop a weather widget app using netatmo's Weather map public API. 


## Installation

- Run the following command on your terminal to clone the repo into your local directory.

``` 
git clone https://github.com/loogar/weather-app-netatmo.git
```
## Project setup
```
yarn install
```

## To create a AccessToken and run locally
- you need to create third app from https://dev.netatmo.com/. 
- You will need to create a netatmo account and then an application (https://dev.netatmo.com/apps/)
- You need client_id, client_secret, username, password to run this app .
- You need to create and .env file and copy the contents from .env.example
- Give all these(client_id, client_secret, username, password ) infos.


### Compiles and hot-reloads for development
```
yarn start
```


## Languages and libraries

- React.js
- Chakra UI
- Vercel

## Features Used

- Responsive Design
- React Hooks
- Custom  Hooks (useGetAccessToken, useGetWeatherData)
- Context API

## API Documentation:

The API  used  was netatmo's weather map public API.
API used: https://api.netatmo.net/api/getpublicdata
documentation:  https://dev.netatmo.com/apidocumentation/weather#getpublicdata

## Deployment:
Project is deployed on vercel link : https://weather-app-netatmo.vercel.app/
