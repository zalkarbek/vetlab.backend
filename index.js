const env = require('dotenv');
env.config();

const { httpServer, db } = require('./server');
const port = Number(process.env.SERVER_PORT);

db
  .vetdb
  .authenticate()
  .then(() => {
    console.log('Connection has been database established successfully.');

    httpServer.listen({ port }, () => {
      console.log('Server starting');
    });

    console.log(`Сервер запущен на порту: ${port}`);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
