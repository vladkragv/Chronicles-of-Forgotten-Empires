// ============================================
// CARDS.JS - Функциональность страницы карт
// ============================================

let currentCards = [];
let currentFilter = '';
let currentSort = 'name';

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadCardsFromStorage();
    renderCards(currentCards);
    setupEventListeners();
});

// Загрузить карты из localStorage
function loadCardsFromStorage() {
    currentCards = getStorageCards();
    if (!currentCards || currentCards.length === 0) {
        currentCards = [...CARDS_DATABASE];
    }
}

// Обновить карты при изменениях в localStorage
function updateCardsFromStorage() {
    loadCardsFromStorage();
    currentCards = getCardsByType(currentFilter);
    currentCards = sortCards(currentCards, currentSort);
    renderCards(currentCards);
}

// Отслеживать изменения в localStorage
window.addEventListener('storage', () => {
    updateCardsFromStorage();
});

// Установка обработчиков событий
function setupEventListeners() {
    // Поиск
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            if (query) {
                currentCards = searchCards(query);
                currentFilter = '';
                document.querySelectorAll('.card-tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector('[data-type=""]').classList.add('active');
            } else {
                currentCards = getCardsByType(currentFilter);
            }
            renderCards(currentCards);
        });
    }

    // Фильтры по типу
    const filterType = document.getElementById('filterType');
    if (filterType) {
        filterType.addEventListener('change', (e) => {
            currentFilter = e.target.value;
            
            // Очистить поиск
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = '';
            }
            
            // Обновить активную вкладку
            const cardTabBtns = document.querySelectorAll('.card-tab-btn');
            cardTabBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.type === currentFilter);
            });
            
            currentCards = getCardsByType(currentFilter);
            currentCards = sortCards(currentCards, currentSort);
            renderCards(currentCards);
        });
    }

    // Сортировка
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        sortBy.addEventListener('change', (e) => {
            currentSort = e.target.value;
            currentCards = sortCards(currentCards, currentSort);
            renderCards(currentCards);
        });
    }

    // Вкладки типов карт
    const cardTabBtns = document.querySelectorAll('.card-tab-btn');
    cardTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.type;
            
            // Очистить поиск
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = '';
            }
            
            // Обновить фильтр селекта
            const filterType = document.getElementById('filterType');
            if (filterType) {
                filterType.value = currentFilter;
            }
            
            currentCards = getCardsByType(currentFilter);
            currentCards = sortCards(currentCards, currentSort);
            
            // Обновить активную вкладку
            cardTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            renderCards(currentCards);
        });
    });

    // Кнопка сброса фильтров
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentFilter = '';
            currentSort = 'name';
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = '';
            const filterType = document.getElementById('filterType');
            if (filterType) filterType.value = '';
            const sortBy = document.getElementById('sortBy');
            if (sortBy) sortBy.value = 'name';
            
            cardTabBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.type === '');
            });
            
            currentCards = getCardsByType('');
            currentCards = sortCards(currentCards, 'name');
            renderCards(currentCards);
        });
    }

    // Закрытие модала
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    const backToList = document.getElementById('backToList');
    if (backToList) {
        backToList.addEventListener('click', closeModal);
    }

    // Закрытие модала при клике вне его
    const modal = document.getElementById('cardModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// Рендер карт
function renderCards(cards) {
    const cardsGrid = document.getElementById('cardsGrid');
    const catacombs = document.getElementById('catacombs-special');
    const noResults = document.getElementById('noResults');
    
    if (!cardsGrid) return;

    // Фильтруем Входы в катакомбы для отдельного отображения
    let displayCards = cards.filter(card => card.type !== 'catacombs');
    let hasEntrance = cards.some(card => card.type === 'catacombs');

    if (displayCards.length === 0 && !hasEntrance) {
        cardsGrid.innerHTML = '';
        catacombs.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    catacombs.style.display = hasEntrance ? 'grid' : 'none';

    cardsGrid.innerHTML = displayCards.map(card => createCardElement(card)).join('');

    // Добавить обработчики кликов через data атрибут
    document.querySelectorAll('.card-container').forEach((element) => {
        element.addEventListener('click', () => {
            const cardId = parseInt(element.dataset.cardId);
            const allCards = getStorageCards();
            const card = allCards.find(c => c.id === cardId);
            if (card) openCardModal(card);
        });
    });

    // Добавить обработчик клика для карты Входа в Катакомбы
    const catacombsCard = document.querySelector('#catacombs-special .card-container');
    if (catacombsCard) {
        catacombsCard.addEventListener('click', () => {
            const cardId = parseInt(catacombsCard.dataset.cardId);
            const allCards = getStorageCards();
            const card = allCards.find(c => c.id === cardId);
            if (card) openCardModal(card);
        });
    }
}

// Создать элемент карты
function createCardElement(card) {
    const typeLabel = CARD_TYPES[card.type] || card.type;
    const typeClass = `type-${card.type}`;
    
    let statsHtml = '';
    if (card.atk > 0) statsHtml += `<span>⚔️ АТК: ${card.atk}</span>`;
    if (card.hp > 0) statsHtml += `<span>❤️ ХР: ${card.hp}</span>`;
    if (card.mana > 0) statsHtml += `<span>💎 МР: ${card.mana}</span>`;
    if (card.quantity) statsHtml += `<span>📦 Кол-во: ${card.quantity}</span>`;

    // Для гибридных карт показываем обе роли
    let typeHtml = '';
    if (card.hybrid && card.hybridTypes && card.hybridTypes.length > 0) {
        typeHtml = `<div class="card-type-hybrid">
            <span class="card-type ${typeClass}">${typeLabel}</span>
            ${card.hybridTypes.map(hybridType => `<span class="card-type type-${hybridType}">${CARD_TYPES[hybridType]}</span>`).join('')}
        </div>`;
    } else {
        typeHtml = `<p class="card-type ${typeClass}">${typeLabel}</p>`;
    }

    let hybridNote = '';
    if (card.hybrid && card.hybridTypes) {
        const hybridTypes = card.hybridTypes.map(t => CARD_TYPES[t]).join(', ');
        hybridNote = `<p class="card-note">🔗 ГИБРИДНАЯ: ${hybridTypes}</p>`;
    }

    return `
        <div class="card-item">
            <div class="card-container" data-card-id="${card.id}">
                <img src="images/cards/${card.image}" alt="${card.name}" class="card-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22200%22%3E%3Crect fill=%22%23334155%22 width=%22180%22 height=%22200%22/%3E%3Ctext x=%2290%22 y=%22100%22 text-anchor=%22middle%22 fill=%22%23f1f5f9%22 font-size=%2214%22%3E${card.name}%3C/text%3E%3C/svg%3E'">
                <div class="card-info">
                    <h4>${card.name}</h4>
                    ${typeHtml}
                    <div class="card-stats">
                        ${statsHtml}
                    </div>
                    <p class="card-description">${card.ability}</p>
                    ${hybridNote}
                </div>
            </div>
        </div>
    `;
}

// Открыть модал с картой
function openCardModal(card) {
    const modal = document.getElementById('cardModal');
    const modalCardImage = document.getElementById('modalCardImage');
    const modalCardName = document.getElementById('modalCardName');
    const modalCardType = document.getElementById('modalCardType');
    const modalCardStats = document.getElementById('modalCardStats');
    const modalCardAbility = document.getElementById('modalCardAbility');
    const modalCardNote = document.getElementById('modalCardNote');

    if (!modal) return;

    const typeLabel = CARD_TYPES[card.type] || card.type;
    const typeClass = `type-${card.type}`;

    modalCardImage.src = `images/cards/${card.image}`;
    modalCardImage.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23334155%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%23f1f5f9%22 font-size=%2220%22%3E' + card.name + '%3C/text%3E%3C/svg%3E';
    };
    
    modalCardName.textContent = card.name;
    modalCardType.textContent = typeLabel;
    modalCardType.className = `card-type ${typeClass}`;
    modalCardAbility.textContent = card.ability;

    // Статистика
    let statsHtml = '';
    if (card.atk > 0) statsHtml += `<span><strong>⚔️ Атака:</strong> ${card.atk}</span>`;
    if (card.hp > 0) statsHtml += `<span><strong>❤️ Жизнь:</strong> ${card.hp}</span>`;
    if (card.mana > 0) statsHtml += `<span><strong>💎 Стоимость МР:</strong> ${card.mana}</span>`;
    if (card.quantity) statsHtml += `<span><strong>📦 В колоде:</strong> ${card.quantity} шт.</span>`;

    modalCardStats.innerHTML = statsHtml;

    // Гибридная карта
    if (card.hybrid && card.hybridTypes) {
        const hybridTypes = card.hybridTypes.map(t => CARD_TYPES[t]).join(' и ');
        modalCardNote.textContent = `🔗 Эта карта считается ${hybridTypes}`;
        modalCardNote.style.display = 'block';
    } else {
        modalCardNote.style.display = 'none';
    }

    modal.classList.add('active');
}

// Закрыть модал
function closeModal() {
    const modal = document.getElementById('cardModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Закрытие модала по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
