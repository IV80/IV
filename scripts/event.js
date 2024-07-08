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

    // Функция установки куки
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Функция получения куки
    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) === 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }

    // Функции для работы с балансом
    function getBalance() {
        return parseInt(document.getElementById('coin-count').innerText.split(' ')[0]);
    }

    function updateBalance(newBalance) {
        document.getElementById('coin-count').innerText = `${newBalance} / 10000`;
    }

    // Функция для сохранения прогресса (если требуется)
    function saveProgress() {
        // Логика сохранения прогресса (может быть отправка данных на сервер или сохранение в localStorage)
        console.log('Progress saved');
    }

    // Функция для обновления отображения (если требуется)
    function updateEventDisplay() {
        // Логика для обновления отображения вкладки Event (может быть обновление элементов интерфейса)
        console.log('Event display updated');
    }

    // Названия карточек для всех вкладок
    const cardTitles = {
        tab1: [
            'Card 1.1', 'Card 1.2', 'Card 1.3', 'Card 1.4', 'Card 1.5', 'Card 1.6', 'Card 1.7', 'Card 1.8', 'Card 1.9', 'Card 1.10',
            'Card 1.11', 'Card 1.12', 'Card 1.13', 'Card 1.14', 'Card 1.15', 'Card 1.16', 'Card 1.17', 'Card 1.18', 'Card 1.19', 'Card 1.20'
        ],
        tab2: [
            'Card 2.1', 'Card 2.2', 'Card 2.3', 'Card 2.4', 'Card 2.5', 'Card 2.6', 'Card 2.7', 'Card 2.8', 'Card 2.9', 'Card 2.10',
            'Card 2.11', 'Card 2.12', 'Card 2.13', 'Card 2.14', 'Card 2.15', 'Card 2.16', 'Card 2.17', 'Card 2.18', 'Card 2.19', 'Card 2.20'
        ],
        tab3: [
            'Card 3.1', 'Card 3.2', 'Card 3.3', 'Card 3.4', 'Card 3.5', 'Card 3.6', 'Card 3.7', 'Card 3.8', 'Card 3.9', 'Card 3.10',
            'Card 3.11', 'Card 3.12', 'Card 3.13', 'Card 3.14', 'Card 3.15', 'Card 3.16', 'Card 3.17', 'Card 3.18', 'Card 3.19', 'Card 3.20'
        ],
        tab4: [
            'Card 4.1', 'Card 4.2', 'Card 4.3', 'Card 4.4', 'Card 4.5', 'Card 4.6', 'Card 4.7', 'Card 4.8', 'Card 4.9', 'Card 4.10',
            'Card 4.11', 'Card 4.12', 'Card 4.13', 'Card 4.14', 'Card 4.15', 'Card 4.16', 'Card 4.17', 'Card 4.18', 'Card 4.19', 'Card 4.20'
        ],
        tab5: [
            'Card 5.1', 'Card 5.2', 'Card 5.3', 'Card 5.4', 'Card 5.5', 'Card 5.6', 'Card 5.7', 'Card 5.8', 'Card 5.9', 'Card 5.10',
            'Card 5.11', 'Card 5.12', 'Card 5.13', 'Card 5.14', 'Card 5.15', 'Card 5.16', 'Card 5.17', 'Card 5.18', 'Card 5.19', 'Card 5.20'
        ],
    };

    // Генерация карточек для всех вкладок
    const cardCount = 20;
    const cardInitialPrice = 10;

    for (let i = 1; i <= 5; i++) {
        const tabContent = document.querySelector(`#tab-${i} .card-container`);
        if (tabContent) {
            for (let j = 0; j < cardCount; j++) {
                const card = document.createElement('div');
                card.className = 'event-card';
                const cardKey = `tab${i}_card${j}`;
                let currentPrice = getCookie(cardKey);
                if (!currentPrice) {
                    currentPrice = cardInitialPrice;
                }
                card.dataset.price = currentPrice;
                card.dataset.title = cardTitles[`tab${i}`][j];
                card.textContent = cardTitles[`tab${i}`][j];
                card.addEventListener('click', () => handleCardClick(card, cardKey));
                tabContent.appendChild(card);
            }
        }
    }

    // Обработка кликов по карточкам
    function handleCardClick(card, cardKey) {
        const currentPrice = parseInt(card.dataset.price);
        const cardTitle = card.dataset.title;
        showModal(cardTitle, currentPrice, () => {
            const balance = getBalance();
            if (balance >= currentPrice) {
                const newPrice = currentPrice * 2;
                card.dataset.price = newPrice;
                setCookie(cardKey, newPrice, 365);
                updateBalance(balance - currentPrice);
                updateEventDisplay();
                saveProgress();
                hideModal();
            } else {
                alert('Not enough coins to make this purchase.');
            }
        });
    }

    // Функция показа модального окна
    function showModal(title, price, onConfirm) {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const modalTitle = document.createElement('h2');
        modalTitle.textContent = `Do you want to buy "${title}" for ${price} coins?`;
        modalContent.appendChild(modalTitle);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'modal-button-container';

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Buy';
        confirmButton.className = 'modal-button';
        confirmButton.addEventListener('click', onConfirm);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.className = 'modal-button';
        cancelButton.addEventListener('click', hideModal);

        buttonContainer.appendChild(confirmButton);
        buttonContainer.appendChild(cancelButton);

        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    // Функция скрытия модального окна
    function hideModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }
});
