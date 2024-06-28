// scripts/dailyBonus.js
document.addEventListener('DOMContentLoaded', function() {
    const claimBonusButton = document.getElementById('claimBonusButton');
    const bonusMessage = document.getElementById('bonusMessage');
    const bonusTimer = document.getElementById('bonusTimer');
    let currentDay = 1;
    let bonusAmount = 50;
    let claimAvailable = true;
    const bonusInterval = 86400; // 24 часа в секундах

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

    function updateBonusDisplay() {
        if (claimAvailable) {
            bonusMessage.textContent = `Day ${currentDay}: Claim ${bonusAmount} coins`;
        } else {
            bonusMessage.textContent = `Come back tomorrow for your daily bonus!`;
        }
    }

    function startBonusTimer(timeLeft) {
        const timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                const hours = Math.floor(timeLeft / 3600);
                const minutes = Math.floor((timeLeft % 3600) / 60);
                const seconds = timeLeft % 60;
                bonusTimer.textContent = `Next bonus in: ${hours}h ${minutes}m ${seconds}s`;
                setCookie('bonusTimeLeft', timeLeft, 1); // Сохраняем оставшееся время в cookie
            } else {
                clearInterval(timerInterval);
                claimAvailable = true;
                updateBonusDisplay();
                setCookie('bonusTimeLeft', 0, -1); // Удаляем cookie с оставшимся временем
                setCookie('lastClaimTime', 0, -1); // Удаляем cookie с последним временем получения бонуса
            }
        }, 1000);
    }

    function calculateTimeLeft(lastClaimTime) {
        const currentTime = Math.floor(Date.now() / 1000);
        const elapsedTime = currentTime - lastClaimTime;
        const timeLeft = bonusInterval - elapsedTime;
        return timeLeft > 0 ? timeLeft : 0;
    }

    // Загрузка времени из cookie
    const lastClaimTime = parseInt(getCookie('lastClaimTime') || '0');
    let timeLeft = calculateTimeLeft(lastClaimTime);

    if (timeLeft > 0) {
        claimAvailable = false;
        startBonusTimer(timeLeft);
    } else {
        claimAvailable = true;
    }

    claimBonusButton.addEventListener('click', () => {
        if (claimAvailable) {
            // Добавление бонусных монет к балансу пользователя
            currentDay++;
            bonusAmount = Math.min(bonusAmount * 3.5, 1000000);
            if (currentDay > 20) {
                currentDay = 1;
                bonusAmount = 50;
            }
            claimAvailable = false;
            updateBonusDisplay();

            const currentTime = Math.floor(Date.now() / 1000);
            setCookie('lastClaimTime', currentTime, 1); // Сохраняем время получения бонуса в cookie
            timeLeft = bonusInterval;
            startBonusTimer(timeLeft);
        }
    });

    updateBonusDisplay();
});
