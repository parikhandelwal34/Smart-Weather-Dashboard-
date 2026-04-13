import TextField from '@mui/material/TextField';
import { useState } from "react";
import Button from '@mui/material/Button';
import "./SearchBox.css";

function SearchBox({ updateInfo }) {

  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "0a370bcf325a278908786bd0868ff2b6";
  let getWeatherInfo = async () => {
    let response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    let jsonResponse = await response.json();

    if (jsonResponse.cod !== 200) {
      throw new Error("City not found");
    }

    return {
      city: jsonResponse.name + ", " + jsonResponse.sys.country,
      temp: jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feelsLike: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description,
      icon: jsonResponse.weather[0].icon
    };
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  // 🔍 submit
  let handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setLoading(true);
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setError(false);
      setCity("");
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      let response = await fetch(
        `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      let data = await response.json();

      updateInfo({
        city: data.name + ", " + data.sys.country,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        feelsLike: data.main.feels_like,
        weather: data.weather[0].description,
      });
    });
  };

  return (
    <div className="SearchBox">

      
      <div style={{
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(12px)",
        padding: "18px",
        borderRadius: "15px",
        display: "inline-block",
        transform: "scale(1.05)"
      }}>

        <form onSubmit={handleSubmit}>

          {/* 🔍 Input */}
          <TextField
            id="city"
            label="Enter city..."
            variant="outlined"
            required
            value={city}
            onChange={handleChange}
            sx={{
              width: "280px",
              background: "white",
              borderRadius: "8px"
            }}
          />

        
          <div style={{ marginTop: "14px" }}></div>

          
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px"
          }}>
            <Button variant="contained" type="submit" disabled={loading}>
  {loading ? "Loading..." : "🔍 Search"}
</Button>

            <Button
              variant="outlined"
              onClick={getLocation}
              style={{ padding: "10px 16px" }}
            >
              📍 Use My Location
            </Button>
          </div>

    
          {loading && <div className="loader"></div>}

          
        {error && (
  <p style={{
    color: "white",
    background: "rgba(255,0,0,0.6)",
    padding: "8px",
    borderRadius: "8px",
    marginTop: "10px",
    fontSize: "14px"
  }}>
    ❌ City not found. Try again!
  </p>
)}

        </form>
      </div>
    </div>
  );
}

export default SearchBox;