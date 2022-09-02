import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTemperatureThreeQuarters, 
  faAngleDown, 
  faAngleUp, 
  faDroplet,
  faPercent,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons'

import Map from "./Map";

export default function WeatherData(props) {
  // Set up state for opened or closed expanded weather data
  const [open, setOpen] = useState(false);
  const [retrievedLoc, setRetrievedLoc] = useState("");

  const temperature = props.weather?.main?.temp;
  const lat = props.weather?.coord?.lat;
  const lon = props.weather?.coord?.lon;

  useEffect(() => {
    getLocation(lat, lon);
  
  }, [lat, lon]);

  // Fetch OpenWeather's name of city based on actual weather data found
  function getLocation(lat, lon) {
    fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&${lon}&limit=1&appid=${process.env.REACT_APP_WEATHER}`
    )
      .then((locationRes) => {
        console.log("Location data first", locationRes)
        if (locationRes.ok) {
          return locationRes.json();
        } else {
          throw new Error("Error occurred when fetching location name");
        }
      })
      .then((locationData) => {
        console.log("Location data:", locationData);
        setRetrievedLoc(locationData[0]?.name);
      })
      .catch((error) => console.log(error));

  }

  // Conditional return based on whether or not weather data is loaded
  if (typeof temperature !== 'number' || Number.isNaN(temperature)) {
    return (
      <>
      </>
    )
  }
  return (
    <>
      <div className="app-data
        py-6 px-auto w-full
        text-black text-2xl
        flex flex-row justify-between items-center
      ">
        <div className="padding p-4">
        </div>
        <p className="temperature">
          <FontAwesomeIcon icon={faTemperatureThreeQuarters} />
          &nbsp;{Math.round(temperature)}&deg;C
        </p>
        {!open &&
        <FontAwesomeIcon icon={faAngleDown} className="weather-open-arrow" 
          onClick={(e) => setOpen(true)}
        />
        }
        {open &&
        <FontAwesomeIcon icon={faAngleUp} className="weather-close-arrow" 
          onClick={(e) => setOpen(false)}
        />
        }
      </div>
      {open &&
      <div className="app-data-expanded
        pb-6 w-full
        text-black text-lg font-medium
        flex flex-row justify-center items-center
      ">
        <div className="temperature-expanded">
          <FontAwesomeIcon icon={faLocationDot} />&nbsp;
          {retrievedLoc}
          <FontAwesomeIcon icon={faDroplet} />&nbsp;
          {Math.round(props.weather?.main?.humidity)}&nbsp;
          <FontAwesomeIcon icon={faPercent} />
        </div>
      </div>
      }
    </>
  )
}