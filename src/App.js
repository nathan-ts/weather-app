import React, { useState, useEffect } from "react";
import "./App.css";

import WeatherData from "./components/WeatherData";
import SearchBar from "./components/SearchBar";
import Hero from "./components/Hero";

function App() {
  // States
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("toronto");
  const [photo, setPhoto] = useState([]);
  const [cloud, setCloud] = useState([]);


  // Run fetch and remove scroll bar on load
  useEffect(() => {
    getWeatherImage();
    getBackgroundImage();
    document.body.style.overflow = "hidden";
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
        const randImg = Math.floor(Math.random() * 10);
        setPhoto({
          img: data?.results[randImg]?.urls?.raw,
          name: data?.results[randImg]?.user?.name,
          username: data?.results[randImg]?.user?.username,
        });
      })
      .catch((error) => console.log(error));
  };

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
        const randImg = Math.floor(Math.random() * 10);
        setCloud({
          img: data?.results[randImg]?.urls?.raw,
          name: data?.results[randImg]?.user?.name,
          username: data?.results[randImg]?.user?.username,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div 
      style={{backgroundImage: `url(${cloud?.img})`}}
      className={`app 
        flex flex-col justify-center items-center
        min-h-screen w-screen
        bg-center bg-cover
        overflow-hidden
      `}
    >
      <div className="card
        p-12
        rounded-xl
        flex flex-col justify-center items-center
        w-auto h-auto
        max-h-screen
        shadow-2xl
        bg-slate-100/25
        backdrop-blur-lg
      ">
        <SearchBar getWeatherImage={getWeatherImage} location={location} setLocation={setLocation} />
        <WeatherData weather={weather} />
        <Hero photo={photo} />
      </div>
    </div>
  );
}

export default App;