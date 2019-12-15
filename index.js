const env = require('dotenv');
env.config();

const { httpsServer } = require('./server');
const port = Number(process.env.SERVER_HTTPS_PORT);

httpsServer.listen({ port }, () => {
  console.log('Server starting');
});

console.log(`Сервер запущен на порту: ${port}`);
