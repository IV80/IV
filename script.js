const API_KEY = 'c8a2087a4da0637a03ab86da22af2e53';

document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map', {
        gestureHandling: true
    }).setView([51.505, -0.09], 2);

    // Добавление базового слоя карты
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Добавление комбинированного слоя облаков и осадков
    const combinedLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
        attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        opacity: 0.5
    });

    const precipitationLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
        attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        opacity: 0.5
    });

    // Комбинированный слой: облака и осадки
    const combinedWeatherLayer = L.layerGroup([combinedLayer, precipitationLayer]);

    combinedWeatherLayer.addTo(map);

    // Добавление слоя температур
    const temperatureLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
        attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        opacity: 0.6
    });

    const layersControl = {
        "Base Map": map,
        "Clouds and Precipitation": combinedWeatherLayer,
        "Temperature": temperatureLayer
    };

    L.control.layers(null, layersControl).addTo(map);

    // Определение текущей локации пользователя
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 10);
            getWeatherData(latitude, longitude).then(weatherData => {
                addWeatherMarkers(map, weatherData);
            });
        }, () => {
            console.error("Unable to retrieve location.");
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
});

async function getWeatherData(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=10&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Weather data:", data);
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
