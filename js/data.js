// ============================================
// DATA.JS - База данных карт
// ============================================

const CARDS_DATABASE = [
    // ===== ГЕРОИ (12) =====
    { id: 1, name: 'Орк-Берсерк', type: 'heroes', atk: 4, hp: 28, mana: 0, ability: 'Первый урон в бою по Орку каждый раунд уменьшается на 2 (мин. 1). Орки при атаке восстанавливают 1 HP герою.', image: 'hero-1.jpg' },
    { id: 2, name: 'Ассасин', type: 'heroes', atk: 3, hp: 24, mana: 0, ability: 'Атакуя бросает d6. 1-3: двойной урон; 4-6: обычный урон. Стоимость: 3 МАНЫ. Атака по Нежити +1 АТК.', image: 'hero-2.jpg' },
    //=== Закончил тут ===//
    { id: 3, name: 'Некромант', type: 'heroes', atk: 3, hp: 24, mana: 0, ability: 'Каждый раз, когда враг разыгрывает существо, нанесите ему 1 урон', image: 'hero-3.jpg' },
    { id: 4, name: 'Маг Эльф', type: 'heroes', atk: 3, hp: 25, mana: 0, ability: 'Артефакты дают +2 ХР вместо +1', image: 'hero-4.jpg' },
    { id: 5, name: 'Маг Лекарь', type: 'heroes', atk: 2, hp: 20, mana: 0, ability: 'Нежить стоит -1 МР', image: 'hero-5.jpg' },
    { id: 6, name: 'Стрелок Лучник', type: 'heroes', atk: 3, hp: 20, mana: 0, ability: 'Вы можете использовать заклинания дважды за ход', image: 'hero-6.jpg' },
    { id: 7, name: 'Паладин', type: 'heroes', atk: 2, hp: 32, mana: 0, ability: 'Враги не могут наносить вам урон > 2 за раз', image: 'hero-7.jpg' },
    { id: 8, name: 'Темный Маг', type: 'heroes', atk: 4, hp: 25, mana: 0, ability: 'Если враг имеет существо с АТК ≥ 4, урон +1', image: 'hero-8.jpg' },
    { id: 9, name: 'Чародей', type: 'heroes', atk: 3, hp: 24, mana: 0, ability: 'Восстанавливайте 1 ХП в конце хода', image: 'hero-9.jpg' },
    { id: 10, name: 'Гладиатор', type: 'heroes', atk: 4, hp: 26, mana: 0, ability: 'Существа стоят -1 МР', image: 'hero-10.jpg' },
    { id: 11, name: 'Друид', type: 'heroes', atk: 3, hp: 25, mana: 0, ability: 'Вы можете доберать дополнительную карту за ход (-2 МР)', image: 'hero-11.jpg' },
    { id: 12, name: 'Наездник Дракона', type: 'heroes', atk: 2, hp: 26, mana: 0, ability: 'Каждый третий ход восстановите 3 дополнительных ХП', image: 'hero-12.jpg' },

    // ===== ЗВЕРИ (7) =====
    { id: 13, name: 'Волк вьюги', type: 'beasts', atk: 3, hp: 2, mana: 2, ability: 'Может атаковать несколько целей', image: 'beast-1.jpg' },
    { id: 14, name: 'Медведь войны', type: 'beasts', atk: 4, hp: 5, mana: 4, ability: 'Получает +2 АТК при атаке против другого существа', image: 'beast-2.jpg' },
    { id: 15, name: 'Ястреб-ловец', type: 'beasts', atk: 2, hp: 2, mana: 1, ability: 'После атаки не идёт в усталость', image: 'beast-3.jpg' },
    { id: 16, name: 'Саблезуб', type: 'beasts', atk: 3, hp: 3, mana: 3, ability: 'Нанесите 1 дополнительный урон при групповой атаке', image: 'beast-4.jpg' },
    { id: 17, name: 'Лось боровой', type: 'beasts', atk: 2, hp: 4, mana: 2, ability: 'Может атаковать в одном ходу дважды', image: 'beast-5.jpg' },
    { id: 18, name: 'Паук королевский', type: 'beasts', atk: 1, hp: 3, mana: 2, ability: 'Может блокировать одну атаку в ход', image: 'beast-6.jpg' },
    { id: 19, name: 'Рысь ночи', type: 'beasts', atk: 3, hp: 2, mana: 2, ability: 'Может атаковать героя напрямую, если он имеет усталые существа', image: 'beast-7.jpg' },

    // ===== ГИБРИДНАЯ КАРТА: Зверь-Демон (1) =====
    { id: 20, name: 'Крысы', type: 'beasts', hybridTypes: ['demons'], atk: 4, hp: 4, mana: 3, ability: 'Может наносить уром двум целям одновременно. [ГИБРИДНАЯ: Зверь-Демон]', image: 'hybrid-1.jpg', hybrid: true },

    // ===== ДЕМОНЫ (2) =====
    { id: 21, name: 'Демон ада', type: 'demons', atk: 3, hp: 3, mana: 3, ability: 'При гибели наносит 2 урона всем существам противника', image: 'demon-1.jpg' },
    { id: 22, name: 'Граф Ада', type: 'demons', atk: 5, hp: 6, mana: 5, ability: 'Существа противника стоят +1 МР', image: 'demon-2.jpg' },

    // ===== ГИБРИДНАЯ КАРТА: Демон-Дух (2) =====
    { id: 23, name: 'Гаргона', type: 'demons', hybridTypes: ['spirits'], atk: 2, hp: 5, mana: 4, ability: 'Не может быть атакован существами. [ГИБРИДНАЯ: Демон-Дух]', image: 'hybrid-2.jpg', hybrid: true },
    { id: 24, name: 'Призрак боли', type: 'demons', hybridTypes: ['spirits'], atk: 3, hp: 3, mana: 3, ability: 'Каждый раз при получении урона наносит 1 контрурон. [ГИБРИДНАЯ: Демон-Дух]', image: 'hybrid-3.jpg', hybrid: true },

    // ===== ДУХИ (1) =====
    { id: 25, name: 'Дух леса', type: 'spirits', atk: 1, hp: 4, mana: 2, ability: 'При его гибели восстановите 2 МР', image: 'spirit-1.jpg' },

    // ===== ГИБРИДНЫЕ КАРТЫ: Нежить-Дух (2) и Демон-Дух (уже выше) =====
    { id: 26, name: 'Банши', type: 'spirits', hybridTypes: ['undead'], atk: 2, hp: 3, mana: 2, ability: 'После атаки остаётся на поле. [ГИБРИДНАЯ: Нежить-Дух]', image: 'hybrid-4.jpg', hybrid: true },
    { id: 27, name: 'Дух мёртвого воина', type: 'spirits', hybridTypes: ['undead'], atk: 2, hp: 4, mana: 3, ability: 'Может восстанавливать существ противника в усталость. [ГИБРИДНАЯ: Нежить-Дух]', image: 'hybrid-5.jpg', hybrid: true },

    // ===== НЕЖИТЬ (3) =====
    { id: 28, name: 'Скелет воина', type: 'undead', atk: 2, hp: 2, mana: 1, ability: 'При гибели вернитесь в руку', image: 'undead-1.jpg' },
    { id: 29, name: 'Зомби граф', type: 'undead', atk: 3, hp: 4, mana: 3, ability: 'Враги не могут восстанавливаться рядом с ним', image: 'undead-2.jpg' },
    { id: 30, name: 'Ревенант', type: 'undead', atk: 2, hp: 5, mana: 4, ability: 'Восстанавливает +1 ХП каждый ход вашего противника', image: 'undead-3.jpg' },

    // ===== ГИБРИДНАЯ КАРТА: Нежить-Дух (уже выше) =====
    { id: 31, name: 'Погребённый', type: 'undead', hybridTypes: ['spirits'], atk: 1, hp: 8, mana: 4, ability: 'Каждый раз, когда существо противника атакует, получает +1 АТК. [ГИБРИДНАЯ: Нежить-Дух]', image: 'hybrid-6.jpg', hybrid: true },

    // ===== ДРАКОНЫ (4) =====
    { id: 32, name: 'Дракон льда', type: 'dragons', atk: 5, hp: 7, mana: 6, ability: 'Существа противника получают -1 АТК', image: 'dragon-1.jpg' },
    { id: 33, name: 'Дракон пламени', type: 'dragons', atk: 6, hp: 6, mana: 6, ability: 'При разыгрывании наносит 2 урона героу противника', image: 'dragon-2.jpg' },
    { id: 34, name: 'Задумчивый дракон', type: 'dragons', atk: 4, hp: 8, mana: 5, ability: 'Каждый ход восстанавливает 1 ХП', image: 'dragon-3.jpg' },
    { id: 35, name: 'Древний дракон', type: 'dragons', atk: 7, hp: 5, mana: 7, ability: 'При гибели первого существа противника наносит 3 урона', image: 'dragon-4.jpg' },

    // ===== ОРКИ (4) =====
    { id: 36, name: 'Боевой орк', type: 'orcs', atk: 3, hp: 3, mana: 2, ability: 'При атаке получайте +1 МР', image: 'orc-1.jpg' },
    { id: 37, name: 'Вождь орков', type: 'orcs', atk: 4, hp: 5, mana: 4, ability: 'Орки стоят для вас -1 МР и получают +1 АТК', image: 'orc-2.jpg' },
    { id: 38, name: 'Шаман', type: 'orcs', atk: 2, hp: 4, mana: 3, ability: 'Может усиливать ваше существо: +1 АТК или +2 ХР', image: 'orc-3.jpg' },
    { id: 39, name: 'Охотник на чудищ', type: 'orcs', atk: 3, hp: 4, mana: 3, ability: 'Получает +2 АТК при атаке против демонов или драконов', image: 'orc-4.jpg' },

    // ===== ОРУДИЯ (5) =====
    { id: 40, name: 'Меч света', type: 'weapons', hp: 0, mana: 2, ability: 'Прикреплённое существо получает +2 АТК', image: 'weapon-1.jpg' },
    { id: 41, name: 'Щит боровой', type: 'weapons', hp: 0, mana: 3, ability: 'Прикреплённое существо получает +3 ХР', image: 'weapon-2.jpg' },
    { id: 42, name: 'Поясохран', type: 'weapons', hp: 0, mana: 2, ability: 'Прикреплённое существо может атаковать дважды', image: 'weapon-3.jpg' },
    { id: 43, name: 'Кольцо силы', type: 'weapons', hp: 0, mana: 3, ability: 'Прикреплённое существо получает +1 АТК и +2 ХР', image: 'weapon-4.jpg' },
    { id: 44, name: 'Плащ тьмы', type: 'weapons', hp: 0, mana: 2, ability: 'Прикреплённое существо с демоном получает +3 АТК', image: 'weapon-5.jpg' },

    // ===== ЛОВУШКИ (5) =====
    { id: 45, name: 'Шипы', type: 'traps', hp: 0, mana: 0, ability: 'Первое враждебное существо, вошедшее сюда, получает 2 урона', image: 'trap-1.jpg' },
    { id: 46, name: 'Яма', type: 'traps', hp: 0, mana: 0, ability: 'Враг теряет 1 существо (выбираете случайно из его стола)', image: 'trap-2.jpg' },
    { id: 47, name: 'Громовой удар', type: 'traps', hp: 0, mana: 0, ability: 'Все существа противника получают 1 урон', image: 'trap-3.jpg' },
    { id: 48, name: 'Отравленный клинок', type: 'traps', hp: 0, mana: 0, ability: 'Враг теряет 3 МР. Если < 3, теряет всё', image: 'trap-4.jpg' },
    { id: 49, name: 'Магическое отражение', type: 'traps', hp: 0, mana: 0, ability: 'Следующее заклинание врага не срабатывает', image: 'trap-5.jpg' },

    // ===== АРТЕФАКТЫ (11) =====
    { id: 50, name: 'Кольцо Силы', type: 'artifacts', hp: 0, mana: 0, ability: '+1 АТК и +1 ХР к герою', image: 'artifact-1.jpg' },
    { id: 51, name: 'Амулет жизни', type: 'artifacts', hp: 0, mana: 0, ability: '+3 ХР к герою. В конце игры продаётся за 5 МР', image: 'artifact-2.jpg' },
    { id: 52, name: 'Зелье маны', type: 'artifacts', hp: 0, mana: 0, ability: '+2 МР в начале каждого хода', image: 'artifact-3.jpg' },
    { id: 53, name: 'Корона королевства', type: 'artifacts', hp: 0, mana: 0, ability: '+2 ХР и герой восстанавливает +1 ХП каждый ход', image: 'artifact-4.jpg' },
    { id: 54, name: 'Боевой инстинкт', type: 'artifacts', hp: 0, mana: 0, ability: '+2 АТК. Существа стоят -1 МР', image: 'artifact-5.jpg' },
    { id: 55, name: 'Магический карман', type: 'artifacts', hp: 0, mana: 0, ability: 'Вы можете держать +1 карту в руке (итого 4 вместо 3)', image: 'artifact-6.jpg' },
    { id: 56, name: 'Доспехи берсерка', type: 'artifacts', hp: 0, mana: 0, ability: '+2 ХР. Каждый ход, когда вы атакуете, восстанавливайте 1 МР', image: 'artifact-7.jpg' },
    { id: 57, name: 'Перья сокола', type: 'artifacts', hp: 0, mana: 0, ability: 'Существа без способностей летают (не могут быть атакованы)', image: 'artifact-8.jpg' },
    { id: 58, name: 'Символ ночи', type: 'artifacts', hp: 0, mana: 0, ability: 'Демоны стоят -2 МР и получают +2 АТК', image: 'artifact-9.jpg' },
    { id: 59, name: 'Слёзы времени', type: 'artifacts', hp: 0, mana: 0, ability: '+1 ХР. Вы можете пропустить ход противника (-4 МР)', image: 'artifact-10.jpg' },
    { id: 60, name: 'Ядро земли', type: 'artifacts', hp: 0, mana: 0, ability: '+1 АТК. При начале вашего хода восстанавливайте 1 ХР', image: 'artifact-11.jpg' },

    // ===== ВХОДЫ В КАТАКОМБЫ =====
    { id: 61, name: 'Вход в Катакомбы', type: 'catacombs', hp: 0, mana: 1, ability: 'Возьмите 1 карту из колоды Катакомб. [В колоде 10 шт.]', image: 'catacombs-entrance.jpg', quantity: 10 },

    // ===== ЗАКЛИНАНИЯ (21) =====
    { id: 62, name: 'Огненный шар', type: 'spells', hp: 0, mana: 2, ability: 'Нанесите 3 урона одному существу противника', image: 'spell-1.jpg' },
    { id: 63, name: 'Ледяная стена', type: 'spells', hp: 0, mana: 2, ability: 'Блокируйте следующую атаку противника', image: 'spell-2.jpg' },
    { id: 64, name: 'Магический щит', type: 'spells', hp: 0, mana: 1, ability: 'Герой получает +2 ХР', image: 'spell-3.jpg' },
    { id: 65, name: 'Священный луч', type: 'spells', hp: 0, mana: 3, ability: 'Нанесите 2 урона существу противника и восстановите 2 ХР герою', image: 'spell-4.jpg' },
    { id: 66, name: 'Ускорение', type: 'spells', hp: 0, mana: 2, ability: 'Ваше существо может атаковать дважды этот ход', image: 'spell-5.jpg' },
    { id: 67, name: 'Тёмный завет', type: 'spells', hp: 0, mana: 1, ability: 'Восстановите 1 МР. Враг выбирает: получить 1 урон или потерять 1 МР', image: 'spell-6.jpg' },
    { id: 68, name: 'Воскрешение', type: 'spells', hp: 0, mana: 3, ability: 'Верните существо из сброса на поле', image: 'spell-7.jpg' },
    { id: 69, name: 'Телепортация', type: 'spells', hp: 0, mana: 2, ability: 'Переместите ваше или враждебное существо в его руку', image: 'spell-8.jpg' },
    { id: 70, name: 'Анализ слабости', type: 'spells', hp: 0, mana: 1, ability: 'Враждебное существо получает -1 АТК до конца его хода', image: 'spell-9.jpg' },
    { id: 71, name: 'Призыв абиссиан', type: 'spells', hp: 0, mana: 3, ability: 'Разыграйте демона из вашей руки бесплатно (стоимость -0 МР)', image: 'spell-10.jpg' },
    { id: 72, name: 'Магический взрыв', type: 'spells', hp: 0, mana: 2, ability: 'Нанесите 1 урон всем враждебным существам', image: 'spell-11.jpg' },
    { id: 73, name: 'Дублирование', type: 'spells', hp: 0, mana: 2, ability: 'Создайте копию одного вашего существа', image: 'spell-12.jpg' },
    { id: 74, name: 'Заморозка', type: 'spells', hp: 0, mana: 1, ability: 'Враждебное существо переходит в усталость', image: 'spell-13.jpg' },
    { id: 75, name: 'Жертва крови', type: 'spells', hp: 0, mana: 1, ability: 'Герой получает 2 урона. Восстановите 3 МР', image: 'spell-14.jpg' },
    { id: 76, name: 'Кража', type: 'spells', hp: 0, mana: 2, ability: 'Возьмите 1 случайную карту из руки противника', image: 'spell-15.jpg' },
    { id: 77, name: 'Усиление', type: 'spells', hp: 0, mana: 2, ability: 'Существо получает +2 АТК. После его атаки уходит в сброс', image: 'spell-16.jpg' },
    { id: 78, name: 'Омоложение', type: 'spells', hp: 0, mana: 2, ability: 'Восстановите 3 ХР', image: 'spell-17.jpg' },
    { id: 79, name: 'Завихрение судьбы', type: 'spells', hp: 0, mana: 3, ability: 'Оба игрока берут по 1 случайной карте из сброса', image: 'spell-18.jpg' },
    { id: 80, name: 'Чумной туман', type: 'spells', hp: 0, mana: 2, ability: 'Все враждебные существа получают -1 ХР', image: 'spell-19.jpg' },
    { id: 81, name: 'Магический знак', type: 'spells', hp: 0, mana: 1, ability: 'Существо не может быть атакованием до конца следующего хода противника', image: 'spell-20.jpg' },
    { id: 82, name: 'Апокалипсис', type: 'spells', hp: 0, mana: 4, ability: 'Случайное существо противника идёт в сброс', image: 'spell-21.jpg' },
];

