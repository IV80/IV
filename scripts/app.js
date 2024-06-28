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

    let userId = localStorage.getItem('userId') || generateUserId();
    localStorage.setItem('userId', userId);

    let coinsCollected, coinLimit, coinValue, upgradeCost, autoCollectorLevel, autoCollectorCost;

    function generateUserId() {
        return Math.random().toString(36).substring(2, 10);
    }

    async function saveProgress() {
        const data = {
            userId,
            coinsCollected,
            coinLimit,
            coinValue,
            upgradeCost,
            autoCollectorLevel,
            autoCollectorCost
        };

        try {
            await fetch('http://localhost:3000/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    async function loadProgress() {
        try {
            const response = await fetch(`http://localhost:3000/load/${userId}`);
            const data = await response.json();

            if (data) {
                coinsCollected = data.coinsCollected || 0;
                coinLimit = data.coinLimit || 10000;
                coinValue = data.coinValue || 1;
                upgradeCost = data.upgradeCost || 100;
                autoCollectorLevel = data.autoCollectorLevel || 0;
                autoCollectorCost = data.autoCollectorCost || 20000;
            } else {
                coinsCollected = 0;
                coinLimit = 10000;
                coinValue = 1;
                upgradeCost = 100;
                autoCollectorLevel = 0;
                autoCollectorCost = 20000;
            }

            updateUI();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    function updateUI() {
        homeScore.textContent = coinsCollected;
        coinCountBar.textContent = `${coinLimit} / 10000`;
        coinValueSpan.textContent = coinValue;
        upgradeCostSpan.textContent = upgradeCost;
        autoCollectorLevelSpan.textContent = autoCollectorLevel;
        autoCollectorCostSpan.textContent = autoCollectorCost;
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

    loadProgress();

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

// Добавьте в конец файла
window.addEventListener('storage', function(event) {
    if (event.key === 'coinsCollected' || event.key === 'coinLimit' || 
        event.key === 'coinValue' || event.key === 'upgradeCost' || 
        event.key === 'autoCollectorLevel' || event.key === 'autoCollectorCost' || 
        event.key === 'dailyBonusTime' || event.key === 'friendsCount') {
        
        // Обновляем переменные
        coinsCollected = parseInt(localStorage.getItem('coinsCollected') || '0');
        coinLimit = parseInt(localStorage.getItem('coinLimit') || '10000');
        coinValue = parseInt(localStorage.getItem('coinValue') || '1');
        upgradeCost = parseInt(localStorage.getItem('upgradeCost') || '100');
        autoCollectorLevel = parseInt(localStorage.getItem('autoCollectorLevel') || '0');
        autoCollectorCost = parseInt(localStorage.getItem('autoCollectorCost') || '20000');
        dailyBonusTime = parseInt(localStorage.getItem('dailyBonusTime') || Date.now());
        friendsInvited = parseInt(localStorage.getItem('friendsCount') || '0');
        
        // Обновляем UI
        updateUI();
    }
});
