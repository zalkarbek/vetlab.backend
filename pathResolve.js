

module.exports = (root) => {
  return {
    use: root.require,
    ROOT_PATH: root,
    PUBLIC_PATH: root.setPath('/public'),
    STORAGE_PATH: root.setPath('/storage'),
    APP_PATH: root.setPath('/src/app'),
    CLASS_PATH: root.setPath('/src/class'),
    CONFIG_PATH: root.setPath('/src/config'),
    DATA_PATH: root.setPath('/src/data'),
    DB_PATH: root.setPath('/src/db'),
    HELPER_PATH: root.setPath('/src/helpers'),
    I18N_PATH: root.setPath('/src/i18n'),
    MIDDLEWARE_PATH: root.setPath('/src/middleware'),
    SERVICE_PATH: root.setPath('/src/service'),
  };
};
