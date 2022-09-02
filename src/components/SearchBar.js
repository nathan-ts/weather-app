export default function SearchBar(props) {
  return (
    <form className="search" 
      onSubmit={(e) => {
        e.preventDefault();
        props.getWeatherImage();
      }}
    >
      <input
        type="text"
        value={props.location}
        onChange={(e) => props.setLocation(e.target.value)}
        placeholder="Enter location"
        className="location_input
          p-2 
          border border-solid border-gray-700
          rounded-md
        "
      />
      <input type="submit" 
        className="location_searcher
        p-2 text-white bg-black border-0 rounded-md m-x-2" 
        // onClick={props.getWeatherImage}
        value="Search Location"
      />
  </form>
  )
}