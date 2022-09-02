export default function WeatherData(props) {
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