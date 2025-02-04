import React, { useState } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "Sunny":
      return <WiDaySunny size={50} />;
    case "Cloudy":
      return <WiCloud size={50} />;
    case "Rainy":
      return <WiRain size={50} />;
    case "Snowy":
      return <WiSnow size={50} />;
    default:
      return <WiDaySunny size={50} />;
  }
};

const fetchWeatherData = (city: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        city,
        current: {
          temperature: Math.floor(Math.random() * 26),
          humidity: Math.floor(Math.random() * 101),
          windSpeed: Math.floor(Math.random() * 21),
          condition: ["Sunny", "Cloudy", "Rainy", "Snowy"][
            Math.floor(Math.random() * 4)
          ],
        },
        forecast: Array.from({ length: 5 }, (_, index) => ({
          day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][index],
          temperature: Math.floor(Math.random() * 26),
          condition: ["Sunny", "Cloudy", "Rainy", "Snowy"][
            Math.floor(Math.random() * 4)
          ],
        })),
      });
    }, 1000);
  });
};

export default function WeatherApp() {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState("");

  const fetchWeather = async () => {
    if (city.trim() === "") return;
    const data = await fetchWeatherData(city);
    setWeather(data);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Weather App
      </h2>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "8px",
            flex: "1",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            background: "#007bff",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      {weather && (
        <>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
              {weather.city}
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              {getWeatherIcon(weather.current.condition)}
              <div>
                <p>Temperature: {weather.current.temperature}°C</p>
                <p>Humidity: {weather.current.humidity}%</p>
                <p>Wind Speed: {weather.current.windSpeed} km/h</p>
              </div>
            </div>
          </div>
          <h3
            style={{ fontSize: "18px", fontWeight: "bold", marginTop: "24px" }}
          >
            Forecast
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            {weather.forecast.map((day: any, index: number) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  padding: "12px",
                  borderRadius: "8px",
                  textAlign: "center",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <p style={{ fontWeight: "bold" }}>{day.day}</p>
                {getWeatherIcon(day.condition)}
                <p>{day.temperature}°C</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
