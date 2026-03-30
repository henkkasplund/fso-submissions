import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const baseUrl = 'https://openweathermap.org/img/wn'

  useEffect(() => {
    weatherService
      .getWeather(capital)
      .then((initialWeather) => {
        setWeather(initialWeather)
      })
  }, [capital])

  if (!weather) {
    return null
  }
  console.log(weather)
  return (
    <div>
      <p>Temperature { weather.main.temp } Celsius</p>
      <img src={`${ baseUrl }/${ weather.weather[0].icon }@2x.png`} alt={`${ weather.weather[0].description }`} />
      <p>Wind { weather.wind.speed } m/s</p>
    </div>
  )
}

export default Weather