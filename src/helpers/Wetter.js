import React, { useState, useEffect } from "react";
import axios from "axios";


function Wetter() {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [condition, setCondition] = useState("");

  useEffect(  () => {
    const apiKey = "129ea65ea4755804cae8b29854e93e2f";
    const city = "Hamburg";

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setLocation(response.data.name);
        setTemperature(response.data.main.temp);
        setCondition(response.data.weather[0].description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>{location}</h1>
      <p>{temperature}°C</p>
      <p>{condition}</p>
    </div>
  );
}

export default Wetter;
