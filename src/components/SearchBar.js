export default function SearchBar(props) {
  return (
    <form className="search 
        flex 
        flex-col justify-center items-center
        lg:flex-row lg:justify-between
        space-x-2
        w-full
      " 
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
          grow w-full
          p-2 
          rounded-md
          border border-solid border-gray-700
          bg-gray-200/40
        "
      />
      <input type="submit" 
        className="location_searcher
          m-2
          p-2
          text-white 
          bg-black/75
          border-0 rounded-md m-x-2
        " 
        value="Search Location"
      />
  </form>
  )
}