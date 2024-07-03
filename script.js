const API_KEY = 'c8a2087a4da0637a03ab86da22af2e53';

document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([51.505, -0.09], 2);

    // Добавление базового слоя карты
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Добавление слоя с грозовыми облаками и важными облаками
    const thunderstormLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
        attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        opacity: 0.7,
        maxZoom: 10,
        updateWhenIdle: true
    });

    thunderstormLayer.addTo(map);

    // Добавление слоя температур
    const temperatureLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
        attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        opacity: 0.6,
        maxZoom: 10,
        updateWhenIdle: true
    });

    // Добавление управления слоями карты
    const layersControl = {
        "Thunderstorm Clouds": thunderstormLayer,
        "Temperature": temperatureLayer
    };

    L.control.layers(null, layersControl).addTo(map);

    // Определение текущей локации пользователя и добавление меток температуры
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 10);
            getWeatherData(latitude, longitude).then(weatherData => {
                addWeatherLabels(map, weatherData);
            });
        }, () => {
            console.error("Unable to retrieve location.");
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
});

async function getWeatherData(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=50&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Weather data:", data);
    return data.list;
}

function addWeatherLabels(map, weatherData) {
    weatherData.forEach(city => {
        const { lat, lon } = city.coord;
        const temp = city.main.temp;

        // Добавление текстовой метки температуры на карту
        const label = L.divIcon({
            className: 'temperature-label',
            html: `<div>${temp}°C</div>`,
            iconSize: [50, 20]  // Размер иконки
        });

        L.marker([lat, lon], { icon: label }).addTo(map);
    });
}
