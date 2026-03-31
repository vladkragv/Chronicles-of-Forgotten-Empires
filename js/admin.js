// ============================================
// ADMIN.JS - Административная панель
// ============================================

const ADMIN_PASSWORD = 'admin-vladkragv';
const ADMIN_LOGIN = 'admin-vladkragv';

let isLoggedIn = false;
let currentEditingCardId = null;
let currentEditingRuleSection = null;

// Разделы подробных правил
const DETAILED_RULES_SECTIONS = [
    { id: 'components', title: '1. Компоненты игры' },
    { id: 'preparation', title: '2. Подготовка к игре' },
    { id: 'playerTurn', title: '3. Ход игрока' },
    { id: 'cardTypes', title: '4. Типы карт' },
    { id: 'combat', title: '5. Боевые правила' },
    { id: 'catacombs', title: '6. Катакомбы' },
    { id: 'winConditions', title: '7. Условия победы/поражения' },
    { id: 'examples', title: '8. Примеры ситуаций' }
];

// ============================================
// УПРАВЛЕНИЕ ВХОДОМ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Проверить, вошли ли уже
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        isLoggedIn = true;
        showAdminPanel();
    } else {
        showLoginPanel();
    }

    setupLoginForm();
    setupAdminPanel();
});

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }
}

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('loginError');

    if (username === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
        isLoggedIn = true;
        sessionStorage.setItem('adminLoggedIn', 'true');
        errorMsg.classList.remove('show');
        showAdminPanel();
    } else {
        errorMsg.textContent = '❌ Неверный логин или пароль!';
        errorMsg.classList.add('show');
    }
}

function handleLogout() {
    isLoggedIn = false;
    sessionStorage.removeItem('adminLoggedIn');
    showLoginPanel();
    document.getElementById('loginForm').reset();
}

function showLoginPanel() {
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('adminContainer').style.display = 'none';
}

function showAdminPanel() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminContainer').style.display = 'block';
    loadAdminData();
}

// ============================================
// НАСТРОЙКА АДМИННОЙ ПАНЕЛИ
// ============================================

function setupAdminPanel() {
    // Кнопка выхода
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Навигация по вкладкам
    const navBtns = document.querySelectorAll('.admin-nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            switchAdminTab(tabName);
        });
    });

    // ГЛАВНАЯ
    document.getElementById('saveHomeBtn')?.addEventListener('click', saveHomeData);

    // КАРТЫ
    document.getElementById('addCardBtn')?.addEventListener('click', openNewCardModal);
    document.getElementById('searchCardInput')?.addEventListener('input', (e) => {
        searchCards(e.target.value);
    });

    // НАСТРОЙКИ
    document.getElementById('saveColorsBtn')?.addEventListener('click', saveColorsData);
    document.getElementById('exportDataBtn')?.addEventListener('click', exportAllData);
    document.getElementById('importDataBtn')?.addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile')?.addEventListener('change', handleImportData);
    document.getElementById('resetDataBtn')?.addEventListener('click', resetAllData);

    // МОДАЛ
    document.getElementById('cardEditClose')?.addEventListener('click', closeCardModal);
    document.getElementById('cardEditForm')?.addEventListener('submit', saveCardData);
    document.getElementById('deleteCardBtn')?.addEventListener('click', deleteCurrentCard);
}

// ============================================
// РАБОТА С ВКЛАДКАМИ
// ============================================

