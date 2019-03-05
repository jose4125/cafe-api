let socket = io();
socket.on('connect', function connectIO() {
  console.log('connected with the server by socket');
});

socket.on('disconnect', function disconnect() {
  console.log('socket disconected');
});

socket.on('welcome', function welcome(data) {
  console.log('welcome', data);
});

socket.emit(
  'sendMessage',
  { user: 'jose', message: 'hola cafe' },
  function sendMessage(data) {
    console.log(data.res);
  }
);
