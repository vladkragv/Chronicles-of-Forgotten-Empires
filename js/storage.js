// ============================================
// STORAGE.JS - Система хранения данных в localStorage
// ============================================

const STORAGE_KEY = 'nastolka_game_data';

// Инициализация хранилища
function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        const initialData = {
            cards: JSON.parse(JSON.stringify(CARDS_DATABASE)),
            gameInfo: {
                title: 'Хроники забытых империй',
                subtitle: 'Эпическая настольная карточная игра о вызове судьбе',
                description: '«Хроники забытых империй» — стратегическая карточная игра для 2 - 6 игроков, где вы выбираете уникального героя и ведёте его через опасные подземелья, собирая артефакты и противостоя врагам. Каждая партия занимает 30–60 минут и требует как удачи, так и тактического мышления. Комбинируйте способности карт, управляйте ресурсами маны и стройте правильную стратегию атаки, чтобы остаться последним выжившим!',
                logo: '⚔️',
                companyName: 'ЭНТУЗИАСТ',
                videoUrl: '' // URL видео для фона (можно добавить позже)
            },
            heroNames: [
                'Воин Света',
                'Тёмный Маг',
                'Охотница',
                'Паладин',
                'Некромант',
                'Волшебник',
                'Защитник',
                'Убийца',
                'Жрица',
                'Варвар',
                'Чародей',
                'Паруса Ветра'
            ],
            rules: {
                quick: 'Каждый вытягивает героя и начинает с 3 МР. В свой ход: добави карты (максимум 3 в руке), разыгрывай существ (потратив МР), атакуй противников, восстанови 3 МР. Герой, у которого осталось 0 ХП, выбывает. Последний выживший герой побеждает!',
                detailed: 'Полное описание правил...'
            },
            aboutGame: {
                history: '«Хроники забытых империй» появились как результат долгого развития идеи о создании карточной игры, которая сочетала бы простоту правил с глубокой стратегией. Вдохновение пришло из классических фэнтези-произведений и видеоигр с похожей тематикой.',
                concept: 'Мир «Хроники забытых империй» — это мрачный фэнтези-сеттинг, где разрушенная цивилизация оставила после себя сложную систему подземелий, артефактов и магии.',
                tips: []
            },
            colors: {
                heroes: '#22c55e',
                beasts: '#f97316',
                demons: '#dc2626',
                spirits: '#8b5cf6',
                undead: '#6366f1',
                dragons: '#d97706',
                orcs: '#14b8a6',
                weapons: '#0ea5e9',
                traps: '#71717a',
                artifacts: '#a855f7',
                spells: '#3b82f6',
                catacombs: '#a855f7'
            }
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    }
}

