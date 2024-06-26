// scripts/dailyBonus.js
document.addEventListener('DOMContentLoaded', function() {
    const claimBonusButton = document.getElementById('claimBonusButton');
    const bonusMessage = document.getElementById('bonusMessage');
    const bonusTimer = document.getElementById('bonusTimer');
    let currentDay = 1;
    let bonusAmount = 50;
    let claimAvailable = true;

    function updateBonusDisplay() {
        if (claimAvailable) {
            bonusMessage.textContent = `Day ${currentDay}: Claim ${bonusAmount} coins`;
        } else {
            bonusMessage.textContent = `Come back tomorrow for your daily bonus!`;
        }
    }

    function startBonusTimer() {
        let timeLeft = 86400; // 24 hours in seconds
        setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                const hours = Math.floor(timeLeft / 3600);
                const minutes = Math.floor((timeLeft % 3600) / 60);
                const seconds = timeLeft % 60;
                bonusTimer.textContent = `Next bonus in: ${hours}h ${minutes}m ${seconds}s`;
            }
        }, 1000);
    }

    claimBonusButton.addEventListener('click', () => {
        if (claimAvailable) {
            // Add bonusAmount to user's balance
            currentDay++;
            bonusAmount = Math.min(bonusAmount * 3.5, 1000000);
            if (currentDay > 20) {
                currentDay = 1;
                bonusAmount = 50;
            }
            claimAvailable = false;
            updateBonusDisplay();
            startBonusTimer();
        }
    });

    updateBonusDisplay();
});
