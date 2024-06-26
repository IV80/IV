// scripts/app.js
document.addEventListener('DOMContentLoaded', function() {
    // Load and initialize all components
    const tabs = ['home', 'pump', 'friends', 'daily-bonus', 'trade'];

    tabs.forEach(tab => {
        const tabContent = document.createElement('div');
        tabContent.id = tab;
        tabContent.classList.add('tab-content');
        if (tab === 'home') {
            tabContent.classList.add('active');
        }
        document.getElementById('content').appendChild(tabContent);
    });

    // Initialize each tab
    showTab('home');
});

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}
