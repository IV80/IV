// scripts/app.js
document.addEventListener('DOMContentLoaded', function() {
    const coin = document.getElementById('coin');
    const coinCountBar = document.getElementById('coin-count');
    const homeScore = document.getElementById('home-score');
    const referralLinkInput = document.getElementById('referralLink');
    const friendsCount = document.getElementById('friendsCount');
    const upgradeButton = document.getElementById('upgradeButton');
    const upgradeCostSpan = document.getElementById('upgradeCost');
    const coinValueSpan = document.getElementById('coinValue');
    const autoCollectorButton = document.getElementById('autoCollectorButton');
    const autoCollectorCostSpan = document.getElementById('autoCollectorCost');
    const autoCollectorLevelSpan = document.getElementById('autoCollectorLevel');

    let coinsCollected = localStorage.getItem('coinsCollected') ? parseInt(localStorage.getItem('coinsCollected')) : 0;
    let coinLimit = localStorage.getItem('coinLimit') ? parseInt(localStorage.getItem('coinLimit')) : 10000;
    let coinValue = localStorage.getItem('coinValue') ? parseInt(localStorage.getItem('coinValue')) : 1;
    let upgradeCost = localStorage.getItem('upgradeCost') ? parseInt(localStorage.getItem('upgradeCost')) : 100;
    let autoCollectorLevel = localStorage.getItem('autoCollectorLevel') ? parseInt(localStorage.getItem('autoCollectorLevel')) : 0;
    let autoCollectorCost = localStorage.getItem('autoCollectorCost') ? parseInt(localStorage.getItem('autoCollectorCost')) : 20000;

    function updateUI() {
        homeScore.textContent = coinsCollected;
        coinCountBar.textContent = `${coinLimit} / 10000`;
        coinValueSpan.textContent = coinValue;
        upgradeCostSpan.textContent = upgradeCost;
        autoCollectorLevelSpan.textContent = autoCollectorLevel;
        autoCollectorCostSpan.textContent = autoCollectorCost;
    }

    function saveProgress() {
        localStorage.setItem('coinsCollected', coinsCollected);
        localStorage.setItem('coinLimit', coinLimit);
        localStorage.setItem('coinValue', coinValue);
        localStorage.setItem('upgradeCost', upgradeCost);
        localStorage.setItem('autoCollectorLevel', autoCollectorLevel);
        localStorage.setItem('autoCollectorCost', autoCollectorCost);
    }

    function addCoins(amount) {
        if (coinLimit >= amount) {
            coinsCollected += amount;
            coinLimit -= amount;
            updateUI();
            saveProgress();
        }
    }

    coin.addEventListener('click', () => {
        addCoins(coinValue);
    });

    upgradeButton.addEventListener('click', () => {
        if (coinsCollected >= upgradeCost) {
            coinsCollected -= upgradeCost;
            coinValue += 1;  // Увеличение на 1 монету
            upgradeCost *= 3;  // Увеличение стоимости в 3 раза
            updateUI();
            saveProgress();
        }
    });

    autoCollectorButton.addEventListener('click', () => {
        if (coinsCollected >= autoCollectorCost && autoCollectorLevel < 20) {
            coinsCollected -= autoCollectorCost;
            autoCollectorLevel += 1;
            autoCollectorCost *= 2;
            updateUI();
            saveProgress();
        }
    });

    // Unique referral link for each user
    const userReferralCode = localStorage.getItem('userReferralCode') || Math.random().toString(36).substring(2, 10);
    localStorage.setItem('userReferralCode', userReferralCode);
    referralLinkInput.value = `https://your-app-link/referral?code=${userReferralCode}`;

    updateUI();

    // Auto refill coins
    setInterval(() => {
        if (coinLimit < 10000) {
            coinLimit += 50;
            if (coinLimit > 10000) {
                coinLimit = 10000;
            }
            updateUI();
            saveProgress();
        }
    }, 10000);
});
