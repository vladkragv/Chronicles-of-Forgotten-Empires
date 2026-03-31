// ============================================
// RULES.JS - Функциональность страницы правил
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setupRulesTabs();
});

function setupRulesTabs() {
    const ruleTabBtns = document.querySelectorAll('.rules-tab-btn');
    const rulesSections = document.querySelectorAll('.rules-section');

    ruleTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            // Деактивировать все вкладки
            ruleTabBtns.forEach(b => b.classList.remove('active'));
            rulesSections.forEach(section => section.classList.remove('active'));

            // Активировать выбранную вкладку
            btn.classList.add('active');
            const activeSection = document.getElementById(`${tabName}-rules`);
            if (activeSection) {
                activeSection.classList.add('active');
            }
        });
    });
}
