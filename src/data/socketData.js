module.exports = {
  // ПРОСТРАНСТВО ИМЕН
  NAMESPACES: {
    GUEST: 'GUEST', // канал не авторизованных гостей
    AUTHORIZED: 'AUTHORIZED' // пространство имен авторизованных пользователей
  },
  // ДОСТУПНЫЕ КОМНАТЫ ДЛЯ ПОДКЛЮЧЕНИЯ
  ROOMS: {
    ADMINS: 'ADMINS',
    PUBLIC_NEWS: 'PUBLIC_NEWS'
  },
  // СОБЫТИИ SOCKET IO
  EVENTS: {
    // emit когда гость подключился
    GUEST_CLIENT_CONNECTED: 'guest:client:connected',
    // авторизация гостевого пользователя
    GUEST_SERVER_LOGIN: 'guest:server:auth',
    GUEST_CLIENT_LOGIN: 'guest:client:auth',
    // emit отправка данные пользователя когда пользователь подключился
    USER_CLIENT_CONNECTED: 'user:client:connected',
    // socket событие для получение профиль пользователя
    USER_SERVER_GET_PROFILE: 'user:server:get_profile',
    USER_CLIENT_GET_PROFILE: 'user:client:get_profile',

    // принятие внутреннего направления
    SERVER_VNYT_NAPRAVLENIE_ACCEPT:               'server:vnyt_napravlenie:accept',
    CLIENT_VNYT_NAPRAVLENIE_ACCEPT_SUCCESS:       'client:vnyt_napravlenie:accept:success',
    CLIENT_VNYT_NAPRAVLENIE_ACCEPT_SUCCESS_SHARE: 'client:vnyt_napravlenie:accept:success:share',

    CLIENT_VNYT_NAPRAVLENIE_STATUS_UPDATED: 'client:vnyt_napravlenie:status:updated',

    // отклонение внутреннего направления
    SERVER_VNYT_NAPRAVLENIE_REJECT:         'server:vnyt_napravlenie:reject',
    CLIENT_VNYT_NAPRAVLENIE_REJECT:         'client:vnyt_napravlenie:reject',
    CLIENT_VNYT_NAPRARVLENIE_REJECT_SHARE:  'client:vnyt_napravlenie:reject:share',

    // когда врач отправляет направление на внутренний
    SERVER_NAPRAVLENIE_SEND_TO_OTDEL:       'server:napravlenie:send_to_otdel',
    CLIENT_NAPRAVLENIE_SEND_TO_OTDEL:       'client:napravlenie:send_to_otdel',
    CLIENT_NAPRAVLENIE_SEND_TO_OTDEL_SHARE: 'client:napravlenie:send_to_otdel:share',

    // когда врач начинает исследование
    SERVER_START_ISLEDOVANIE:       'server:start:isledovanie',
    CLIENT_START_ISLEDOVANIE:       'client:start:isledovanie',
    CLIENT_START_ISLEDOVANIE_SHARE: 'client:start:isledovanie:share',

    SERVER_FINISH_ISLEDOVANIE:        'server:finish:isledovanie',
    CLIENT_FINISH_ISLEDOVANIE:        'client:finish:isledovanie',
    CLIENT_FINISH_ISLEDOVANIE_SHARE:  'client:finish:isledovanie:share',

    SERVER_GENERATE_PROTOCOL:       'server:generate:protocol',
    CLIENT_GENERATE_PROTOCOL:       'client:generate:protocol',
    CLIENT_GENERATE_PROTOCOL_SHARE: 'client:generate:protocol:share',

  },
};
