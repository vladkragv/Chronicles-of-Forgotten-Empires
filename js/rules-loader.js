// ============================================
// RULES-LOADER.JS - Динамическая загрузка блоков правил
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadRulesBlocks();
});

function loadRulesBlocks() {
    const blocks = getQuickRuleBlocks();
    const container = document.querySelector('.key-points');
    
    if (!container || blocks.length === 0) {
        console.log('Контейнер не найден или блоков нет');
        return;
    }
    
    // Очистить существующее содержимое
    container.innerHTML = '';
    
    // Добавить блоки правил
    blocks.forEach((block, index) => {
        const pointItem = document.createElement('div');
        pointItem.className = 'point-item';
        
        pointItem.innerHTML = `
            <div class="point-icon">${block.icon}</div>
            <h4>${block.title}</h4>
            <p>${block.text}</p>
        `;
        
        container.appendChild(pointItem);
    });
}

// Функция для динамического обновления блоков (например, после изменения данных)
function refreshRulesBlocks() {
    loadRulesBlocks();
}
