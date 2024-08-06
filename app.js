const API_KEY = 'YOUR_API_KEY';
const CHANNEL_ID = 'UC_x5XG1OV2P6uZZ5FSM9Ttw'; // Пример ID канала
const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=5`;

async function fetchRecommendedVideos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayVideos(data.items);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayVideos(videos) {
    const videoContainer = document.querySelector('.content');
    videoContainer.innerHTML = ''; // Очистка контейнера перед добавлением новых видео

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-item');
        videoElement.innerHTML = `
            <h3>${video.snippet.title}</h3>
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
            <p>${video.snippet.description}</p>
        `;
        videoContainer.appendChild(videoElement);
    });
}

fetchRecommendedVideos();
