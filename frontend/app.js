let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let translatedText = document.getElementById('translatedText');

async function startCamera() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();
    video.style.display = 'block';

    setInterval(captureFrame, 1000); // Capture frame every second
}

async function captureFrame() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let dataUrl = canvas.toDataURL('image/png');
    let response = await fetch('/translate', {
        method: 'POST',
        body: JSON.stringify({ image: dataUrl, language: document.getElementById('languageSelect').value }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let result = await response.json();
    translatedText.innerText = result.translatedText;
}
