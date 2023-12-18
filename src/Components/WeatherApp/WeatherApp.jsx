
import "./WeatherApp.css";
// Icons
import searchIcon from "../Assets/search.png";
import clearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import drizzleIcon from "../Assets/drizzle.png";
import humidityIcon from "../Assets/humidity.png";
import rainIcon from "../Assets/rain.png";
import snowIcon from "../Assets/snow.png";
import windIcon from "../Assets/wind.png";
import { useState } from "react";
import axios from "axios";


const WeatherApp = ()=>{

const [weatherIcon, setWeatherIcon] = useState(cloudIcon);


const setDispalyData= (data)=>{
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temp = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-locaton");

    humidity[0].innerHTML = data.main.humidity+" %";
    wind[0].innerHTML = data.wind.speed+" km/hr";
    temp[0].innerHTML = data.main.temp+" °C";
    location[0].innerHTML =data.name;

    if(data.weather[0].icon==="01d" || (data.weather[0].icon==="01n"))
    {
        setWeatherIcon(clearIcon);
    }
    else if(data.weather[0].icon==="02d" || (data.weather[0].icon==="02n"))
    {
        setWeatherIcon(cloudIcon);
    }
    else if(data.weather[0].icon==="03d" || (data.weather[0].icon==="03n"))
    {
        setWeatherIcon(drizzleIcon);
    }
    else if(data.weather[0].icon==="04d" || (data.weather[0].icon==="04n"))
    {
        setWeatherIcon(drizzleIcon);
    }
    else if(data.weather[0].icon==="09d" || (data.weather[0].icon==="09n"))
    {
        setWeatherIcon(rainIcon);
    }
    else if(data.weather[0].icon==="10d" || (data.weather[0].icon==="10n"))
    {
        setWeatherIcon(rainIcon);
    }
    else if(data.weather[0].icon==="13d" || (data.weather[0].icon==="13n"))
    {
        setWeatherIcon(snowIcon);
    }
    else
    {
        setWeatherIcon(clearIcon);
    }

}


const search = async ()=>{
    const element = document.getElementsByClassName("cityInput");
   
    if(element[0].value==="")
    {
        return 0;
    }

    let city = JSON.stringify({
        "city": element[0].value
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://weather-app-backend-five.vercel.app/getWeather',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : city
      };
      
      axios.request(config)
      .then((response) => {
        
        setDispalyData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  
     

     
   
 }
return(
<div className="container">
<div className="top-bar">
    <input type="text" className="cityInput" placeholder="Search" />
    <div className="search-icon" onClick={()=>{search();}}>
        <img src={searchIcon} alt="search icon" />
    </div>
    
</div> 

<div className="weather-image">
        <img src={weatherIcon} alt="cloud icon" />
    </div>
    <div className="weather-temp">24°C</div>
    <div className="weather-locaton">London</div>
    <div className="data-container">
        <div className="element">
            <img src={humidityIcon} alt="humidity icon" className="icon" />
            <div className="data">
                <div className="humidity-percent">
                    64%
                </div>
                <div className="text">Humidity</div>
            </div>
        </div>

        <div className="element">
            <img src={windIcon} alt="wind icon" className="icon"/>
            <div className="data">
                <div className="wind-rate">
                   18 km/h
                </div>
                <div className="text">Wind Speed</div>
            </div>
        </div>

        
    </div>
{/* top bar end here */}
</div>)
}

export default WeatherApp;
