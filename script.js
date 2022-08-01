const API_KEY = "6c47d795d5d441e9beec727b59bb6d58";
const cityName = document.getElementById('city-name')
const weatherType = document.getElementById('weather-type')
const temp = document.getElementById('temp')
const tempMax = document.getElementById('max-temp')
const tempMin = document.getElementById('min-temp')

getWeatherData = async (lat, lon) => {
  weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  return fetch(weather_url)
    .then(response => response.json())
    .then(data => {
      const weatherData = {
        weather: data.weather[0].main,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        city: data.name
      }
      showWeatherData(weweatherData)
    })
    .catch(err => console.log(err))

}


const searchCity = () => {
  const city = document.getElementById('city-input').value;
  const geo_url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
  fetch(geo_url)
    .then(response => response.json())
    .then(data => {
      const cityLat = data[0].lat
      const cityLon = data[0].lon
      data = getWeatherData(cityLat, cityLon)
      showWeatherData(data)
    })
    .catch(err => console.log(err))
}


const showWeatherData = (weatherData) => {
  cityName.innerText = weatherData.city
  weatherType.innerText = weatherData.weather
  temp.innerText = weatherData.temp
  tempMax.innerText = weatherData.tempMax
  tempMin.innerText = weatherData.tempMin
}

