module.exports = {
  AUTH: {
    // авторизация гостевого пользователя
    GUEST_SERVER_LOGIN: 'guest:server:auth',
    GUEST_CLIENT_LOGIN: 'guest:client:auth'
  },

  USER: {
    // отправка данные пользователя когда он подключился к SOCKET
    USER_CLIENT_CONNECTED: 'user:client:connected',

    // SOCKET событие для получение профиль пользователя
    USER_SERVER_GET_PROFILE: 'user:server:get_profile',
    USER_CLIENT_GET_PROFILE: 'user:client:get_profile'
  }
};
