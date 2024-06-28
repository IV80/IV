// scripts/coin.js
document.addEventListener('DOMContentLoaded', function() {
    const coin = document.getElementById('coin');
    const coinCountBar = document.getElementById('coin-count');
    const homeScore = document.getElementById('home-score');

    // Функции для работы с cookie
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

    // Инициализация значений с использованием cookie
    let coinsCollected = getCookie('coinsCollected') ? parseInt(getCookie('coinsCollected')) : 0;
    let coinLimit = getCookie('coinLimit') ? parseInt(getCookie('coinLimit')) : 10000;
    let coinValue = getCookie('coinValue') ? parseInt(getCookie('coinValue')) : 1;

    function updateCoinCountBar() {
        coinCountBar.textContent = `${coinLimit} / 10000`;
    }

    function addCoins(amount) {
        if (coinLimit >= amount) {
            coinsCollected += amount;
            coinLimit -= amount;
            homeScore.textContent = coinsCollected;
            updateCoinCountBar();
            // Сохранение значений в cookie
            setCookie('coinsCollected', coinsCollected, 365);
            setCookie('coinLimit', coinLimit, 365);
        }
    }

    coin.addEventListener('click', (e) => {
        e.preventDefault(); // Предотвращает стандартное поведение браузера
        addCoins(coinValue);
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
            // Обновление значения в cookie
            setCookie('coinLimit', coinLimit, 365);
        }
    }, 10000);

    coin.addEventListener('touchstart', (e) => {
        e.preventDefault();
        Array.from(e.touches).forEach(() => {
            addCoins(coinValue);
        });
    });
});