// Получить все данные
function getAllData() {
    initializeStorage();
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

// Получить карты
function getStorageCards() {
    const data = getAllData();
    return data.cards;
}

// Обновить карту
function updateCard(cardId, updates) {
    const data = getAllData();
    const cardIndex = data.cards.findIndex(c => c.id === cardId);
    if (cardIndex !== -1) {
        data.cards[cardIndex] = { ...data.cards[cardIndex], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data.cards[cardIndex];
    }
    return null;
}

// Добавить карту
function addCard(card) {
    const data = getAllData();
    const newId = Math.max(...data.cards.map(c => c.id), 0) + 1;
    card.id = newId;
    data.cards.push(card);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return card;
}

// Удалить карту
function deleteCard(cardId) {
    const data = getAllData();
    data.cards = data.cards.filter(c => c.id !== cardId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Обновить информацию об игре
function updateGameInfo(updates) {
    const data = getAllData();
    data.gameInfo = { ...data.gameInfo, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data.gameInfo;
}

// Получить информацию об игре
function getGameInfo() {
    const data = getAllData();
    return data.gameInfo;
}

// Obновить правила
function updateRules(updates) {
    const data = getAllData();
    data.rules = { ...data.rules, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data.rules;
}

// Получить правила
function getRules() {
    const data = getAllData();
    return data.rules;
}

// Обновить информацию об игре (About)
function updateAboutGame(updates) {
    const data = getAllData();
    data.aboutGame = { ...data.aboutGame, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data.aboutGame;
}

// Получить информацию об игре (About)
function getAboutGame() {
    const data = getAllData();
    return data.aboutGame;
}

// Обновить цвета ролей
function updateColors(colorUpdates) {
    const data = getAllData();
    data.colors = { ...data.colors, ...colorUpdates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data.colors;
}

// Получить цвета
function getColors() {
    const data = getAllData();
    return data.colors;
}

// Обновить имена героев
function updateHeroNames(names) {
    const data = getAllData();
    data.heroNames = names;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return names;
}

// Получить имена героев
function getHeroNames() {
    const data = getAllData();
    return data.heroNames;
}

// Экспортировать все данные (для загрузки)
function exportData() {
    const data = getAllData();
    return JSON.stringify(data, null, 2);
}

// Импортировать данные (для восстановления)
function importData(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Ошибка при импорте данных:', e);
        return false;
    }
}

// ============================================
// Работа с блоками правил
// ============================================

// Получить все блоки краткие правил
function getQuickRuleBlocks() {
    const data = getAllData();
    if (!data.rulesBlocks) {
        data.rulesBlocks = {
            quick: [
                { id: 'quick-start', title: 'Начало игры', icon: '🎮', text: 'Каждый вытягивает героя' },
                { id: 'quick-turn', title: 'Ход игрока', icon: '♻️', text: 'Добор карт, атака, восстановление' },
                { id: 'quick-victory', title: 'Победа', icon: '👑', text: 'Последний живой герой побеждает' }
            ],
            detailed: []
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    return data.rulesBlocks.quick || [];
}

// Получить блок правил по ID
function getQuickRuleBlock(blockId) {
    const blocks = getQuickRuleBlocks();
    return blocks.find(b => b.id === blockId);
}

// Обновить блок краткие правил
function updateQuickRuleBlock(blockId, updates) {
    const data = getAllData();
    if (!data.rulesBlocks) data.rulesBlocks = { quick: [], detailed: [] };
    
    const blockIndex = data.rulesBlocks.quick.findIndex(b => b.id === blockId);
    if (blockIndex !== -1) {
        data.rulesBlocks.quick[blockIndex] = { ...data.rulesBlocks.quick[blockIndex], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data.rulesBlocks.quick[blockIndex];
    }
    return null;
}

// Добавить блок кратких правил
function addQuickRuleBlock(block) {
    const data = getAllData();
    if (!data.rulesBlocks) data.rulesBlocks = { quick: [], detailed: [] };
    
    // Генерировать уникальный ID
    const newId = `quick-block-${Date.now()}`;
    block.id = newId;
    data.rulesBlocks.quick.push(block);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return block;
}

// Удалить блок кратких правил
function deleteQuickRuleBlock(blockId) {
    const data = getAllData();
    if (!data.rulesBlocks) data.rulesBlocks = { quick: [], detailed: [] };
    
    data.rulesBlocks.quick = data.rulesBlocks.quick.filter(b => b.id !== blockId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Получить изображение для блока (если добавлено)
function getRuleBlockImage(blockId) {
    const data = getAllData();
    if (!data.ruleBlockImages) data.ruleBlockImages = {};
    return data.ruleBlockImages[blockId] || null;
}

// Сохранить изображение для блока правил
function setRuleBlockImage(blockId, imageUrl) {
    const data = getAllData();
    if (!data.ruleBlockImages) data.ruleBlockImages = {};
    
    data.ruleBlockImages[blockId] = imageUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Сбросить на значения по умолчанию
function resetToDefault() {
    localStorage.removeItem(STORAGE_KEY);
    initializeStorage();
}

// Инициализировать при загрузке
initializeStorage();
