// scripts/pump.js
document.addEventListener('DOMContentLoaded', function() {
    let coinValue = 1;
    let upgradeCost = 100;
    let autoCollectorLevel = 0;
    let autoCollectorCost = 20000;
    const maxCollectorLevel = 20;

    function updatePumpDisplay() {
        document.getElementById('upgradeCost').textContent = upgradeCost;
        document.getElementById('coinValue').textContent = coinValue;
        document.getElementById('autoCollectorCost').textContent = autoCollectorCost;
        document.getElementById('autoCollectorLevel').textContent = autoCollectorLevel;
    }

    async function saveProgress() {
        const userId = localStorage.getItem('userId');
        const data = {
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
                body: JSON.stringify({ userId, ...data })
            });
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    async function loadProgress() {
        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch(`http://localhost:3000/load/${userId}`);
            const data = await response.json();

            if (data) {
                coinValue = data.coinValue || 1;
                upgradeCost = data.upgradeCost || 100;
                autoCollectorLevel = data.autoCollectorLevel || 0;
                autoCollectorCost = data.autoCollectorCost || 20000;
            }

            updatePumpDisplay();
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    document.getElementById('upgradeButton').addEventListener('click', () => {
        const coinCountElement = document.getElementById('home-score');
        let coinCount = parseInt(coinCountElement.textContent);
        if (coinCount >= upgradeCost) {
            coinCount -= upgradeCost;
            coinValue += 1;  // Увеличиваем значение монеты
            upgradeCost *= 3;  // Увеличиваем стоимость улучшения в 3 раза
            coinCountElement.textContent = coinCount;
            updatePumpDisplay();
            saveProgress();
        }
    });

    document.getElementById('autoCollectorButton').addEventListener('click', () => {
        const coinCountElement = document.getElementById('home-score');
        let coinCount = parseInt(coinCountElement.textContent);
        if (coinCount >= autoCollectorCost && autoCollectorLevel < maxCollectorLevel) {
            coinCount -= autoCollectorCost;
            autoCollectorLevel++;
            autoCollectorCost *= 2;  // Увеличиваем стоимость в 2 раза
            coinCountElement.textContent = coinCount;
            updatePumpDisplay();
            saveProgress();
        }
    });

    loadProgress();
    updatePumpDisplay();
});
