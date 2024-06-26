// scripts/coin.js
document.addEventListener('DOMContentLoaded', function() {
    const coin = document.getElementById('coin');
    const coinCountBar = document.getElementById('coin-count');
    const homeScore = document.getElementById('home-score');

    let coinsCollected = localStorage.getItem('coinsCollected') ? parseInt(localStorage.getItem('coinsCollected')) : 0;
    let coinLimit = localStorage.getItem('coinLimit') ? parseInt(localStorage.getItem('coinLimit')) : 10000;
    let coinValue = localStorage.getItem('coinValue') ? parseInt(localStorage.getItem('coinValue')) : 1;

    function updateCoinCountBar() {
        coinCountBar.textContent = `${coinLimit} / 10000`;
    }

    function addCoins(amount) {
        if (coinLimit >= amount) {
            coinsCollected += amount;
            coinLimit -= amount;
            homeScore.textContent = coinsCollected;
            updateCoinCountBar();
            localStorage.setItem('coinsCollected', coinsCollected);
            localStorage.setItem('coinLimit', coinLimit);
        }
    }

    coin.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents default browser behavior
        addCoins(coinValue);
    });

    updateCoinCountBar();

    // Auto refill coins
    setInterval(() => {
        if (coinLimit < 10000) {
            coinLimit += 50;
            if (coinLimit > 10000) {
                coinLimit = 10000;
            }
            updateCoinCountBar();
            localStorage.setItem('coinLimit', coinLimit);
        }
    }, 10000);

    coin.addEventListener('touchstart', (e) => {
        e.preventDefault();
        Array.from(e.touches).forEach(() => {
            addCoins(coinValue);
        });
    });
});
