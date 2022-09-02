export default function WeatherData(props) {
  if (typeof props.weather?.main?.temp === 'number' && !Number.isNaN(props.weather?.main?.temp)) {
    return (
      <div className="app__data">
        <p className="temperature
          py-2
          text-black text-xl
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