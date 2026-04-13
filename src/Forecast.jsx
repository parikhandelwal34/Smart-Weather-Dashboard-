function Forecast({ forecast }) {
  if (!forecast.length) {
    return <p style={{ marginTop: "20px" }}>⏳ Loading forecast...</p>;
  }
  return (
    <div style={{ marginTop: "10px", paddingBottom: "5px" }}>
      <h3 style={{
  marginTop: "10px",
  marginBottom: "10px",
  fontSize: "22px",
  color: "#222"
}}>
  📅 5-Day Forecast
</h3>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        flexWrap: "wrap"
      }}>
        {forecast.map((day, index) => (
          <div key={index} style={{
         
               background: "rgba(255,255,255,0.25)",
  backdropFilter: "blur(10px)",
  padding: "8px",
  borderRadius: "15px",
  width: "80px",
  textAlign: "center",
  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  transition: "0.3s",
  color: "#000"
}}

          onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.08)";
  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
}}
>
            <p style={{fontWeight:"bold"}}>
  {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
</p>

<p style={{fontSize:"16px"}}>
  {day.weather.includes("cloud") ? "☁️" :
   day.weather.includes("rain") ? "🌧️" :
   "☀️"}
</p>

<p style={{fontWeight:"bold"}}>
  {day.temp}°C
</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;