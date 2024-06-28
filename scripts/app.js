document.addEventListener('DOMContentLoaded', function() {
    const coin = document.getElementById('coin');
    const coinCountSpan = document.getElementById('coin-count');
    const coinLimitSpan = document.getElementById('coin-limit');
    const referralLinkInput = document.getElementById('referralLink');
    const friendsCountSpan = document.getElementById('friendsCount');
    const upgradeButton = document.getElementById('upgradeButton');
    const upgradeCostSpan = document.getElementById('upgradeCost');
    const coinValueSpan = document.getElementById('coinValue');
    const autoCollectorButton = document.getElementById('autoCollectorButton');
    const autoCollectorCostSpan = document.getElementById('autoCollectorCost');
    const autoCollectorLevelSpan = document.getElementById('autoCollectorLevel');
    const currentDaySpan = document.getElementById('currentDay');

    let coinsCollected = 0, coinLimit = 10000, coinValue = 1, upgradeCost = 100;
    let autoCollectorLevel = 0, autoCollectorCost = 20000, friendsCount = 0, currentDay = 1;

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const c = cookies[i].trim();
            if (c.startsWith(name + '=')) {
                return c.substring(name.length + 1);
            }
        }
        return '';
    }

    function saveProgress() {
        setCookie('coinsCollected', coinsCollected, 365);
        setCookie('coinLimit', coinLimit, 365);
        setCookie('coinValue', coinValue, 365);
        setCookie('upgradeCost', upgradeCost, 365);
        setCookie('autoCollectorLevel', autoCollectorLevel, 365);
        setCookie('autoCollectorCost', autoCollectorCost, 365);
        setCookie('friendsCount', friendsCount, 365);
        setCookie('currentDay', currentDay, 365);
    }

    function loadProgress() {
        coinsCollected = parseInt(getCookie('coinsCollected') || '0');
        coinLimit = parseInt(getCookie('coinLimit') || '10000');
        coinValue = parseInt(getCookie('coinValue') || '1');
        upgradeCost = parseInt(getCookie('upgradeCost') || '100');
        autoCollectorLevel = parseInt(getCookie('autoCollectorLevel') || '0');
        autoCollectorCost = parseInt(getCookie('autoCollectorCost') || '20000');
        friendsCount = parseInt(getCookie('friendsCount') || '0');
        currentDay = parseInt(getCookie('currentDay') || '1');
        updateUI();
    }

    function updateUI() {
        coinCountSpan.textContent = coinsCollected;
        coinLimitSpan.textContent = coinLimit;
        coinValueSpan.textContent = coinValue;
        upgradeCostSpan.textContent = upgradeCost;
        autoCollectorLevelSpan.textContent = autoCollectorLevel;
        autoCollectorCostSpan.textContent = autoCollectorCost;
        friendsCountSpan.textContent = friendsCount;
        currentDaySpan.textContent = currentDay;
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

    const userReferralCode = getCookie('userReferralCode') || Math.random().toString(36).substring(2, 10);
    setCookie('userReferralCode', userReferralCode, 30);
    referralLinkInput.value = `https://your-app-link/referral?code=${userReferralCode}`;

    loadProgress();

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

    window.addEventListener('storage', function(event) {
        if (event.key === 'coinsCollected' || event.key === 'coinLimit' || 
            event.key === 'coinValue' || event.key === 'upgradeCost' || 
            event.key === 'autoCollectorLevel' || event.key === 'autoCollectorCost' || 
            event.key === 'friendsCount' || event.key === 'currentDay') {
            
            loadProgress();
        }
    });
});
