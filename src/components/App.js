import React, { useState } from "react";
import "./styles.css";
import "regenerator-runtime/runtime";

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "b0f9c77dda3c73af071e844da511aa79";

  const fetchWeather = () => {
    if (!query) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error(err));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="app">
      <h1>City Weather</h1>
      <input
        type="text"
        placeholder="Enter city name"
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={fetchWeather}>Search</button>

      {weather && weather.main ? (
        <div className="weather">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      ) : null}
    </div>
  );
}
