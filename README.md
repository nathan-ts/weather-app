# Weather App

This is a simple weather app built in React. 

Inspired by [Sonny](https://medium.com/sonny-sangha). 

## Purpose 

To learn about React and API calls. 

## Live Demo

Please visit [weather.nathantsang.dev](weather.nathantsang.dev) for a live demo of the site.

## Project Setup
- Node version: 16
- Install dependences: `npm i`
- Sign up for API keys for [OpenWeather](https://openweathermap.org/home/sign_up) and [Unsplash](https://unsplash.com/join).
  - Copy the `.env.example` file and rename to `.env`
  - Update `.env` with your API keys
- Run site in dev mode: `npm start`
- Create production build: `npm run build`

## Tech Stack
- [React.js](https://reactjs.org/)
- [Node.js V16](https://nodejs.org/dist/latest-v16.x/docs/api/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenWeather API](https://openweathermap.org/api)
- [Unsplash API](https://unsplash.com/developers)
- [Geo IP Lookup](https://geoiplookup.io/)


## To do
- Set cookie to save last searched location
- Fallback to HTML Geolocation API if third-party doesn't work (e.g., adblock)
- Have unit of measurement for temperature adjust based on location