function switchAdminTab(tabName) {
    // Скрыть все панели
    document.querySelectorAll('.admin-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Деактивировать все кнопки навигации
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Показать нужную панель
    const panel = document.getElementById(`${tabName}-panel`);
    if (panel) {
        panel.classList.add('active');
    }

    // Активировать кнопку навигации
    const btn = document.querySelector(`[data-tab="${tabName}"]`);
    if (btn) {
        btn.classList.add('active');
    }

    // Загрузить данные для панели
    if (tabName === 'home') {
        loadHomeData();
    } else if (tabName === 'cards') {
        loadCardsData();
    } else if (tabName === 'settings') {
        loadSettingsData();
    }
}

// ============================================
// ГЛАВНАЯ ВКЛАДКА
// ============================================

function loadHomeData() {
    const gameInfo = getGameInfo();

    document.getElementById('gameTitle').value = gameInfo.title;
    document.getElementById('gameSubtitle').value = gameInfo.subtitle;
    document.getElementById('gameDescription').value = gameInfo.description;
    document.getElementById('companyLogo').value = gameInfo.logo;
    document.getElementById('companyName').value = gameInfo.companyName;
    document.getElementById('videoUrl').value = gameInfo.videoUrl || '';

    // Загрузить имена героев
    const heroNamesContainer = document.getElementById('heroNamesContainer');
    heroNamesContainer.innerHTML = '';

    const data = getAllData();
    data.heroNames.forEach((name, index) => {
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
            <label>Герой ${index + 1}:</label>
            <input type="text" class="form-input hero-name-input" value="${name}" data-index="${index}">
        `;
        heroNamesContainer.appendChild(div);
    });
}

function saveHomeData() {
    const gameInfo = {
        title: document.getElementById('gameTitle').value,
        subtitle: document.getElementById('gameSubtitle').value,
        description: document.getElementById('gameDescription').value,
        logo: document.getElementById('companyLogo').value,
        companyName: document.getElementById('companyName').value,
        videoUrl: document.getElementById('videoUrl').value
    };

    updateGameInfo(gameInfo);

    // Сохранить имена героев
    const heroNames = [];
    document.querySelectorAll('.hero-name-input').forEach(input => {
        heroNames.push(input.value);
    });
    updateHeroNames(heroNames);

    alert('✅ Данные главной страницы сохранены!');
}

function renderCardsList(cards) {
    const container = document.getElementById('cardsListContainer');
    container.innerHTML = '';

    if (cards.length === 0) {
        container.innerHTML = '<p>Карты не найдены</p>';
        return;
    }

    cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card-list-item';
        const type = CARD_TYPES[card.type] || card.type;
        const stats = [];
        if (card.atk > 0) stats.push(`АТК: ${card.atk}`);
        if (card.hp > 0) stats.push(`ХП: ${card.hp}`);
        if (card.mana > 0) stats.push(`МР: ${card.mana}`);

        div.innerHTML = `
            <div class="card-list-info">
                <div class="card-list-name">${card.name}</div>
                <span class="card-list-type">${type}</span>
                <div class="card-list-stats">${stats.join(' • ')}</div>
            </div>
            <button class="btn btn-small card-list-btn" onclick="openCardEditModal(${card.id})">✏️ Редактировать</button>
        `;
        container.appendChild(div);
    });
}

function openNewCardModal() {
    document.getElementById('cardEditId').value = '';
    document.getElementById('cardEditForm').reset();
    document.getElementById('deleteCardBtn').style.display = 'none';
    document.getElementById('cardEditModal').style.display = 'flex';
    currentEditingCardId = null;
}

function openCardEditModal(cardId) {
    const cards = getStorageCards();
    const card = cards.find(c => c.id === cardId);

    if (!card) return;

    currentEditingCardId = cardId;
    document.getElementById('cardEditId').value = cardId;
    document.getElementById('cardEditName').value = card.name;
    document.getElementById('cardEditType').value = card.type;
    document.getElementById('cardEditAtk').value = card.atk || 0;
    document.getElementById('cardEditHp').value = card.hp || 0;
    document.getElementById('cardEditMana').value = card.mana || 0;
    document.getElementById('cardEditAbility').value = card.ability || '';
    document.getElementById('cardEditImage').value = card.image || '';
    document.getElementById('cardEditImageUrl').value = '';

    document.getElementById('deleteCardBtn').style.display = 'inline-block';
    document.getElementById('cardEditModal').style.display = 'flex';
}

function closeCardModal() {
    document.getElementById('cardEditModal').style.display = 'none';
    currentEditingCardId = null;
}

function saveCardData(e) {
    e.preventDefault();

    const cardId = document.getElementById('cardEditId').value;
    const cardData = {
        name: document.getElementById('cardEditName').value,
        type: document.getElementById('cardEditType').value,
        atk: parseInt(document.getElementById('cardEditAtk').value) || 0,
        hp: parseInt(document.getElementById('cardEditHp').value) || 0,
        mana: parseInt(document.getElementById('cardEditMana').value) || 0,
        ability: document.getElementById('cardEditAbility').value,
        image: document.getElementById('cardEditImage').value || 'unknown.jpg'
    };

    if (!cardData.name) {
        alert('⚠️ Укажите название карты');
        return;
    }

    if (cardId) {
        updateCard(parseInt(cardId), cardData);
        alert('✅ Карта обновлена!');
    } else {
        addCard(cardData);
        alert('✅ Новая карта добавлена!');
    }

    closeCardModal();
    loadCardsData();
}

function deleteCurrentCard() {
    if (!currentEditingCardId) return;

    if (confirm('⚠️ Вы уверены, что хотите удалить эту карту?')) {
        deleteCard(currentEditingCardId);
        alert('✅ Карта удалена!');
        closeCardModal();
        loadCardsData();
    }
}

function searchCards(query) {
    const cards = getStorageCards();
    const filtered = cards.filter(card => 
        card.name.toLowerCase().includes(query.toLowerCase()) ||
        card.ability.toLowerCase().includes(query.toLowerCase())
    );
    renderCardsList(filtered);
}

// Загрузить карты для редактирования
function loadCardsData() {
    let cards = getStorageCards();
    
    // Если нет карт в storage, загружаем из CARDS_DATABASE
    if (!cards || cards.length === 0) {
        cards = CARDS_DATABASE.map(card => ({ ...card }));
        const data = getAllData();
        data.cards = cards;
        localStorage.setItem('nastolka_game_data', JSON.stringify(data));
    }
    
    renderCardsList(cards);
}

// ============================================
// ВКЛАДКА ПРАВИЛ
// ============================================
// ВКЛАДКА НАСТРОЕК
// ============================================

function loadSettingsData() {
    const colors = getColors();
    const container = document.getElementById('colorsContainer');
    container.innerHTML = '';

    Object.entries(colors).forEach(([key, color]) => {
        const label = CARD_TYPES[key] || key;
        const div = document.createElement('div');
        div.className = 'color-picker-group';
        div.innerHTML = `
            <label for="color-${key}">${label}:</label>
            <input type="color" id="color-${key}" class="color-picker-input" value="${color}">
            <span class="color-picker-value">${color}</span>
        `;
        container.appendChild(div);

        const input = div.querySelector('input');
        input.addEventListener('change', (e) => {
            div.querySelector('.color-picker-value').textContent = e.target.value;
        });
    });
}

function saveColorsData() {
    const colors = {};
    document.querySelectorAll('.color-picker-input').forEach(input => {
        const key = input.id.replace('color-', '');
        colors[key] = input.value;
    });

    updateColors(colors);
    alert('✅ Цвета сохранены!');
}

// ============================================
// ЭКСПОРТ И ИМПОРТ
// ============================================

function exportAllData() {
    const data = exportData();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', `nastolka_backup_${new Date().getTime()}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    alert('✅ Резервная копия загружена!');
}

function handleImportData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            if (importData(event.target.result)) {
                alert('✅ Данные успешно восстановлены!');
                location.reload();
            } else {
                alert('❌ Ошибка при загрузке файла');
            }
        } catch (error) {
            alert('❌ Неверный формат файла');
        }
    };
    reader.readAsText(file);
}

function resetAllData() {
    if (confirm('⚠️ Это действие восстановит все данные по умолчанию. Все изменения будут потеряны. Вы уверены?')) {
        resetToDefault();
        alert('✅ Данные восстановлены по умолчанию!');
        location.reload();
    }
}

// ============================================
// ЗАГРУЗКА ДАННЫХ АДМИНКИ
// ============================================

function loadAdminData() {
    if (!isLoggedIn) return;
    switchAdminTab('home');
}
