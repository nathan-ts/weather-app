export default function WeatherData(props) {
  if (typeof props.weather?.main?.temp === 'number' && !Number.isNaN(props.weather?.main?.temp)) {
    return (
      <div className="app-data
        flex flex-row justify-center
      ">
        <p className="temperature
          py-6 px-auto
          text-black text-3xl
        ">
          Current Temparature: {Math.round(props.weather?.main?.temp)} &deg;C
        </p>
      </div>
    )
  }
  return (
    <>
    </>
  )
}