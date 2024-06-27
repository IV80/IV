document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
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
    const claimBonusButton = document.getElementById('claimBonusButton');
    const bonusMessage = document.getElementById('bonusMessage');
    const bonusTimer = document.getElementById('bonusTimer');

    // Переменные для состояния
    let coinsCollected = localStorage.getItem('coinsCollected') ? parseInt(localStorage.getItem('coinsCollected')) : 0;
    let coinLimit = localStorage.getItem('coinLimit') ? parseInt(localStorage.getItem('coinLimit')) : 10000;
    let coinValue = localStorage.getItem('coinValue') ? parseInt(localStorage.getItem('coinValue')) : 1;
    let upgradeCost = localStorage.getItem('upgradeCost') ? parseInt(localStorage.getItem('upgradeCost')) : 100;
    let autoCollectorLevel = localStorage.getItem('autoCollectorLevel') ? parseInt(localStorage.getItem('autoCollectorLevel')) : 0;
    let autoCollectorCost = localStorage.getItem('autoCollectorCost') ? parseInt(localStorage.getItem('autoCollectorCost')) : 20000;
    let dailyBonusTime = localStorage.getItem('dailyBonusTime') ? parseInt(localStorage.getItem('dailyBonusTime')) : Date.now();
    let friendsInvited = localStorage.getItem('friendsCount') ? parseInt(localStorage.getItem('friendsCount')) : 0;

    // Функция обновления UI
    function updateUI() {
        homeScore.textContent = coinsCollected;
        coinCountBar.textContent = `${coinLimit} / 10000`;
        coinValueSpan.textContent = coinValue.toFixed(0);  // Исправляем на целое значение
        upgradeCostSpan.textContent = upgradeCost;
        autoCollectorLevelSpan.textContent = autoCollectorLevel;
        autoCollectorCostSpan.textContent = autoCollectorCost;
        friendsCount.textContent = friendsInvited;
        referralLinkInput.value = localStorage.getItem('userReferralCode') ? `https://your-app-link/referral?code=${localStorage.getItem('userReferralCode')}` : '';
    }

    // Функция сохранения прогресса
    function saveProgress() {
        localStorage.setItem('coinsCollected', coinsCollected);
        localStorage.setItem('coinLimit', coinLimit);
        localStorage.setItem('coinValue', coinValue);
        localStorage.setItem('upgradeCost', upgradeCost);
        localStorage.setItem('autoCollectorLevel', autoCollectorLevel);
        localStorage.setItem('autoCollectorCost', autoCollectorCost);
        localStorage.setItem('dailyBonusTime', dailyBonusTime);
        localStorage.setItem('friendsCount', friendsInvited);
    }

    // Функция добавления монет
    function addCoins(amount) {
        if (coinLimit >= amount) {
            coinsCollected += amount;
            coinLimit -= amount;
            updateUI();
            saveProgress();
        }
    }

    // Обработчики событий
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

    claimBonusButton.addEventListener('click', () => {
        const currentTime = Date.now();
        const timeDifference = currentTime - dailyBonusTime;

        if (timeDifference >= 24 * 60 * 60 * 1000) {  // 24 часа
            const bonus = 100;
            coinsCollected += bonus;
            dailyBonusTime = currentTime;
            bonusMessage.textContent = `You've received ${bonus} coins!`;
            updateUI();
            saveProgress();
        } else {
            bonusMessage.textContent = 'Bonus not yet available. Come back later!';
        }

        updateDailyBonusTimer();
    });

    // Уникальная реферальная ссылка для каждого пользователя
    if (!localStorage.getItem('userReferralCode')) {
        const userReferralCode = Math.random().toString(36).substring(2, 10);
        localStorage.setItem('userReferralCode', userReferralCode);
    }
    referralLinkInput.value = `https://your-app-link/referral?code=${localStorage.getItem('userReferralCode')}`;

    // Таймер для бонуса
    function updateDailyBonusTimer() {
        const currentTime = Date.now();
        const timeDifference = currentTime - dailyBonusTime;
        const remainingTime = 24 * 60 * 60 * 1000 - timeDifference;
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        bonusTimer.textContent = `Next bonus in: ${hours}h ${minutes}m ${seconds}s`;

        if (remainingTime > 0) {
            setTimeout(updateDailyBonusTimer, 1000);
        }
    }

    // Инициализация UI
    updateUI();
    updateDailyBonusTimer();

    // Автоматическое пополнение монет
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
