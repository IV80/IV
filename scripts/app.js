// scripts/app.js
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const coinCountBar = document.getElementById('coin-count-bar');
    const homeScore = document.getElementById('home-score');
    const coin = document.getElementById('coin');

    let state = {
        coins: JSON.parse(localStorage.getItem('coins')) || 0,
        autoCollectorLevel: JSON.parse(localStorage.getItem('autoCollectorLevel')) || 0,
        lastCollectTime: JSON.parse(localStorage.getItem('lastCollectTime')) || Date.now(),
        upgradeCost: JSON.parse(localStorage.getItem('upgradeCost')) || 100,
        autoCollectorCost: JSON.parse(localStorage.getItem('autoCollectorCost')) || 20000,
        coinValue: JSON.parse(localStorage.getItem('coinValue')) || 1,
        dailyBonusCollectedAt: JSON.parse(localStorage.getItem('dailyBonusCollectedAt')) || null,
        friendsCount: JSON.parse(localStorage.getItem('friendsCount')) || 0,
    };

    function updateCoinCount() {
        coinCountBar.textContent = `${state.coins} / 10000`;
        homeScore.textContent = `Coins Collected: ${state.coins}`;
    }

    function saveState() {
        localStorage.setItem('coins', JSON.stringify(state.coins));
        localStorage.setItem('autoCollectorLevel', JSON.stringify(state.autoCollectorLevel));
        localStorage.setItem('lastCollectTime', JSON.stringify(state.lastCollectTime));
        localStorage.setItem('upgradeCost', JSON.stringify(state.upgradeCost));
        localStorage.setItem('autoCollectorCost', JSON.stringify(state.autoCollectorCost));
        localStorage.setItem('coinValue', JSON.stringify(state.coinValue));
        localStorage.setItem('dailyBonusCollectedAt', JSON.stringify(state.dailyBonusCollectedAt));
        localStorage.setItem('friendsCount', JSON.stringify(state.friendsCount));
    }

    function switchTab(e) {
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        e.currentTarget.classList.add('active');
        const tabId = e.currentTarget.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    }

    tabs.forEach(tab => tab.addEventListener('click', switchTab));

    coin.addEventListener('click', () => {
        state.coins += state.coinValue;
        if (state.coins >= 10000) {
            state.coins = 10000;
        }
        updateCoinCount();
        saveState();
    });

    updateCoinCount();
});
