# 📦 Руководство по подготовке сайта к публикации

## Оглавление
1. [Подготовка к публикации](#подготовка-к-публикации)
2. [Проверка перед выпуском](#проверка-перед-выпуском)
3. [Оптимизация производительности](#оптимизация-производительности)
4. [Безопасность](#безопасность)
5. [Развертывание](#развертывание)
6. [После публикации](#после-публикации)

---

## 🔍 Подготовка к публикации

### 1. Проверка структуры проекта

Убедитесь что все необходимые файлы присутствуют:

```
Site/
├── index.html           ✅ Главная страница
├── about.html           ✅ Об игре
├── cards.html           ✅ Каталог карт
├── rules.html           ✅ Правила
├── admin.html           ✅ Панель администратора
├── css/
│   ├── styles.css       ✅ Основные стили
│   ├── fantasy.css      ✅ Фэнтези оформление
│   └── admin.css        ✅ Стили админки
├── js/
│   ├── data.js          ✅ База данных карт
│   ├── storage.js       ✅ Локальное хранилище
│   ├── main.js          ✅ Основной функционал
│   ├── cards.js         ✅ Функции карт
│   ├── admin.js         ✅ Админка
│   ├── animations.js    ✅ Анимации
│   ├── dynamic-content.js ✅ Динамический контент
│   └── rules.js         ✅ Работа с правилами
├── images/
│   ├── cards/           📁 Изображения карт
│   └── icons/           📁 Иконки
├── pdf/                 📁 PDF файлы (если есть)
└── README.md            ✅ Документация
```

### 2. Обновление метаинформации

Обновите в файлах следующую информацию:

#### В HTML файлах:
- **Название сайта**: `<title>` тег
- **Описание**: `<meta name="description">`
- **Ключевые слова**: `<meta name="keywords">`
- **Open Graph теги** для социальных сетей
- **Favicon**: убедитесь что фавикон загружается ✅

Пример:
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Эпическая настольная карточная игра 'Хроники забытых империй'">
    <meta name="keywords" content="настольная игра, карточная игра, фэнтази, стратегия">
    <meta property="og:title" content="Хроники забытых империй">
    <meta property="og:description" content="Стратегическая карточная игра для 2-6 игроков">
    <meta property="og:image" content="https://yourdomain.com/images/og-image.jpg">
    <title>Хроники забытых империй - Настольная Карточная Игра</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>
```

### 3. Проверка ссылок

Убедитесь что все ссылки работают правильно:

- **Внутренние ссылки**: проверить переходы между страницами
- **Ссылки на социальные сети**: VK, Telegram, Discord
- **Ссылки на магазины**: Avito, другие площадки
- **Внешние ссылки**: работают ли они?

Команда для проверки:
```bash
# Проверка всех ссылок (требует npm и инструменты)
npx broken-link-checker -r https://yourdomain.com
```

---

## ✅ Проверка перед выпуском

### 1. Тестирование браузеров

Протестируйте сайт в следующих браузерах:

- ✅ Chrome (последняя версия)
- ✅ Firefox (последняя версия)
- ✅ Safari (последняя версия)
- ✅ Edge (последняя версия)
- ✅ Мобильные браузеры (iOS Safari, Chrome Mobile)

### 2. Тестирование устройств

- ✅ Desktop (1920x1080, 1366x768, 1024x768)
- ✅ Планшеты (iPad, Android)
- ✅ Мобильные телефоны (iPhone, Android)

### 3. Функциональное тестирование

#### Главная страница (index.html)
- [ ] Видео баннер загружается
- [ ] Иконка логотипа видна
- [ ] Навигация работает
- [ ] Кнопка "Купить" работает
- [ ] Dropdown выбора игры работает
- [ ] Кнопка "Наверх" работает

#### Страница карт (cards.html)
- [ ] Карты отображаются правильно
- [ ] Фильтры работают
- [ ] Поиск работает
- [ ] Гибридные карты показывают обе роли
- [ ] Модальное окно карты открывается

#### Страница правил (rules.html)
- [ ] Вкладки правил работают
- [ ] Текст правил видим
- [ ] Блоки правил отображаются

#### Об игре (about.html)
- [ ] Все разделы видны
- [ ] FAQ вопросы развернуты/схлопнуты
- [ ] Контакты ссылаются правильно

#### Админка (admin.html)
- [ ] Логин/пароль работают: admin-vladkragv / admin-vladkragv
- [ ] Все вкладки админки доступны
- [ ] Редактирование карт работает
- [ ] Редактирование правил работает
- [ ] Сохранение данных работает

### 4. Console & Network Errors

Откройте DevTools (F12) и проверьте:

- ✅ Нет красных ошибок в Console
- ✅ Нет404 ошибок для изображений/скриптов
- ✅ Все ресурсы загружаются (Network tab)
- ✅ Нет предупреждений о безопасности

---

## 🚀 Оптимизация производительности

### 1. Оптимизация изображений

```bash
# Используйте оптимизаторы:
# - ImageOptim (Mac)
# - FileOptimizer (Windows)
# - TinyPNG/TinyJPG (Online)

# Команда Linux/Mac:
find images/ -type f -name "*.jpg" -exec cjpeg -quality 85 {} -o {} \;
find images/ -type f -name "*.png" -exec optipng -o2 {} \;
```

### 2. Минификация файлов

```bash
# Установите terser
npm install -g terser uglify-css

# Минифицируйте JS
terser js/main.js -o js/main.min.js -c -m

# Минифицируйте CSS
uglify-css css/styles.css -o css/styles.min.css
```

### 3. Использование CDN для популярных библиотек

Если используются библиотеки, подумайте об использовании CDN вместо локальных файлов.

### 4. Gzip сжатие

Убедитесь что сервер включит Gzip сжатие:

```apache
# .htaccess (для Apache)
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

---

## 🔒 Безопасность

### 1. Защита админки

**ВАЖНО**: Не забудьте поменять пароль админки!

Текущие учетные данные:
- Username: `admin-vladkragv`
- Password: `admin-vladkragv`

Измените в файле `js/admin.js`:

```javascript
const ADMIN_PASSWORD = 'ВАШ_НОВЫЙ_БЕЗОПАСНЫЙ_ПАРОЛЬ';
const ADMIN_LOGIN = 'ВАШ_НОВЫЙ_ЛОГИН';
```

### 2. Обновление ссылок и контактов

- ✅ Email контакты: vladkragv@gmail.com
- ✅ Discord сервер: https://discord.gg/vladkragv
- ✅ VK группа: https://vk.com/vladkragv
- ✅ Telegram: https://t.me/vladkragv

### 3. Content Security Policy (CSP)

Добавьте CSP заголовок:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;">
```

### 4. HTTPS

- ✅ Используйте HTTPS (SSL/TLS сертификат)
- ✅ Редирект с HTTP на HTTPS

```apache
# .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 🌐 Развертывание

### Вариант 1: Хостинг с поддержкой статических сайтов

**Рекомендуемые хостинги:**
- **GitHub Pages** (бесплатно)
- **Vercel** (бесплатно)
- **Netlify** (бесплатно)
- **Firebase Hosting** (бесплатно с ограничений)
- **Traditional hosting** (Beget, Timeweb, etc.)

### GitHub Pages

```bash
# 1. Инициализируйте Git
git init
git add .
git commit -m "Initial commit"

# 2. Создайте репозиторий на GitHub
# https://github.com/new

# 3. Добавьте remote
git remote add origin https://github.com/ВАШ_ЛОГИН/nastolka.git
git branch -M main
git push -u origin main

# 4. В Settings репозитория:
# - Перейдите в Pages
# - Выберите "main" branch
# - Сайт будет доступен по https://ВАШ_ЛОГИН.github.io/nastolka/
```

### Влеадить хостинга (Beget, Timeweb)

```bash
# 1. Скачайте FileZilla или используйте встроенный FTP клиент
# 2. Подключитесь с помощью FTP учетных данных
# 3. Загрузите все файлы в папку public_html или www
# 4. Проверьте что index.html находится в корневой папке
# 5. Сайт будет доступен по вашему доменному имени
```

### Docker развертывание

Если используется Docker:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t nastolka-site .
docker run -p 80:80 nastolka-site
```

---

## 📋 После публикации

### 1. SEO подготовка

- ✅ Создайте `robots.txt`:

```txt
User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /*.json$

Sitemap: https://yourdomain.com/sitemap.xml
```

- ✅ Создайте `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yourdomain.com/</loc>
        <lastmod>2026-03-31</lastmod>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/cards.html</loc>
        <lastmod>2026-03-31</lastmod>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/rules.html</loc>
        <lastmod>2026-03-31</lastmod>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/about.html</loc>
        <lastmod>2026-03-31</lastmod>
        <priority>0.7</priority>
    </url>
</urlset>
```

### 2. Google Search Console & Яндекс Вебмастер

- ✅ Зарегистрируйте сайт в Google Search Console
- ✅ Зарегистрируйте сайт в Яндекс Вебмастер
- ✅ Отправьте sitemap.xml
- ✅ Проверьте что все страницы индексируются

### 3. Аналитика

Добавьте Google Analytics:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Или Яндекс Метрика:

```html
<!-- Yandex.Metrika -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   ym(COUNTER_ID, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true});
</script>
```

### 4. Резервные копии

- ✅ Регулярно делайте резервные копии всех файлов
- ✅ Сохраняйте данные админки (localStorage)
- ✅ Используйте встроенную функцию экспорта в админке

### 5. Мониторинг

Проверяйте регулярно:

- ✅ Работает ли сайт (используйте uptimerobot.com)
- ✅ Нет ошибок в консоли (Sentry.io)
- ✅ Производительность (PageSpeed Insights)
- ✅ Позиции в поисковых системах

### 6. Поддержка

- ✅ Отслеживайте сообщения в социальных сетях
- ✅ Отвечайте на вопросы пользователей
- ✅ Фиксьте ошибки которые находят пользователи
- ✅ Добавляйте новый контент и обновления

---

## 🆘 Часто возникающие проблемы

### Проблема: Страница показывает 404

**Решение:**
- Проверьте что все файлы загружены на сервер
- Проверьте пути к файлам (case-sensitive на Linux)
- Проверьте что index.html находится в корневой папке
- Убедитесь что правила перенаправления настроены правильно

### Проблема: Изображения не загружаются

**Решение:**
- Проверьте пути к изображениям (должны быть относительные)
- Убедитесь что папка images/ загружена на сервер
- Проверьте расширения файлов (jpg, png, svg)
- Используйте HTTPS для всех ресурсов

### Проблема: Админка не работает

**Решение:**
- Проверьте что JavaScript включен в браузере
- Проверьте пароль (он чувствителен к регистру)
- Проверьте localStorage в браузере (DevTools > Application)
- Очистите кэш браузера

### Проблема: Медленная загрузка

**Решение:**
- Оптимизируйте изображения
- Включите Gzip сжатие на сервере
- Используйте CDN для больших файлов
- Добавьте кэширование браузера

---

## 📞 Контакты для поддержки

- **Email**: vladkragv@gmail.com
- **Discord**: https://discord.gg/vladkragv
- **Telegram**: https://t.me/vladkragv
- **VK**: https://vk.com/vladkragv

---

**Последнее обновление**: 31 марта 2026 г.
**Версия**: 1.0
