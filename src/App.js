import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("toronto");
  const [photos, setPhotos] = useState([]);

  return <div>Making weather app, please standby...</div>;
}

export default App;