// Типы карт для фильтрации
const CARD_TYPES = {
    heroes: 'Герои',
    beasts: 'Звери',
    demons: 'Демоны',
    spirits: 'Духи',
    undead: 'Нежить',
    dragons: 'Драконы',
    orcs: 'Орки',
    weapons: 'Орудия',
    traps: 'Ловушки',
    artifacts: 'Артефакты',
    catacombs: 'Входы в катакомбы',
    spells: 'Заклинания'
};

// Получить все карты определённого типа
function getCardsByType(type) {
    // Получить карты из storage, если они есть
    let cards = getStorageCards();
    if (!cards || cards.length === 0) {
        cards = CARDS_DATABASE;
    }
    
    if (!type) {
        return cards;
    }
    
    let filteredCards = cards.filter(card => card.type === type);
    
    // Для гибридных карт, добавляем их к обоим типам
    if (type === 'beasts' || type === 'demons' || type === 'spirits' || type === 'undead') {
        const hybridCards = cards.filter(card => card.hybrid && card.hybridTypes && card.hybridTypes.includes(type));
        filteredCards = filteredCards.concat(hybridCards);
    }
    
    return filteredCards;
}

// Функция поиска
function searchCards(query) {
    // Получить карты из storage, если они есть
    let cards = getStorageCards();
    if (!cards || cards.length === 0) {
        cards = CARDS_DATABASE;
    }
    
    const lowerQuery = query.toLowerCase();
    return cards.filter(card => 
        card.name.toLowerCase().includes(lowerQuery) ||
        card.ability.toLowerCase().includes(lowerQuery)
    );
}

// Функция сортировки
function sortCards(cards, sortType) {
    const sorted = [...cards];
    
    switch(sortType) {
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
            break;
        case 'atk':
            sorted.sort((a, b) => b.atk - a.atk);
            break;
        case 'hp':
            sorted.sort((a, b) => b.hp - a.hp);
            break;
        case 'mana':
            sorted.sort((a, b) => a.mana - b.mana);
            break;
    }
    
    return sorted;
}
