const env = require('dotenv');
env.config();

const { httpServer } = require('./server');
const port = Number(process.env.SERVER_PORT);

httpServer.listen({ port }, () => {
  console.log('Server starting');
});

console.log(`Сервер запущен на порту: ${port}`);
