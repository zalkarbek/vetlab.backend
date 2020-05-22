const env = require('dotenv');
env.config();

const { httpServer, httpsServer, db } = require('./server');
const port = Number(process.env.SERVER_PORT);
const https_port = Number(process.env.SERVER_HTTPS_PORT);

db
  .vetdb
  .authenticate()
  .then(async () => {
    console.log('Connection has been database established successfully.');
    // await db.vetdb.sync();

    httpServer.listen({ port }, () => {
      console.log('Server Over HTTP starting');
    });

    httpsServer.listen({ port: https_port }, () => {
      console.log('Server Over HTTPS starting');
    });

    console.log(`Сервер запущен на порту: ${port}`);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
