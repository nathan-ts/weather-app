import React, { useState, useEffect } from "react";
import "./App.css";

import Link from "./components/Link";
import WeatherData from "./components/WeatherData";

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
    <div className={`app 
      flex flex-col justify-center items-center
      min-h-screen w-screen
      bg-slate-400
    `}>
      <div className="wrapper
        p-6
        border-0
        rounded-xl
        flex flex-col
        w-2/5 h-auto
        shadow-lg 
      ">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input
              p-2 
              border border-solid border-gray-700
              rounded-md
            "
          />
          <button className="location_searcher
            p-2 text-white bg-black border-0 rounded-md m-x-2
            " 
            onClick={getWeatherImage}
          >
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temperature
            m-1.5 text-slate-800
          ">
            Current Temparature: {Math.round(weather?.main?.temp)} &deg;C
          </p>
        </div>
        <WeatherData weather={weather} />
        <img className="app__image
          w-auto rounded-lg
          " 
          src={photos} alt="" 
        />
        <div className="credits">
          <p>
            Photo by&nbsp;
            <Link url={`https://unsplash.com/@${photographer?.username}?utm_source=weather_app&utm_medium=referral`}>
              {photographer?.name}
            </Link>
            &nbsp;on&nbsp;
            <Link url={`https://unsplash.com/?utm_source=weather_app&utm_medium=referral`}>
              Unsplash
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;