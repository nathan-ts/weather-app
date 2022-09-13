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
  const [coords, setCoords] = useState({
    lat: 43.6534817,
    lon: -79.3839347
  });
  const [photo, setPhoto] = useState([]);
  const [cloud, setCloud] = useState([]);

  // Run fetch and remove scroll bar on load
  useEffect(() => {
    document.title = 'Weather';
    document.body.style.overflow = "hidden";
    // Chain promises to ensure location is retrieved first before weather
    getLocation()
      .then(() => {
        getWeatherImage();
      })
      .then(() => {
        getBackgroundImage();
      })
      .catch((error) => console.log(error));
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get location if coordinates set and location is blank
  useEffect(() => {
    if (!location) {

    }
  }, [coords])

  // Get weather and image in separate API calls
  function getWeatherImage() {
    // Set up promises (fetch API calls)
    const fetchWeather = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER}&units=metric`
    );
    const fetchGeocode = fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.REACT_APP_WEATHER}`
    );
    const fetchUnsplash = fetch(
      `https://api.unsplash.com/search/photos?query=${location}&client_id=${process.env.REACT_APP_UNSPLASH}`
    );
    // Call Promise.all on both promises, progressing only if both resolve
    return Promise.all([fetchWeather, fetchUnsplash])
      .then(([ weatherRes, unsplashRes ]) => {
        if (weatherRes.ok && unsplashRes.ok) {
          return Promise.all([ weatherRes.json(), unsplashRes.json() ]);
        } else {
          throw new Error("Error occurred when fetching weather/unsplash");
        }
      })
      .then(([ weatherData, unsplashData ]) => {
        // console.log('OpenWeather API returned:', weatherData);
        setWeather(weatherData);
        // console.log('Unsplash API returned:', unsplashData);
        // Get random image from index 0-9 (since API default is 10 results returned)
        const randImg = Math.floor(Math.random() * 10);
        setPhoto({
          img: unsplashData?.results[randImg]?.urls?.raw + "&w=800",
          name: unsplashData?.results[randImg]?.user?.name,
          username: unsplashData?.results[randImg]?.user?.username,
          alt_description: unsplashData?.results[randImg]?.user?.alt_description,
        });
      })
      .catch((error) => console.log(error));
  };

  function getBackgroundImage() {
    return fetch(
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
        // console.log('Unsplash API CLOUD returned:', cloudData);
        // Get random image from index 0-9 (since API default is 10 results returned)
        const randImg = Math.floor(Math.random() * 10);
        setCloud({
          img: cloudData?.results[randImg]?.urls?.raw + "&w=2160",
          name: cloudData?.results[randImg]?.user?.name,
          username: cloudData?.results[randImg]?.user?.username,
        });
      })
      .catch((error) => console.log(error));
  };

  // Gets location by IP address (falls back to Geolocation API if IP fails)
  function getLocation() {
    return fetch(`
    https://json.geoiplookup.io/
    `)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          getGeolocation();
        }
      })
      .then((locData) => {
        console.log('Geo IP Lookup API returned:', locData);
        setCoords({
          lat: locData?.latitude,
          lon: locData?.longitude,
        });
        setLocation(`${locData.city}, ${locData.region}, ${locData.country_name}`);
      })
      .catch((error) => {
        console.log(error); 
        // If GeoIPLookup.io is blocked or fails to connect, fall back to Geolocation
        return getGeolocation();
      });
  }

  // Use browser's geolocation API and OpenWeather to lookup city based on coords
  function getGeolocation() {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(getCityByCoords);
    } 
    // If geolocation not supported
    return null;
  }
  function getCityByCoords(position) {
    return fetch(`
      https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${process.env.REACT_APP_WEATHER}
    `)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error occurred when looking up city by coords");
        }
      })
      .then((cityData) => {
        console.log('OpenWeather Geocode API returned:', cityData);
        setCoords({
          lat: cityData[0]?.lat,
          lon: cityData[0]?.lon,
        });
        setLocation(`${cityData[0]?.name}, ${cityData[0]?.country}`);
      })
      .catch((error) => console.log(error));
  }

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
        w-full
        lg:w-auto 
        min-w-2/5
        h-3/4
        max-h-screen
        shadow-2xl
        bg-slate-100/40
        backdrop-blur-3xl
      ">
        <SearchBar getWeatherImage={getWeatherImage} location={location} setLocation={setLocation} />
        <WeatherData weather={weather} />
        <Hero photo={photo} />
      </div>
      <div className="bg-credits fixed bottom-4 right-4 z-50">
        <Credits photo={cloud}/>
      </div>
    </div>
  );
}

export default App;