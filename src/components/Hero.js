import Credits from "./Credits";

export default function Hero(props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <img className="app-img
        object-cover
        w-full
        max-w-2xl
        h-full
        max-h-128
        rounded-lg
        saturate-150 " 
        src={props.photo?.img} alt="" 
      />
      {/* <div className="credits pt-2 text-sm text-slate-700">
        <p>
          Photo by&nbsp;
          <Link url={`https://unsplash.com/@${props.photo?.username}?utm_source=weather_app&utm_medium=referral`}>
            {props.photo?.name}
          </Link>
          &nbsp;on&nbsp;
          <Link url={`https://unsplash.com/?utm_source=weather_app&utm_medium=referral`}>
            Unsplash
          </Link>
        </p>
      </div> */}
      <Credits photo={props.photo}/>
    </div>
  )
};