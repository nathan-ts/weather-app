export default function SearchBar(props) {
  return (
    <div className="search">
    <input
      type="text"
      value={props.locations}
      onChange={(e) => props.setLocations(e.target.value)}
      placeholder="Enter location"
      className="location_input
        p-2 
        border border-solid border-gray-700
        rounded-md
      "
    />
    <button className="location_searcher
      p-2 text-white bg-black border-0 rounded-md m-x-2
      " 
      onClick={props.getWeatherImage}
    >
      Search Location
    </button>
  </div>
  )
}