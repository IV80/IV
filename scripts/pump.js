// scripts/pump.js
document.addEventListener('DOMContentLoaded', function() {
    let coinValue = 1;
    let upgradeCost = 100;
    let autoCollectorLevel = 0;
    let autoCollectorCost = 20000;
    const maxCollectorLevel = 20;
    const coinCountElement = document.getElementById('coin-count');
    let coinCount = parseInt(coinCountElement.textContent.split(' / ')[0]);

    function updatePumpDisplay() {
        document.getElementById('upgradeCost').textContent = upgradeCost;
        document.getElementById('coinValue').textContent = coinValue;
        document.getElementById('autoCollectorCost').textContent = autoCollectorCost;
        document.getElementById('autoCollectorLevel').textContent = autoCollectorLevel;
    }

    document.getElementById('upgradeButton').addEventListener('click', () => {
        if (coinCount >= upgradeCost) {
            coinCount -= upgradeCost;
            coinValue += 1; // Increase coin value
            upgradeCost *= 3; // Increase upgrade cost by 3 times
            updatePumpDisplay();
        }
    });

    document.getElementById('autoCollectorButton').addEventListener('click', () => {
        if (coinCount >= autoCollectorCost && autoCollectorLevel < maxCollectorLevel) {
            coinCount -= autoCollectorCost;
            autoCollectorLevel++;
            autoCollectorCost *= 2; // Increase cost by 2 times
            updatePumpDisplay();
        }
    });

    updatePumpDisplay();
});
