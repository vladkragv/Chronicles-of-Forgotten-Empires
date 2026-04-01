// ============================================
// ANIMATIONS.JS - Уникальные анимации при скроллинге
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
    initializeMagicEffects();
});

function initializeScrollAnimations() {
    // Создать Intersection Observer для анимаций при скроллинге
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationMap = {
        'stat-item': 'mysticalBounce 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'point-item': 'slideInWithGlow 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'tip-item': 'fadeInWithRotation 0.7s ease-out forwards',
        'faq-item': 'expandFromCenter 0.8s ease-out forwards',
        'card-container': 'enigmaticReveal 0.9s ease-out forwards',
        'gallery-item': 'smoothCardReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'about-section': 'fadeInWithMist 0.9s ease-out forwards',
        'rules-subsection': 'slideInWithMist 0.8s ease-out forwards'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Найти подходящую анимацию
                let animation = 'fadeInUp 0.8s ease forwards';
                for (const [className, anim] of Object.entries(animationMap)) {
                    if (element.classList.contains(className)) {
                        animation = anim;
                        break;
                    }
                }
                
                // Добавить задержку для стеклянного эффекта
                element.style.animation = animation;
                element.style.animationDelay = `${index * 0.05}s`;
                element.classList.add('animated');
                
                observer.unobserve(element);
            }
        });
    }, options);

    // Применить observer к элементам
    const animatedElements = document.querySelectorAll(
        '.stat-item, .point-item, .tip-item, .faq-item, .card-container, ' +
        '.about-section, .rules-subsection, .gallery-item, .card-item'
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Инициализировать магические эффекты
function initializeMagicEffects() {
    let lastScrollTop = 0;
    let isAutoScrolling = false;
    
    // Эффект мистического свечения при скроллинге
    document.addEventListener('scroll', () => {
        if (isAutoScrolling) return;
        
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrolled / maxScroll;
        
        // Обновить цвет фонового свечения в зависимости от позиции скролла
        const hue = 210 + (scrollPercent * 30);
        document.documentElement.style.setProperty('--scroll-hue', hue);
        
        // Эффект параллакса для фона - только вертикальное смещение без масштабирования
        const hero = document.querySelector('.hero-background');
        if (hero && scrolled < window.innerHeight * 1.5) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Смарт-скролл функция для главной страницы (отключен)
        // handleSmartScroll(scrolled);
        lastScrollTop = scrolled;
    }, { passive: true });
    
    // Функция смарт-скролла
    function handleSmartScroll(scrolled) {
        const gameDescSection = document.querySelector('.game-description');
        if (!gameDescSection) return; // Не на главной странице
        
        const scrollDirection = scrolled > lastScrollTop ? 'down' : 'up';
        const heroHeight = window.innerHeight * 1.2; // Примерная высота героя
        const gameDescTop = gameDescSection.getBoundingClientRect().top + scrolled;
        
        // Если скроллим вниз в пределах героя, автоскроллим до "О игре"
        if (scrollDirection === 'down' && scrolled < heroHeight && scrolled > 0) {
            isAutoScrolling = true;
            smoothScrollTo(gameDescTop - 100, 800);
            setTimeout(() => { isAutoScrolling = false; }, 850);
        }
        
        // Если скроллим вверх в пределах "О игре", автоскроллим в начало
        if (scrollDirection === 'up' && scrolled < gameDescTop - 50 && scrolled > heroHeight - 100) {
            isAutoScrolling = true;
            smoothScrollTo(0, 800);
            setTimeout(() => { isAutoScrolling = false; }, 850);
        }
    }
    
    // Функция плавного скролла
    function smoothScrollTo(target, duration = 800) {
        const start = window.scrollY;
        const distance = target - start;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (cubic-in-out)
            const easeProgress = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, start + distance * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Добавить интерактивное свечение к элементам
    document.addEventListener('mousemove', (e) => {
        const elements = document.querySelectorAll('.card-container, .card-preview, .stat-item');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const distance = Math.hypot(
                e.clientX - (rect.left + rect.width / 2),
                e.clientY - (rect.top + rect.height / 2)
            );
            
            const maxDistance = 300;
            const intensity = Math.max(0, 1 - distance / maxDistance);
            
            if (intensity > 0) {
                element.style.boxShadow = `
                    0 0 20px rgba(212, 165, 116, ${intensity * 0.6}),
                    0 0 40px rgba(125, 187, 170, ${intensity * 0.3}),
                    inset 0 0 20px rgba(212, 165, 116, ${intensity * 0.2})
                `;
            }
        });
    }, { passive: true });
}

// Функция для принудительного запуска анимаций
function triggerAnimations(container = document) {
    const elements = container.querySelectorAll(
        '.stat-item, .point-item, .tip-item, .faq-item, .card-container, ' +
        '.about-section, .rules-subsection, .gallery-item'
    );

    let delay = 0;
    elements.forEach(element => {
        const randomAnims = [
            'mysticalBounce 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            'slideInWithGlow 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
            'expandFromCenter 0.8s ease-out forwards'
        ];
        
        const randomAnim = randomAnims[Math.floor(Math.random() * randomAnims.length)];
        
        setTimeout(() => {
            element.style.animation = randomAnim;
        }, delay);
        
        delay += 80;
    });
}
