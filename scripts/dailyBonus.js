// scripts/dailyBonus.js
document.addEventListener('DOMContentLoaded', () => {
    const claimBonusButton = document.getElementById('claimBonusButton');
    const bonusMessage = document.getElementById('bonusMessage');
    const bonusTimer = document.getElementById('bonusTimer');

    let state = {
        dailyBonusCollectedAt: JSON.parse(localStorage.getItem('dailyBonusCollectedAt')) || null,
        coins: JSON.parse(localStorage.getItem('coins')) || 0,
    };

    function saveState() {
        localStorage.setItem('dailyBonusCollectedAt', JSON.stringify(state.dailyBonusCollectedAt));
        localStorage.setItem('coins', JSON.stringify(state.coins));
    }

    function updateUI() {
        if (state.dailyBonusCollectedAt) {
            const lastCollected = new Date(state.dailyBonusCollectedAt);
            const now = new Date();
            const hoursSinceLastCollected = (now - lastCollected) / (1000 * 60 * 60);

            if (hoursSinceLastCollected < 24) {
                claimBonusButton.disabled = true;
                const hoursLeft = 24 - Math.floor(hoursSinceLastCollected);
                bonusTimer.textContent = `You can claim your next bonus in ${hoursLeft} hours.`;
                bonusMessage.textContent = '';
                return;
            }
        }

        claimBonusButton.disabled = false;
        bonusTimer.textContent = '';
    }

    claimBonusButton.addEventListener('click', () => {
        const now = new Date();
        state.dailyBonusCollectedAt = now.toISOString();
        state.coins += 500; // Example bonus amount
        saveState();
        updateUI();
        bonusMessage.textContent = 'You have successfully claimed your daily bonus!';
    });

    updateUI();
});
