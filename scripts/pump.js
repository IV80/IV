// scripts/pump.js
document.addEventListener('DOMContentLoaded', () => {
    const upgradeButton = document.getElementById('upgradeButton');
    const autoCollectorButton = document.getElementById('autoCollectorButton');
    const coinValueElem = document.getElementById('coinValue');
    const autoCollectorLevelElem = document.getElementById('autoCollectorLevel');

    let state = {
        coins: JSON.parse(localStorage.getItem('coins')) || 0,
        coinValue: JSON.parse(localStorage.getItem('coinValue')) || 1,
        upgradeCost: JSON.parse(localStorage.getItem('upgradeCost')) || 100,
        autoCollectorLevel: JSON.parse(localStorage.getItem('autoCollectorLevel')) || 0,
        autoCollectorCost: JSON.parse(localStorage.getItem('autoCollectorCost')) || 20000,
    };

    function updateUI() {
        coinValueElem.textContent = state.coinValue;
        autoCollectorLevelElem.textContent = state.autoCollectorLevel;
        document.getElementById('upgradeCost').textContent = state.upgradeCost;
        document.getElementById('autoCollectorCost').textContent = state.autoCollectorCost;
    }

    function saveState() {
        localStorage.setItem('coins', JSON.stringify(state.coins));
        localStorage.setItem('coinValue', JSON.stringify(state.coinValue));
        localStorage.setItem('upgradeCost', JSON.stringify(state.upgradeCost));
        localStorage.setItem('autoCollectorLevel', JSON.stringify(state.autoCollectorLevel));
        localStorage.setItem('autoCollectorCost', JSON.stringify(state.autoCollectorCost));
    }

    upgradeButton.addEventListener('click', () => {
        if (state.coins >= state.upgradeCost) {
            state.coins -= state.upgradeCost;
            state.coinValue += 1;
            state.upgradeCost *= 2;
            saveState();
            updateUI();
        }
    });

    autoCollectorButton.addEventListener('click', () => {
        if (state.coins >= state.autoCollectorCost) {
            state.coins -= state.autoCollectorCost;
            state.autoCollectorLevel += 1;
            state.autoCollectorCost *= 2;
            saveState();
            updateUI();
        }
    });

    updateUI();
});
