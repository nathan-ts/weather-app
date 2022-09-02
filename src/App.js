import { useState, useEffect } from "react";
import "./App.css";

import WeatherData from "./components/WeatherData";
import SearchBar from "./components/SearchBar";
import Hero from "./components/Hero";
import Credits from "./components/Credits";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Method to get weather and image in two calls
  function getWeatherImage() {
    // Set up both promises (fetch API calls)
    const fetchWeather = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER}&units=metric`
    );
    const fetchUnsplash = fetch(
      `https://api.unsplash.com/search/photos?query=${location}&client_id=${process.env.REACT_APP_UNSPLASH}`
    );
    // Call Promise.all on both promises, progressing only if both resolve
    Promise.all([fetchWeather, fetchUnsplash])
      .then(([ weatherRes, unsplashRes ]) => {
        if (weatherRes.ok && unsplashRes.ok) {
          return Promise.all([ weatherRes.json(), unsplashRes.json() ]);
        } else {
          throw new Error("Error occurred when fetching weather/unsplash");
        }
      })
      .then(([ weatherData, unsplashData ]) => {
        console.log('OpenWeather API returned:', weatherData);
        setWeather(weatherData);
        console.log('Unsplash API returned:', unsplashData);
        const randImg = Math.floor(Math.random() * 10);
        setPhoto({
          img: unsplashData?.results[randImg]?.urls?.raw,
          name: unsplashData?.results[randImg]?.user?.name,
          username: unsplashData?.results[randImg]?.user?.username,
          alt_description: unsplashData?.results[randImg]?.user?.alt_description,
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
      .then((cloudData) => {
        console.log('Unsplash API CLOUD returned:', cloudData);
        const randImg = Math.floor(Math.random() * 10);
        setCloud({
          img: cloudData?.results[randImg]?.urls?.raw,
          name: cloudData?.results[randImg]?.user?.name,
          username: cloudData?.results[randImg]?.user?.username,
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
      <div className="bg-credits fixed bottom-1 right-1 z-50">
        <Credits photo={cloud}/>
      </div>
    </div>
  );
}

export default App;