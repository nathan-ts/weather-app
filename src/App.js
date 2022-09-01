// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import React, { useState, useEffect } from "react";
import "./App.css";
// dotenv.config();

function App() {
  // States
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("toronto");
  const [photos, setPhotos] = useState([]);

  // Run getWeatherImage once on component load
  useEffect(() => {
    getWeatherImage();
  }, []);

  // Method: if
  function getWeatherImage() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&appid=${process.env.REACT_APP_WEATHER}&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("An error occurred - wrong location!");
          }
          alert("An error occurred!");
          throw new Error("Error occurred when fetching weather");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=${process.env.REACT_APP_UNSPLASH}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error occurred when fetching image");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={getWeatherImage}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">Current Temparature: {weather?.main?.temp}</p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;