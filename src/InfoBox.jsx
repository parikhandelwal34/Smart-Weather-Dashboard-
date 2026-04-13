import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import "./InfoBox.css";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';
import CloudIcon from '@mui/icons-material/Cloud';


function InfoBox({info}){
    const HOT_URL = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";
const COLD_URL = "https://plus.unsplash.com/premium_photo-1670493556860-13e006e6faa4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ludGVyfGVufDB8fDB8fHww";
const RAIN_URL = "https://images.unsplash.com/photo-1428592953211-077101b2021b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhaW55fGVufDB8fDB8fHww";
const INIT_URL = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww";
  const weather = info.weather.toLowerCase();

const getWeatherIcon = () => {
  if (weather.includes("rain")) return <ThunderstormIcon />;
  if (weather.includes("cloud")) return <CloudIcon />;
  if (info.temp > 30) return <SunnyIcon />;
  return <AcUnitIcon />;
};

const getWeatherImage = () => {
  if (weather.includes("rain") || weather.includes("drizzle")) {
    return RAIN_URL;
  }

  if (weather.includes("cloud")) {
    return INIT_URL;
  }

  if (weather.includes("clear")) {
    return HOT_URL;
  }

  if (weather.includes("snow") || info.temp < 10) {
    return COLD_URL;
  }

  return INIT_URL; // fallback (IMPORTANT)
};
    return (
        
        <div className = "InfoBox">
            
            <div className = "cardContainer">
             <Card sx={{ width: 370 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={getWeatherImage()}
        title="green iguana"
      />
      <CardContent>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"6px", marginBottom:"5px"}}>
  <Typography variant="h5">{info.city}</Typography>
  <span style={{fontSize:"28px"}}>{getWeatherIcon()}</span>
</div>
<hr style={{
  border: "none",
  borderTop: "1px solid rgba(0,0,0,0.1)",
  margin: "10px 20px"
}} />
        <div style={{color:"gray", fontSize:"13px"}}>
  <div className="weatherGrid">
  <div><b>🌡️ {info.temp}°C</b></div>
  <div>💧 Humidity: {info.humidity}%</div>
  <div>⬇️ Min: {info.tempMin}°C</div>
  <div>⬆️ Max: {info.tempMax}°C</div>
</div>

<p style={{ marginTop: "10px" }}>
  🌤️ {info.weather.charAt(0).toUpperCase() + info.weather.slice(1)}  
  <br />
  Feels like <b>{info.feelsLike}°C</b>
</p>

        </div>
      </CardContent>
      
    </Card>
    </div>
        </div>
    )
}

export default InfoBox;