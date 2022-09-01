import React, { useState, useEffect } from "react";
import "./App.css";

import Link from "./components/Link";
import WeatherData from "./components/WeatherData";
import SearchBar from "./components/SearchBar";

function App() {
  // States
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("toronto");
  const [photo, setPhoto] = useState([]);
  const [cloud, setCloud] = useState([]);


  // Run getWeatherImage once on component load
  useEffect(() => {
    getWeatherImage();
    getBackgroundImage();
  }, []);

  // Method to get weather and image in two calls
  function getWeatherImage() {
    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER}&units=metric`
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
      `https://api.unsplash.com/search/photos?query=${location}&client_id=${process.env.REACT_APP_UNSPLASH}`
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
        setPhoto({
          img: data?.results[0]?.urls?.raw,
          name: data?.results[0]?.user?.name,
          username: data?.results[0]?.user?.username,
        });
      })
      .catch((error) => console.log(error));
  }

  function getBackgroundImage() {
    fetch(
      `https://api.unsplash.com/search/photos?query=cloud&client_id=${process.env.REACT_APP_UNSPLASH}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error occurred when fetching background image");
        }
      })
      .then((data) => {
        console.log('Unsplash API CLOUD returned:', data);
        setCloud({
          img: data?.results[0]?.urls?.raw,
          name: data?.results[0]?.user?.name,
          username: data?.results[0]?.user?.username,
        });
      })
      .catch((error) => console.log(error));
  }

  return (
    <div 
    style={{backgroundImage: `url(${cloud?.img})`}}
      className={`app 
      flex flex-col justify-center items-center
      min-h-screen w-screen
    `}>
      <div className="wrapper
        p-6 m-12
        border-0
        rounded-xl
        flex flex-col
        w-2/5 h-auto
        max-h-fit
        shadow-2xl
        bg-slate-300/25
        backdrop-blur-2xl
      ">
        <div className="search">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
        <SearchBar getWeatherImage={getWeatherImage} location={location} setLocation={setLocation} />
        <WeatherData weather={weather} />
        <img className="app__image
          w-auto 
          rounded-lg
          saturate-150
          " 
          src={photo?.img} alt="" 
        />
        <div className="credits pt-2 text-sm text-slate-500">
          <p>
            Photo by&nbsp;
            <Link url={`https://unsplash.com/@${photo?.username}?utm_source=weather_app&utm_medium=referral`}>
              {photo?.name}
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