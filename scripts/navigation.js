// scripts/navigation.js
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        navButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(tabId).classList.add('active');
    }

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const tabId = e.target.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    switchTab('home');
});
