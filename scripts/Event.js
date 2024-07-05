// Event.js
document.addEventListener("DOMContentLoaded", function() {
    const tabButtons = document.querySelectorAll('#event-tabs .tab-button');
    const tabs = document.querySelectorAll('.event-tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabs.forEach(tab => tab.style.display = 'none');
            document.getElementById(button.dataset.tab).style.display = 'block';
        });
    });

    tabs.forEach((tab, index) => {
        for (let i = 1; i <= 20; i++) {
            const card = document.createElement('div');
            card.classList.add('event-card');
            card.innerText = `${i + index * 20}`;
            card.dataset.index = i + index * 20;
            card.addEventListener('click', () => showModal(card.dataset.index));
            tab.appendChild(card);
        }
    });

    function showModal(cardIndex) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        const price = calculatePrice(cardIndex);
        modal.innerHTML = `
            <div class="modal-content">
                <p>Do you want to buy for ${price} coins?</p>
                <button id="buy-button">Buy</button>
                <button id="cancel-button">Cancel</button>
            </div>`;
        document.body.appendChild(modal);

        document.getElementById('buy-button').addEventListener('click', () => {
            alert(`Card ${cardIndex} bought for ${price} coins.`);
            document.body.removeChild(modal);
        });
        document.getElementById('cancel-button').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    function calculatePrice(cardIndex) {
        let basePrice = 10;
        if (cardIndex <= 30) {
            return Math.floor(basePrice * Math.pow(1.5, cardIndex - 1));
        } else {
            return Math.floor(basePrice * Math.pow(1.5, 29) * Math.pow(1.2, cardIndex - 30));
        }
    }

    document.querySelector('#event-tabs .tab-button[data-tab="tab-1"]').click(); // Отображаем первую вкладку по умолчанию
});
