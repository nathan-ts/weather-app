import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import Map from "./Map";

export default function WeatherData(props) {
  

  // Conditional return based on whether or not weather data is loaded
  const temperature = props.weather?.main?.temp;
  if (typeof temperature !== 'number' || Number.isNaN(temperature)) {
    return (
      <>
      </>
    )
  }
  return (
    <div className="app-data
      py-6 px-auto w-full
      flex flex-row justify-between items-center
    ">
      <div className="padding p-4">
      </div>
      <p className="temperature
        text-black text-2xl
      ">
        <FontAwesomeIcon icon={faTemperatureThreeQuarters} />
        : {Math.round(temperature)}&deg;C&nbsp;
      </p>
      <FontAwesomeIcon icon={faAngleDown} className="weather-open-arrow
        text-black text-2xl" 
        // onClick={}
      />
    </div>
  )
}