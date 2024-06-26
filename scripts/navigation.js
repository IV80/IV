// scripts/navigation.js
document.addEventListener('DOMContentLoaded', function() {
    function switchTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        localStorage.setItem('activeTab', tabId); // Save active tab in localStorage
    }

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Initialize the first tab or the last active tab
    const activeTab = localStorage.getItem('activeTab') || 'home';
    switchTab(activeTab);
});
