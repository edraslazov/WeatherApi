// tiempo.js
const ElSalvadorModule = (function () {
  const weatherCard = document.getElementById('weather-card');
  const weatherInfo = document.getElementById('weather-info');
  const citySelect = document.getElementById('city-select');
  const getWeatherBtn = document.getElementById('get-weather-btn');
  const dateTimeElement = document.getElementById('date-time'); // Asegúrate de tener un elemento con el id 'date-time'

  const apiKey = '0241ac3d38cb384837aa0793a11e4aed'; // Reemplaza con tu API key
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

  const weatherIconMap = {
    // ... (íconos de clima)
    "01d": "fas fa-sun",
    "01n": "fas fa-moon",
    "02d": "fas fa-cloud-sun",
    "02n": "fas fa-cloud-moon",
    "03d": "fas fa-cloud",
    "03n": "fas fa-cloud",
    "04d": "fas fa-cloud",
    "04n": "fas fa-cloud",
    "09d": "fas fa-cloud-rain",
    "09n": "fas fa-cloud-rain",
    "10d": "fas fa-cloud-showers-heavy",
    "10n": "fas fa-cloud-showers-heavy",
    "11d": "fas fa-bolt",
    "11n": "fas fa-bolt",
    "13d": "fas fa-snowflake",
    "13n": "fas fa-snowflake",
    "50d": "fas fa-smog",
    "50n": "fas fa-smog"
  };

  async function fetchWeather(lat, lon) {
    const url = `${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener el clima:', error);
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
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed; // Velocidad del viento en m/s
      const windDirection = data.wind.deg; // Dirección del viento en grados
      const windDirectionText = getWindDirectionText(windDirection);
      const precipitation = data.rain ? data.rain['1h'] : 0; // Precipitaciones en la última hora
      const currentTime = new Date().getTime() / 1000;
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const isDay = currentTime > sunrise && currentTime < sunset;
      const weatherIcon = data.weather[0].icon;

      const iconClass = weatherIconMap[weatherIcon];

      const weatherIconElement = document.getElementById("weather-icon");
      weatherIconElement.innerHTML = `<i class="${iconClass} fa-3x"></i>`;

      weatherInfo.innerHTML = `
        <div class="row">
          <div class="col-md-5 p-3"> <!-- Agregado el padding -->
            <p><strong>Ciudad:</strong> ${data.name}</p>
            <p><strong>Clima:</strong> ${weatherDescription}</p>
            <p><strong>Temperatura:</strong> ${temperature}°C</p>
            <p><strong>Humedad:</strong> ${humidity}%</p>
          </div>
          <div class="col-md-4 p-3"> <!-- Agregado el padding -->
            <p><strong>Velocidad del Viento:</strong> ${windSpeed} m/s</p>
            <p><strong>Dirección del Viento:</strong> ${windDirectionText}</p>
            <p><strong>Precipitaciones (1h):</strong> ${precipitation} mm</p>
          </div>
        </div>
        <p><strong>Momento del Día:</strong> ${isDay ? 'Día' : 'Noche'}</p>
      `;

      weatherCard.style.display = 'block';
      weatherCard.style.width = '40rem'; // Cambia el ancho de la tarjeta aquí

      if (!isDay) {
        document.body.classList.add('bg-dark', 'text-light');
        document.body.classList.remove('bg-day');
      } else {
        document.body.classList.remove('bg-dark', 'text-light');
        document.body.classList.add('bg-day');
      }
    }
  }

  function getWindDirectionText(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((deg % 360) / 45);
    return directions[index];
  }

  function updateDateTime() {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString('es-SV');
    dateTimeElement.textContent = formattedDateTime;
  }

  function init() {
    getWeatherBtn.addEventListener('click', updateWeatherInfo);
    setInterval(updateDateTime, 1000); // Actualizar la hora cada segundo
  }

  return { init };
})();

ElSalvadorModule.init();
