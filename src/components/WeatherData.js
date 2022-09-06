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

  // Set up Fahrenheit conversion, if necessary
  const city = props.weather?.name;
  const country = props.weather?.sys?.country;
  const countriesUsingF = ['US', 'BZ', 'BS', 'KY', 'LR', 'PW', 'FM', 'MH'];
  const tempUnit = countriesUsingF.includes(country) ? 'F' : 'C';
  
  const temperature = countriesUsingF.includes(country) ?
    props.weather?.main?.temp * 9 / 5 + 32: 
    props.weather?.main?.temp;

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
        text-black text-2xl font-medium
        flex flex-row justify-between items-center
      ">
        <div className="padding p-4">
        </div>
        <p className="temperature">
          <FontAwesomeIcon icon={faTemperatureThreeQuarters} />
          &nbsp;{Math.round(temperature)}&deg;{tempUnit}
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
        text-black font-medium
        text-base lg:text-lg 
        flex flex-row justify-center items-start
        lg:items-center
      ">
        <div className="location 
          flex flex-col items-center
          lg:flex-row 
        ">
          <FontAwesomeIcon icon={faLocationDot} />
          <div className="hidden lg:flex">&nbsp;</div>
          <div className="text-center">
            {city}, {country}
          </div>
        </div>
        <div className="humidity
          flex flex-col items-center
          lg:flex-row 
        ">
          <FontAwesomeIcon icon={faDroplet} />
          <div className="hidden lg:flex">&nbsp;</div>
          <div className="flex flex-row items-center">
            {Math.round(props.weather?.main?.humidity)}&nbsp;
            <FontAwesomeIcon icon={faPercent} />
          </div>
        </div>
        <div className="wind-speed 
          flex flex-col items-center
          lg:flex-row 
        ">
          <FontAwesomeIcon icon={faWind} />
          <div className="hidden lg:flex">&nbsp;</div>
          <div className="text-center">
            {Math.round(props.weather?.wind?.speed * 3.6)}&nbsp;km/h
          </div>
        </div>
        <div className="feels-like
          flex flex-col items-center
          lg:flex-row 
        ">
          <FontAwesomeIcon icon={faComment} />
          <div className="hidden lg:flex">&nbsp;</div>
          <div className="text-center">
            {props.weather?.weather[0]?.description}
          </div>
        </div>
      </div>
      }
    </>
  )
}