// scripts/coin.js
document.addEventListener('DOMContentLoaded', function() {
    const coin = document.getElementById('coin');
    const coinCountBar = document.getElementById('coin-count');
    const homeScore = document.getElementById('home-score');

    let coinsCollected = 0;
    let coinLimit = 10000;

    function updateCoinCountBar() {
        coinCountBar.textContent = `${coinLimit} / 10000`;
    }

    function addCoins(amount) {
        if (coinLimit > 0) {
            coinsCollected += amount;
            coinLimit -= amount;
            homeScore.textContent = coinsCollected;
            updateCoinCountBar();
        }
    }

    coin.addEventListener('click', () => {
        addCoins(1);
    });

    updateCoinCountBar();

    // Автоматическое пополнение монет
    setInterval(() => {
        if (coinLimit < 10000) {
            coinLimit += 50;
            if (coinLimit > 10000) {
                coinLimit = 10000;
            }
            updateCoinCountBar();
        }
    }, 10000);
});
