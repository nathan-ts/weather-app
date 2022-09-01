// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import React, { useState, useEffect } from "react";
import "./App.css";
// dotenv.config();

function App() {
  // States
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("toronto");
  const [photos, setPhotos] = useState([]);
  const [photographer, setPhotographer] = useState([]);


  // Run getWeatherImage once on component load
  useEffect(() => {
    getWeatherImage();
  }, []);

  // Method to get weather and image in two calls
  function getWeatherImage() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&appid=${process.env.REACT_APP_WEATHER}&units=metric`
    )
      .then((res) => {
        if (res.ok) {
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
        console.log('OpenWeather API returned:', weather);
        setWeather(object);
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
        console.log('Unsplash API returned:', data);
        setPhotos(data?.results[0]?.urls?.raw);
        setPhotographer({
          name: data?.results[0]?.user?.name,
          username: data?.results[0]?.user?.username,
        });
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
        <div className="credits">
          <p>
            Photo by 
            <a href={`https://unsplash.com/@${photographer.username}?utm_source=weather_app&utm_medium=referral`}>
              {photographer.name}
            </a>
            on 
            <a href="https://unsplash.com/?utm_source=weather_app&utm_medium=referral">Unsplash</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;