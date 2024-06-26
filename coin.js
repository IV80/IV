// scripts/coin.js
document.addEventListener('DOMContentLoaded', function() {
    const coin = document.getElementById('coin');
    let coinCount = 10000;
    const maxCoins = 10000;
    const coinCountElement = document.getElementById('coin-count');
    
    function updateCoinCountDisplay() {
        coinCountElement.textContent = `${coinCount} / ${maxCoins}`;
    }

    function addCoins(amount) {
        coinCount = Math.min(coinCount + amount, maxCoins);
        updateCoinCountDisplay();
    }

    coin.addEventListener('click', () => {
        if (coinCount > 0) {
            addCoins(-1);
            // Update user's coin balance in the game logic
        }
    });

    setInterval(() => {
        addCoins(50); // Add coins every 10 seconds
    }, 10000);

    updateCoinCountDisplay();
});
