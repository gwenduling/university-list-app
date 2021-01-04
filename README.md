# University List App

This project uses the APIs of [University Domain List API](https://github.com/Hipo/university-domains-list-api) and [REST Countries](https://restcountries.eu/) to view a list of universities all over the world.

## Prerequisites

- git
- node with npm
- ts node

## Installing

1. Clone this repo using the command `git clone https://github.com/gwenduling/university-list-app.git`.
2. Go to the directory of the project and run `npm install`.
3. Type `npm start` to run the app locally to be viewed in `http://localhost:3000`.

## Available commands

### Install dependencies

`npm install`

### Run app locally

`npm start`

### Run server

`node server/server.js`

In production, update value of `NEWSLETTER_API_BASE` in src/data/constants.ts. It is currently set for local development in `http://localhost:4000`.

### Build for production

`npm run build`

Files can be found under the `build` folder.

### Running tests

`npm test`

Test coverage are set to be collected by default and can be found in `coverage/lcov-report/index.html`.

## Built With

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)

## Acknowledgements

- [RSCSS](https://rscss.io/)
- [example-react-app README.md](https://github.com/Piglacquer/example-react-app/blob/master/README.md)
- [PurpleBooth README.md gist](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

---

Still reading this? Awesome!

Hello, I am [Gwe](https://gwenduling.com)! This is actually a technical exam I needed to do for an awesome company. And it is my first time to work on React! Not out of strong opinions against it but because I didn't have the time.

Anyway I am glad I pushed myself to continue this exam because I was prolonging it for a month now. It is fun learning React. I find it as both similar and an opposite of Angular 🤪. There's still a lot of areas to learn, I know I have just encountered a tiny bit the last few days, specially about best practices. Here's to kickstarting the 2021 with something new 🍻!
