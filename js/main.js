// ============================================
// MAIN.JS - Основная функциональность
// ============================================

// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Закрытие мобильного меню при клике на ссылку
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Кнопка "Наверх"
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Показываем кнопку только при скролле вниз
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
}

// Активная ссылка навигации
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        let href = link.getAttribute('href');
        if ((currentPage === '' && href === 'index.html') || href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNav);

// ВЫБОР ИГРЫ
const selectorBtn = document.querySelector('.selector-btn');
const selectorDropdown = document.querySelector('.selector-dropdown');
const gameSelector = document.querySelector('.game-selector');
const selectorItems = document.querySelectorAll('.selector-item');

if (selectorBtn && selectorDropdown) {
    // Показать dropdown при наведении на кнопку
    selectorBtn.addEventListener('mouseenter', () => {
        selectorDropdown.style.display = 'block';
    });

    // Показать dropdown при наведении на сам dropdown
    selectorDropdown.addEventListener('mouseenter', () => {
        selectorDropdown.style.display = 'block';
    });

    // Скрыть dropdown при уходе курсора со всего контейнера
    gameSelector.addEventListener('mouseleave', () => {
        selectorDropdown.style.display = 'none';
    });
}

if (selectorItems) {
    selectorItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const gameName = item.textContent.trim();
            
            // На данный момент поддерживается только одна игра
            if (gameName === 'Хроники забытых империй') {
                window.location.href = 'index.html';
            }
        });
    });
}

// НАВИГАЦИЯ НА ГЛАВНУЮ СО ЛОГОТИПА И НАЗВАНИЯ
const logo = document.querySelector('.logo');
const logoImage = document.querySelector('.logo-image');

if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });
    logo.style.cursor = 'pointer';
}

if (logoImage) {
    logoImage.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });
    logoImage.style.cursor = 'pointer';
}

