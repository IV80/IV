// Замените YOUR_API_KEY на ваш ключ API от OpenWeatherMap
const API_KEY = 'c8a2087a4da0637a03ab86da22af2e53';

document.addEventListener('DOMContentLoaded', async () => {
    const map = L.map('map').setView([51.505, -0.09], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    try {
        const weatherData = await getWeatherData();
        addWeatherMarkers(map, weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
});

async function getWeatherData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=0&lon=0&cnt=50&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Weather data:", data);  // Debug line
    return data.list;
}

function addWeatherMarkers(map, weatherData) {
    weatherData.forEach(city => {
        const marker = L.marker([city.coord.lat, city.coord.lon]).addTo(map);
        const popupContent = `
            <strong>${city.name}</strong><br>
            Temperature: ${city.main.temp}°C<br>
            Weather: ${city.weather[0].description}
        `;
        marker.bindPopup(popupContent);
    });
}
