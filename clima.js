
const weatherInfo = document.getElementById('weather-info');
const citySelect = document.getElementById('city-select');
const getWeatherBtn = document.getElementById('get-weather-btn');

async function fetchWeather(lat, lon) {
  const apiKey = '0241ac3d38cb384837aa0793a11e4aed'; // Reemplaza con tu API key
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
  const url = `${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

async function updateWeatherInfo() {
  const selectedCoordinates = citySelect.value.split(',');
  const lat = selectedCoordinates[0];
  const lon = selectedCoordinates[1];
  const data = await fetchWeather(lat, lon);

  if (data) {
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const currentTime = new Date().getTime() / 1000; // Convertir a segundos
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const isDay = currentTime > sunrise && currentTime < sunset;

    weatherInfo.innerHTML = `
      <p class="mb-1"><strong>Coordinates:</strong> ${lat}, ${lon}</p>
      <p class="mb-1"><strong>Weather:</strong> ${weatherDescription}</p>
      <p class="mb-1"><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Time of Day:</strong> ${isDay ? 'Day' : 'Night'}</p>
    `;
  }
}

getWeatherBtn.addEventListener('click', updateWeatherInfo);
