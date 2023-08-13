    const weatherCard = document.getElementById('weather-card');
    const weatherInfo = document.getElementById('weather-info');
    const citySelect = document.getElementById('city-select');
    const getWeatherBtn = document.getElementById('get-weather-btn');

    async function fetchWeather(lat, lon) {
      const apiKey = '0241ac3d38cb384837aa0793a11e4aed'; // Reemplaza con tu API key
      const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
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
        const humidity = data.main.humidity; // Nueva información de humedad
        const currentTime = new Date().getTime() / 1000; // Convertir a segundos
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        const isDay = currentTime > sunrise && currentTime < sunset;
        const weatherIcon = data.weather[0].icon;

        // Mapa de iconos del clima de OpenWeatherMap a íconos de FontAwesome
        const weatherIconMap = {
          "01d": "fas fa-sun",          // Cielo despejado (día)
          "01n": "fas fa-moon",        // Cielo despejado (noche)
          "02d": "fas fa-cloud-sun",   // Algunas nubes (día)
          "02n": "fas fa-cloud-moon",  // Algunas nubes (noche)
          "03d": "fas fa-cloud",       // Nubes dispersas (día)
          "03n": "fas fa-cloud",       // Nubes dispersas (noche)
          "04d": "fas fa-cloud",       // Nubes rotas (día)
          "04n": "fas fa-cloud",       // Nubes rotas (noche)
          "09d": "fas fa-cloud-rain",  // Lluvia ligera (día)
          "09n": "fas fa-cloud-rain",  // Lluvia ligera (noche)
          "10d": "fas fa-cloud-showers-heavy", // Lluvia intensa (día)
          "10n": "fas fa-cloud-showers-heavy", // Lluvia intensa (noche)
          "11d": "fas fa-bolt",        // Tormenta (día)
          "11n": "fas fa-bolt",        // Tormenta (noche)
          "13d": "fas fa-snowflake",   // Nieve (día)
          "13n": "fas fa-snowflake",   // Nieve (noche)
          "50d": "fas fa-smog",        // Niebla (día)
          "50n": "fas fa-smog"         // Niebla (noche)
        };

        const iconClass = weatherIconMap[weatherIcon];

        const weatherIconElement = document.getElementById("weather-icon");
        weatherIconElement.innerHTML = `<i class="${iconClass} fa-3x"></i>`;

        weatherInfo.innerHTML = `
          <p><strong>Ciudad:</strong> ${data.name}</p>
          <p><strong>Clima:</strong> ${weatherDescription}</p>
          <p><strong>Temperatura:</strong> ${temperature}°C</p>
          <p><strong>Humedad:</strong> ${humidity}%</p> <!-- Mostrar humedad -->
          <p><strong>Momento del Día:</strong> ${isDay ? 'Día' : 'Noche'}</p>
        `;

        weatherCard.style.display = 'block';

        if (!isDay) {
          document.body.classList.add('bg-dark', 'text-light'); // Agregar clases para el modo oscuro
        }
      }
    }
    getWeatherBtn.addEventListener('click', updateWeatherInfo);//