import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTemperatureThreeQuarters, 
  faAngleDown, 
  faAngleUp, 
  faDroplet,
  faPercent,
  faLocationDot, 
  faComment, 
  faWind
} from '@fortawesome/free-solid-svg-icons'

// import Map from "./Map";

export default function WeatherData(props) {
  // Set up state for opened or closed expanded weather data
  const [open, setOpen] = useState(false);

  const temperature = props.weather?.main?.temp;

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
        space-x-5
        text-black text-lg font-medium
        flex flex-row justify-center items-center
      ">
        <div className="location">
          <FontAwesomeIcon icon={faLocationDot} />&nbsp;
          {props.weather?.name}
        </div>
        <div className="humidity">
          <FontAwesomeIcon icon={faDroplet} />&nbsp;
          {Math.round(props.weather?.main?.humidity)}&nbsp;
          <FontAwesomeIcon icon={faPercent} />
        </div>
        <div className="wind-speed">
          <FontAwesomeIcon icon={faWind} />&nbsp;
          {Math.round(props.weather?.wind?.speed * 3.6)} km/h
        </div>
        <div className="feels-like">
          <FontAwesomeIcon icon={faComment} />&nbsp;
          {props.weather?.weather[0]?.description}
        </div>
      </div>
      }
    </>
  )
}