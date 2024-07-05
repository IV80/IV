// Shop.js
document.addEventListener("DOMContentLoaded", function() {
    const tabButtons = document.querySelectorAll('#shop-tabs .tab-button');
    const tabs = document.querySelectorAll('.shop-tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabs.forEach(tab => tab.style.display = 'none');
            document.getElementById(button.dataset.tab).style.display = 'block';
        });
    });

    document.querySelector('#shop-tabs .tab-button[data-tab="shop-tab-1"]').click(); // Отображаем первую вкладку по умолчанию
});
