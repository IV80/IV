document.addEventListener('DOMContentLoaded', function() {
    let coinValue = 1;
    let upgradeCost = 100;
    let autoCollectorLevel = 0;
    let autoCollectorCost = 20000;
    const maxCollectorLevel = 20;
    const coinCountElement = document.getElementById('coin-count');
    let coinCount = parseInt(coinCountElement.textContent);

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
        setCookie('coinValue', coinValue, 365);
        setCookie('upgradeCost', upgradeCost, 365);
        setCookie('autoCollectorLevel', autoCollectorLevel, 365);
        setCookie('autoCollectorCost', autoCollectorCost, 365);
    }

    function loadProgress() {
        coinValue = parseInt(getCookie('coinValue') || '1');
        upgradeCost = parseInt(getCookie('upgradeCost') || '100');
        autoCollectorLevel = parseInt(getCookie('autoCollectorLevel') || '0');
        autoCollectorCost = parseInt(getCookie('autoCollectorCost') || '20000');
        updatePumpDisplay();
    }

    function updatePumpDisplay() {
        document.getElementById('upgradeCost').textContent = upgradeCost;
        document.getElementById('coinValue').textContent = coinValue;
        document.getElementById('autoCollectorCost').textContent = autoCollectorCost;
        document.getElementById('autoCollectorLevel').textContent = autoCollectorLevel;
        coinCountElement.textContent = coinCount;
    }

    document.getElementById('upgradeButton').addEventListener('click', () => {
        if (coinCount >= upgradeCost) {
            coinCount -= upgradeCost;
            coinValue += 1;
            upgradeCost *= 3;
            updatePumpDisplay();
            saveProgress();
        }
    });

    document.getElementById('autoCollectorButton').addEventListener('click', () => {
        if (coinCount >= autoCollectorCost && autoCollectorLevel < maxCollectorLevel) {
            coinCount -= autoCollectorCost;
            autoCollectorLevel++;
            autoCollectorCost *= 2;
            updatePumpDisplay();
            saveProgress();
        }
    });

    loadProgress();
});
