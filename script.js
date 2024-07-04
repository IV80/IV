document.addEventListener('DOMContentLoaded', function() {
    let map = L.map('map').setView([55.751244, 37.618423], 10); // Москва по умолчанию

    let terrainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    let precipitationLayer;
    let temperatureLayer;

    document.getElementById('map-type').addEventListener('change', function() {
        let selectedType = this.value;
        switchMapType(selectedType);
    });

    function switchMapType(type) {
        map.eachLayer(function(layer) {
            map.removeLayer(layer);
        });

        switch(type) {
            case 'terrain':
                map.addLayer(terrainLayer);
                break;
            case 'precipitation':
                if (!precipitationLayer) {
                    precipitationLayer = L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY', {
                        maxZoom: 19,
                        attribution: '© OpenWeatherMap'
                    });
                }
                map.addLayer(precipitationLayer);
                break;
            case 'temperature':
                if (!temperatureLayer) {
                    temperatureLayer = L.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY', {
                        maxZoom: 19,
                        attribution: '© OpenWeatherMap'
                    });
                }
                map.addLayer(temperatureLayer);
                break;
        }
    }

    window.searchLocation = function() {
        let location = document.getElementById('location').value;
        if (location) {
            axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
                .then(function(response) {
                    if (response.data.length > 0) {
                        let lat = response.data[0].lat;
                        let lon = response.data[0].lon;
                        map.setView([lat, lon], 12);
                    } else {
                        alert('Локация не найдена');
                    }
                })
                .catch(function(error) {
                    console.error(error);
                    alert('Ошибка поиска локации');
                });
        } else {
            alert('Введите локацию');
        }
    }
});
