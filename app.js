const API_KEY = 'AIzaSyD0Y9KGP92HS3hRh3rSwB8EwPq0deHnKnE';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

async function searchVideos() {
  const query = document.getElementById('search').value;
  const response = await fetch(`${API_URL}?part=snippet&q=${query}&key=${API_KEY}&maxResults=10&type=video`);
  const data = await response.json();
  displayVideos(data.items);
}

function displayVideos(videos) {
  const videoList = document.getElementById('video-list');
  videoList.innerHTML = '';
  videos.forEach(video => {
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    videoItem.innerHTML = `
      <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
      <h3>${video.snippet.title}</h3>
      <p>${video.snippet.description}</p>
      <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">Смотреть на YouTube</a>
    `;
    videoList.appendChild(videoItem);
  });
}
