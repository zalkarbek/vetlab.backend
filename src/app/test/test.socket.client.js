
module.exports = ({ socketServer, httpsServer, socketClient, app }) => {

  const client = socketClient.connect('https://localhost:3003/buses', {
    secure: true,
    rejectUnauthorized: false,
  });

  client.on('connect', () => {
    console.log('Я клиент подключился к серверу!!!');
  })
    .emit('join_room', { room: 'buses' })
    .emit('buses_hello', 'Привет сервер я клиент как дела ?');

  client.on('on_buses_coordinate', (data) => {
    data = [
      {},
      {},
      {},
      {}
    ];
  });

  client.on('on_bus_moving', (bus) => {
    bus = {
      nomer: '',
      lat: '',
      long: '',
      bearing: '',

    };
  });

  client.on('message', (data) => {
    console.log(data);
  });

};