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

    // Инициализация баланса монет
    let coinCountElement = document.getElementById('coin-count');

    // Функция установки куки
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    }

    // Функция получения куки
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const c = cookies[i].trim();
            if (c.startsWith(name + '=')) {
                return c.substring(name.length + 1);
            }
        }
        return '';
    }

    // Названия карточек для всех вкладок
    const cardTitles = {
        tab1: ['Card 1.1', 'Card 1.2', 'Card 1.3', 'Card 1.4', 'Card 1.5', 'Card 1.6', 'Card 1.7', 'Card 1.8', 'Card 1.9', 'Card 1.10', 'Card 1.11', 'Card 1.12', 'Card 1.13', 'Card 1.14', 'Card 1.15', 'Card 1.16', 'Card 1.17', 'Card 1.18', 'Card 1.19', 'Card 1.20'],
        tab2: ['Card 2.1', 'Card 2.2', 'Card 2.3', 'Card 2.4', 'Card 2.5', 'Card 2.6', 'Card 2.7', 'Card 2.8', 'Card 2.9', 'Card 2.10', 'Card 2.11', 'Card 2.12', 'Card 2.13', 'Card 2.14', 'Card 2.15', 'Card 2.16', 'Card 2.17', 'Card 2.18', 'Card 2.19', 'Card 2.20'],
        tab3: ['Card 3.1', 'Card 3.2', 'Card 3.3', 'Card 3.4', 'Card 3.5', 'Card 3.6', 'Card 3.7', 'Card 3.8', 'Card 3.9', 'Card 3.10', 'Card 3.11', 'Card 3.12', 'Card 3.13', 'Card 3.14', 'Card 3.15', 'Card 3.16', 'Card 3.17', 'Card 3.18', 'Card 3.19', 'Card 3.20'],
        tab4: ['Card 4.1', 'Card 4.2', 'Card 4.3', 'Card 4.4', 'Card 4.5', 'Card 4.6', 'Card 4.7', 'Card 4.8', 'Card 4.9', 'Card 4.10', 'Card 4.11', 'Card 4.12', 'Card 4.13', 'Card 4.14', 'Card 4.15', 'Card 4.16', 'Card 4.17', 'Card 4.18', 'Card 4.19', 'Card 4.20'],
        tab5: ['Card 5.1', 'Card 5.2', 'Card 5.3', 'Card 5.4', 'Card 5.5', 'Card 5.6', 'Card 5.7', 'Card 5.8', 'Card 5.9', 'Card 5.10', 'Card 5.11', 'Card 5.12', 'Card 5.13', 'Card 5.14', 'Card 5.15', 'Card 5.16', 'Card 5.17', 'Card 5.18', 'Card 5.19', 'Card 5.20']
    };

    const cardCount = 20;
    const cardInitialPrice = 10;

    for (let i = 1; i <= 5; i++) {
        const tabContent = document.querySelector(`#tab-${i} .card-container`);
        if (tabContent) {
            for (let j = 0; j < cardCount; j++) {
                const card = document.createElement('div');
                card.className = 'event-card';
                const cardKey = `tab${i}_card${j}`;
                let currentPrice = parseInt(getCookie(cardKey)) || cardInitialPrice;
                card.dataset.price = currentPrice;
                card.dataset.title = cardTitles[`tab${i}`][j];
                card.textContent = `${cardTitles[`tab${i}`][j]} (Цена: ${currentPrice})`;
                card.addEventListener('click', () => handleCardClick(card, cardKey));
                tabContent.appendChild(card);
            }
        }
    }

    function handleCardClick(card, cardKey) {
        const currentPrice = parseInt(card.dataset.price);
        const cardTitle = card.dataset.title;
        showModal(cardTitle, currentPrice, () => {
            if (coin-count >= currentPrice) {
                coin-count -= currentPrice;
                setCookie('coin-count', 365);

                const newPrice = currentPrice * 2;
                card.dataset.price = newPrice;
                card.textContent = `${cardTitle} (Цена: ${newPrice})`;
                setCookie(cardKey, newPrice, 365);
                hideModal();
            } else {
                alert("Недостаточно монет для покупки этой карточки!");
                hideModal();
            }
        });
    }

    function showModal(title, price, onConfirm) {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const modalTitle = document.createElement('h2');
        modalTitle.textContent = `Вы хотите купить "${title}" за ${price} монет?`;
        modalContent.appendChild(modalTitle);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'modal-button-container';

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Купить';
        confirmButton.className = 'modal-button';
        confirmButton.addEventListener('click', onConfirm);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Отмена';
        cancelButton.className = 'modal-button';
        cancelButton.addEventListener('click', hideModal);

        buttonContainer.appendChild(confirmButton);
        buttonContainer.appendChild(cancelButton);

        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    function hideModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }

    function saveProgress() {
        setCookie('coin-count', 365);
    }

    function loadProgress() {
        coin-count = parseInt(getCookie('coin-count')) || 0;
    }

    loadProgress();
});
