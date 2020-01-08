module.exports = {
  // ПРОСТРАНСТВО ИМЕН
  NAMESPACES: {
    GUEST: {
      NAME: '/GUEST'
    },
    USER: {
      NAME: '/USER'
    },
  },
  // ДОСТУПНЫЕ КОМНАТЫ ДЛЯ ПОДКЛЮЧЕНИЯ
  ROOMS: {
    ADMINS: {
      NAME: 'ADMINS'
    },
    PUBLIC_NEWS: {
      NAME: 'PUBLIC_NEWS'
    }
  },
  // СОБЫТИИ
  EVENTS: {
    AUTH: {
      // emit когда гость подключился
      GUEST_CLIENT_CONNECTED: 'guest:client:connected',
      // авторизация гостевого пользователя
      GUEST_SERVER_LOGIN: 'guest:server:auth',
      GUEST_CLIENT_LOGIN: 'guest:client:auth'
    },

    USER: {
      // emit отправка данные пользователя когда пользователь подключился
      USER_CLIENT_CONNECTED: 'user:client:connected',
      // socket событие для получение профиль пользователя
      USER_SERVER_GET_PROFILE: 'user:server:get_profile',
      USER_CLIENT_GET_PROFILE: 'user:client:get_profile'
    }
  },
};
