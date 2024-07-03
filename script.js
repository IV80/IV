// Замените YOUR_API_KEY на ваш ключ API от OpenWeatherMap
const API_KEY = 'c8a2087a4da0637a03ab86da22af2e53';

document.addEventListener('DOMContentLoaded', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const weatherData = await getWeather(latitude, longitude);
            displayWeather(weatherData);
        }, showError);
    } else {
        alert('Geolocation is not supported by your browser');
    }
});

async function getWeather(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    return data;
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    if (data && data.weather && data.weather.length > 0) {
        const weather = data.weather[0];
        weatherDiv.innerHTML = `
            <p><strong>${data.name}</strong></p>
            <p>${weather.description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
        `;
    } else {
        weatherDiv.innerHTML = '<p>Unable to retrieve weather data</p>';
    }
}

function showError(error) {
    const weatherDiv = document.getElementById('weather');
    switch (error.code) {
        case error.PERMISSION_DENIED:
            weatherDiv.innerHTML = "<p>User denied the request for Geolocation.</p>";
            break;
        case error.POSITION_UNAVAILABLE:
            weatherDiv.innerHTML = "<p>Location information is unavailable.</p>";
            break;
        case error.TIMEOUT:
            weatherDiv.innerHTML = "<p>The request to get user location timed out.</p>";
            break;
        case error.UNKNOWN_ERROR:
            weatherDiv.innerHTML = "<p>An unknown error occurred.</p>";
            break;
    }
}
