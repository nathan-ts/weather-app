import Credits from "./Credits";

export default function Hero(props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <img className="app-img
        object-cover
        w-full
        max-w-3xl
        h-full
        max-h-128
        rounded-lg
        saturate-150 " 
        src={props.photo?.img} alt={props.photo?.alt_description} 
      />
      <Credits photo={props.photo}/>
    </div>
  )
};