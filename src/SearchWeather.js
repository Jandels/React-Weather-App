import React, { useState } from "react";
import axios from "axios";
import "./SearchWeather.css";

export default function SearchWeather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    console.log(response.data);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(city);
    let apiKey = "692e81252347f5426b1d20da827a7848";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="mb-3">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a City"
          className="form-control"
          onChange={updateCity}
        />
      </form>
      <button type="submit" class="btn btn-primary">
        Search
      </button>
    </div>
  );

  if (loaded) {
    return (
      <div className="SearchWeather">
        <h1>Weather Forecast</h1>
        {form} <br /> <br />
        <h3> {city} </h3>
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
        </ul>
        <img src={weather.icon} alt={weather.description} />
        <a href="https://github.com/Jandels/React-Weather-App">
          Open Source Code
        </a>
        by Jandels hosted on Netlify
      </div>
    );
  } else {
    return (
      <div className="SearchWeather">
        <h1>Weather Forecast</h1> {form}
      </div>
    );
  }
}
