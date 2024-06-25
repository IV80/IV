document.addEventListener('DOMContentLoaded', function () {
    const coin = document.getElementById('coin');
    const homeScore = document.getElementById('home-score');
    const upgradeButton = document.getElementById('upgradeButton');
    const upgradeCostElement = document.getElementById('upgradeCost');
    const coinValueElement = document.getElementById('coinValue');
    const coinCountBar = document.getElementById('coin-count-bar');
    const coinCountText = document.getElementById('coin-count');
    const autoCollectorButton = document.getElementById('autoCollectorButton');
    const autoCollectorLevelElement = document.getElementById('autoCollectorLevel');
    const referralLink = document.getElementById('referralLink');
    const copyLinkButton = document.getElementById('copyLinkButton');
    const friendsCountElement = document.getElementById('friendsCount');
    const claimBonusButton = document.getElementById('claimBonusButton');
    const bonusMessage = document.getElementById('bonusMessage');
    const bonusTimer = document.getElementById('bonusTimer');

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    let balance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 0;
    let coinValue = localStorage.getItem('coinValue') ? parseInt(localStorage.getItem('coinValue')) : 1;
    let upgradeCost = coinValue * 50;
    let coinCount = localStorage.getItem('coinCount') ? parseInt(localStorage.getItem('coinCount')) : 10000;
    let autoCollectorLevel = localStorage.getItem('autoCollectorLevel') ? parseInt(localStorage.getItem('autoCollectorLevel')) : 0;
    let autoCollectorCost = 20000 * Math.pow(2, autoCollectorLevel);
    let referralCount = localStorage.getItem('referralCount') ? parseInt(localStorage.getItem('referralCount')) : 0;
    let dailyBonusClaimed = localStorage.getItem('dailyBonusClaimed') ? JSON.parse(localStorage.getItem('dailyBonusClaimed')) : false;
    let lastLoginTime = localStorage.getItem('lastLoginTime') ? parseInt(localStorage.getItem('lastLoginTime')) : Date.now();

    homeScore.innerText = `Coins Collected: ${balance}`;
    upgradeCostElement.innerText = upgradeCost;
    coinValueElement.innerText = coinValue;
    coinCountText.innerText = `${coinCount} / 10000`;
    autoCollectorLevelElement.innerText = autoCollectorLevel;
    autoCollectorCost = Math.pow(2, autoCollectorLevel) * 20000;
    referralLink.value = `${window.location.origin}?ref=${generateReferralCode()}`;
    friendsCountElement.innerText = `Friends Referred: ${referralCount}`;
    updateReferralReward();

    if (!dailyBonusClaimed) {
        setBonusTimer();
    } else {
        updateBonusMessage();
    }

    // Обновление монет каждые 10 секунд
    setInterval(() => {
        if (coinCount < 10000) {
            coinCount += 50;
            if (coinCount > 10000) {
                coinCount = 10000;
            }
            coinCountText.innerText = `${coinCount} / 10000`;
            localStorage.setItem('coinCount', coinCount);
        }
    }, 10000);

    // Обработчик кликов на коин
    coin.addEventListener('click', function () {
        if (coinCount > 0) {
            balance += coinValue;
            coinCount -= coinValue;

            homeScore.innerText = `Coins Collected: ${balance}`;
            coinCountText.innerText = `${coinCount} / 10000`;

            localStorage.setItem('balance', balance);
            localStorage.setItem('coinCount', coinCount);
        } else {
            alert('Out of coins! Wait for more coins to be generated.');
        }
    });

    // Обработчик кнопки улучшения
    upgradeButton.addEventListener('click', function () {
        if (balance >= upgradeCost) {
            balance -= upgradeCost;
            coinValue += 1;
            upgradeCost = coinValue * 50;

            homeScore.innerText = `Coins Collected: ${balance}`;
            upgradeCostElement.innerText = upgradeCost;
            coinValueElement.innerText = coinValue;

            localStorage.setItem('balance', balance);
            localStorage.setItem('coinValue', coinValue);
            localStorage.setItem('upgradeCost', upgradeCost);
        } else {
            alert('Not enough coins!');
        }
    });

    // Обработчик кнопки автоматического сбора
    autoCollectorButton.addEventListener('click', function () {
        if (balance >= autoCollectorCost) {
            balance -= autoCollectorCost;
            autoCollectorLevel += 1;
            autoCollectorCost = 20000 * Math.pow(2, autoCollectorLevel);

            homeScore.innerText = `Coins Collected: ${balance}`;
            autoCollectorLevelElement.innerText = autoCollectorLevel;
            autoCollectorButton.innerText = `Buy Auto Collector (Level: ${autoCollectorLevel}, Cost: ${autoCollectorCost} coins)`;

            localStorage.setItem('balance', balance);
            localStorage.setItem('autoCollectorLevel', autoCollectorLevel);

            if (autoCollectorLevel === 1) {
                startAutoCollector();
            }
        } else {
            alert('Not enough coins!');
        }
    });

    // Обработчик копирования ссылки
    copyLinkButton.addEventListener('click', function () {
        referralLink.select();
        document.execCommand('copy');
        alert('Referral link copied to clipboard!');
    });

    // Обработчик получения ежедневного бонуса
    claimBonusButton.addEventListener('click', function () {
        if (!dailyBonusClaimed) {
            const daysPassed = Math.floor((Date.now() - lastLoginTime) / (24 * 60 * 60 * 1000));
            const dailyBonus = Math.min(50 * Math.pow(3.5, daysPassed), 1000000);

            balance += dailyBonus;
            dailyBonusClaimed = true;
            lastLoginTime = Date.now();

            homeScore.innerText = `Coins Collected: ${balance}`;
            bonusMessage.innerText = `You have claimed ${dailyBonus} coins!`;
            bonusTimer.innerText = '';
            localStorage.setItem('balance', balance);
            localStorage.setItem('dailyBonusClaimed', dailyBonusClaimed);
            localStorage.setItem('lastLoginTime', lastLoginTime);
        } else {
            alert('Bonus already claimed today!');
        }
    });

    // Обработчик переключения вкладок
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(this.dataset.tab).classList.add('active');
        });
    });

    // Функция запуска автособирания
    function startAutoCollector() {
        setInterval(() => {
            const idleTime = (Date.now() - lastLoginTime) / 1000;
            if (idleTime > 1800) {
                const additionalCoins = Math.floor(idleTime * (autoCollectorLevel < 10 ? 1.6 : 2));
                balance += additionalCoins;

                homeScore.innerText = `Coins Collected: ${balance}`;
                lastLoginTime = Date.now();
                localStorage.setItem('balance', balance);
                localStorage.setItem('lastLoginTime', lastLoginTime);
            }
        }, 10000);
    }

    // Функция установки таймера бонуса
    function setBonusTimer() {
        const nextBonusTime = new Date(lastLoginTime + 24 * 60 * 60 * 1000);
        const interval = setInterval(() => {
            const now = new Date();
            const timeLeft = nextBonusTime - now;
            if (timeLeft > 0) {
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                bonusTimer.innerText = `Next bonus in: ${hours}h ${minutes}m ${seconds}s`;
            } else {
                bonusTimer.innerText = 'Bonus available now!';
                clearInterval(interval);
            }
        }, 1000);
    }

    // Функция обновления сообщения бонуса
    function updateBonusMessage() {
        const daysPassed = Math.floor((Date.now() - lastLoginTime) / (24 * 60 * 60 * 1000));
        const dailyBonus = Math.min(50 * Math.pow(3.5, daysPassed), 1000000);
        bonusMessage.innerText = `You have claimed ${dailyBonus} coins!`;
    }

    // Функция генерации реферального кода
    function generateReferralCode() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Функция обновления вознаграждения за друга
    function updateReferralReward() {
        let reward;
        if (referralCount < 12) {
            reward = 10000 * Math.pow(1.5, referralCount);
        } else if (referralCount < 30) {
            reward = 10000 * Math.pow(1.05, referralCount - 12) * Math.pow(1.5, 12);
        } else {
            reward = 3500000;
        }
        localStorage.setItem('referralReward', reward);
    }
});
