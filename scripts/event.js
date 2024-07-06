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
                card.textContent = `Card ${j + 1}`;
                card.addEventListener('click', () => handleCardClick(card, cardKey));
                tabContent.appendChild(card);
            }
        }
    }

    // Обработка кликов по карточкам
    function handleCardClick(card, cardKey) {
        const currentPrice = parseInt(card.dataset.price);
        const message = `Do you want to buy for ${currentPrice} coins?`;
        if (confirm(message)) {
            const newPrice = currentPrice * 2;
            card.dataset.price = newPrice;
            setCookie(cardKey, newPrice, 365);
        }
    }
});
