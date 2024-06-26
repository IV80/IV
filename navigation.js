// scripts/navigation.js
document.addEventListener('DOMContentLoaded', function() {
    const tabs = {
        home: document.getElementById('home'),
        pump: document.getElementById('pump'),
        friends: document.getElementById('friends'),
        dailyBonus: document.getElementById('daily-bonus'),
        trade: document.getElementById('trade')
    };

    function showTab(tabName) {
        for (const tab in tabs) {
            if (tabs.hasOwnProperty(tab)) {
                tabs[tab].classList.remove('active');
            }
        }
        tabs[tabName].classList.add('active');
    }

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');
            showTab(tab);
        });
    });
});
