// Замените YOUR_API_KEY на ваш ключ API от OpenWeatherMap
const API_KEY = 'c8a2087a4da0637a03ab86da22af2e53';

document.addEventListener('DOMContentLoaded', async () => {
    // Инициализация карты с начальным видом
    const map = L.map('map').setView([51.505, -0.09], 2);

    // Добавление базового слоя карты
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Добавление слоев для облаков и гроз
    const cloudsLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
        attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        opacity: 0.5
    });

    const stormsLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
        attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        opacity: 0.5
    });

    // Добавление управления слоями карты
    const layersControl = {
        "Base Map": map,
        "Clouds": cloudsLayer,
        "Storms": stormsLayer
    };

    L.control.layers(layersControl).addTo(map);

    // Получение и отображение данных о погоде
    try {
        const weatherData = await getWeatherData();
        addWeatherMarkers(map, weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
});

async function getWeatherData() {
    // Запрос на получение данных о погоде
    const response = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=0&lon=0&cnt=50&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Weather data:", data);
    return data.list;
}

function addWeatherMarkers(map, weatherData) {
    // Добавление маркеров на карту
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
