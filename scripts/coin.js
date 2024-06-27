// scripts/coin.js
document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');
    let coins = JSON.parse(localStorage.getItem('coins')) || 0;
    const maxCoins = 10000;

    function updateCoinCount() {
        document.getElementById('coin-count').textContent = `${coins} / ${maxCoins}`;
        document.getElementById('home-score').textContent = `Coins Collected: ${coins}`;
        localStorage.setItem('coins', JSON.stringify(coins));
    }

    coin.addEventListener('click', () => {
        coins += 1;
        if (coins > maxCoins) coins = maxCoins;
        updateCoinCount();
    });

    updateCoinCount();
});
