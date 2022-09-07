import Credits from "./Credits";

export default function Hero(props) {
  return (
    <>
      <img className="app-img
        object-cover
        w-full
        h-fit
        max-h-96
        lg:max-h-128
        rounded-lg
        saturate-150 " 
        src={props.photo?.img} alt={props.photo?.alt_description} 
      />
      <Credits photo={props.photo}/>
    </>
  )
};