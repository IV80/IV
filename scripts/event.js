document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button[data-tab^="tab-"]');
    const tabContents = document.querySelectorAll('.event-tab-content');

    // Переключение вкладок
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            tabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });

    // Генерация карточек для всех вкладок
    const cardCount = 20;
    const cardInitialPrice = 10;

    for (let i = 1; i <= 5; i++) {
        const tabContent = document.querySelector(`#tab-${i} .card-container`);
        if (tabContent) {
            for (let j = 0; j < cardCount; j++) {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.dataset.price = cardInitialPrice;
                card.textContent = `Card ${j + 1}`;
                card.addEventListener('click', () => handleCardClick(card));
                tabContent.appendChild(card);
            }
        }
    }

    // Обработка кликов по карточкам
    function handleCardClick(card) {
        const currentPrice = parseInt(card.dataset.price);
        const message = `Do you want to buy for ${currentPrice} coins?`;
        if (confirm(message)) {
            card.dataset.price = currentPrice * 2;
        }
    }
});
