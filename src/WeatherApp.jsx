import SearchBox from "./SearchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import { useState, useEffect } from "react";
import Forecast from "./Forecast.jsx";

function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Delhi",
    feelsLike: 26.38,
    humidity: 28,
    temp: 27.05,
    tempMax: 27.05,
    tempMin: 27.05,
    weather: "haze",
  });

  const [forecast, setForecast] = useState([]);

 

  useEffect(() => {
  getForecast(weatherInfo.city);
}, []);

 const API_KEY = "0a370bcf325a278908786bd0868ff2b6";

  // 🔥 ADD THIS FUNCTION
  const getForecast = async (city) => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    let data = await response.json();

    let dailyData = data.list.filter((item, index) => index % 8 === 0);

    let result = dailyData.map((item) => ({
      date: item.dt_txt,
      temp: item.main.temp,
      weather: item.weather[0].description,
    }));

    setForecast(result);
  };

  
  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
    getForecast(newInfo.city); 
  };

  const [currentTime, setCurrentTime] = useState(
  new Date().toLocaleTimeString()
);

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 1000);

  return () => clearInterval(timer);
}, []);

  return (
  <div style={{
  textAlign: "center",
  transform: "scale(0.9)",
  minHeight: "100vh", 
}}>
     <h1 style={{
  marginTop: "2px",   
  marginBottom: "15px",
  fontSize: "36px",
  fontWeight: "bold",
  color: "#222"
}}>
       {weatherInfo.weather.includes("rain") ? "🌧️" :
 weatherInfo.weather.includes("cloud") ? "☁️" :
 "☀️"} Smart Weather Dashboard
      </h1>

   <p style={{ color: "#333", marginTop: "5px", marginBottom: "15px" }}>
  🕒 {currentTime}
</p>

      <SearchBox updateInfo={updateInfo} />

      <InfoBox info={weatherInfo} />

      
      <Forecast forecast={forecast} />
      <div style={{ height: "20px" }}></div>
       
    </div>
  );
}

export default WeatherApp;