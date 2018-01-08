## Table of Contents

- [About the project](#about-the-project)
- [Running locally](#running-locally)
- [Unit testing the app](#unit-testing-the-app)
- [Further improvements](#further-improvements)

## About the project

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). `create-react-app` provides convenient bolierplate code that eases the ramp-up and speeds up the development.

Throughout this project I also used [Redux](https://redux.js.org), [Bootstrap (for React)](https://react-bootstrap.github.io/), [Sass](http://sass-lang.com/) and [Redux-logger](https://www.npmjs.com/package/redux-logger) (among others). It might sound look like an overkill for this exercise but I think that it's the right approach since they are becoming standards in the industry and it's always a good practice to use cutting-edge tools that can save development time and effort. Additionally, the applications become much more readable and mainteinable.

The Australia Post API is being proxied in AWS by using API Gateway. The configuration is not too complex and an export of it can be found in the folder `scripts`. It masks the API Key into AWS and that is a better and more secure approach than having it exposed into the client's side JS code.

## Running locally

In order to run locally, clone the project and run in command line:
```
npm install
```
Once the downloading of the packages finishes, it's time to run the application:
```
npm start
```
The app should boot up and open the default browser in `http://localhost:8000/`

Feel free to try different inputs and click validate to see how it performs.

## Unit testing the app

It might be neccessary to install mocha globally in order to have the command available:

```
npm install -g mocha
```

Once it's done, run the unit tests:

```
npm test
```

Some unit tests have been created to demostrate the integration with Mocha, Chai and Enzyme. The provided tests are far from exhaustive, but they serve as a good example of how to test a React component by leveraging [Enzyme](https://github.com/airbnb/enzyme), and how to test a simple helper class that performs the validations with the data that the API provides.

## Further improvements

The code and webapp is just a basic demostration of how to bootstrap a React application, create an online form and invoke a remote API. The API is wrapped into AWS' API Gateway and in a ideal scenario, such service should have better CORS configuration to allow only the production (or desired) servers to use it  in a webapp.

The application is responsive, although there is no much science in this level of responsiveness since the interface is really simple.