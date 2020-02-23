module.exports = {
  'development': {
    'username': 'admin',
    'password': '1',
    'database': 'vetdb',
    'host': '127.0.0.1',
    'port': '3306',
    'dialect': 'mysql'
  },
  'test': {
    'username': 'root',
    'password': '1',
    'database': 'database_test',
    'host': '127.0.0.1',
    'port': '3306',
    'dialect': 'mysql'
  },
  'production': {
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOSTNAME,
    'port': process.env.DB_PORT,
    'dialect': process.env.DB_DIALECT
  }
};

