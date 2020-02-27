module.exports = {
  development: {
    'username': process.env.DEV_DB_USERNAME,
    'password': process.env.DEV_DB_PASSWORD,
    'database': process.env.DEV_DB_NAME,
    'host': process.env.DEV_DB_HOSTNAME,
    'port': process.env.DEV_DB_PORT,
    'dialect': process.env.DEV_DB_DIALECT,
  },
  test: {
    'username': 'root',
    'password': '1',
    'database': 'database_test',
    'host': '127.0.0.1',
    'port': '3306',
    'dialect': 'mysql'
  },
  production: {
    'username': process.env.PROD_DB_USERNAME,
    'password': process.env.PROD_DB_PASSWORD,
    'database': process.env.PROD_DB_NAME,
    'host': process.env.PROD_DB_HOSTNAME,
    'port': process.env.PROD_DB_PORT,
    'dialect': process.env.PROD_DB_DIALECT,
  }
};

