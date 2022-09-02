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
      flex flex-row justify-center
    ">
      <p className="temperature
        py-6 px-auto
        text-black text-3xl
      ">
        Current Temperature: {Math.round(temperature)} &deg;C
      </p>
    </div>
  )
}