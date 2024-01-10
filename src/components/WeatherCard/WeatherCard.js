import React from 'react'
import cloud from "../../assets/weatherCard/cloud.svg"
import bar from "../../assets/weatherCard/bar.svg"
import battery from "../../assets/weatherCard/battery.svg"
import watch from "../../assets/weatherCard/watch.svg"
import './weatherCard.css'
function WeatherCard() {
  return (
    <div className='weather-card'>
        <div className='weather-card-temp'>
            <p className='weather-card-text'>35 C</p>
            <img src={cloud} alt="temperature" />
        </div>
        <img src={bar} alt='bar' />
        <div className='weather-card-time'>
            <p className='weather-card-text'>8:30PM</p>
            <img src={watch} alt="watch" />
        </div>
        <img src={bar} alt='bar' />
        <div className='weather-card-battery'>
            <img src={battery} alt="battery" />
            <p className='weather-card-text'>50%</p>
        </div>
    </div>
  )
}

export default WeatherCard