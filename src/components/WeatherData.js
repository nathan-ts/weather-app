export default function WeatherData(props) {
  return (
    <div className="app__data">
    <p className="temperature
      m-1.5 text-slate-800
    ">
      Current Temparature: {Math.round(props.data.weather?.main?.temp)} &deg;C
    </p>
  </div>
  )
}