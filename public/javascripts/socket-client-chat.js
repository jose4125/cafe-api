let socket = io();

let params = new URLSearchParams(window.location.search);

console.log('params', !params.has('name'), !params.has('room'));
console.log('params', !params.has('name') || !params.has('room'));
if (!params.has('name') || !params.has('room')) {
  console.log('no params');
  window.location = '/chat';
  throw new Error('name and room are required');
}

const user = {
  name: params.get('name'),
  room: params.get('room')
};

socket.on('connect', function connectIO() {
  console.log('connected with the server by socket');

  socket.emit('joinRoom', user, function connectedUsers(res) {
    console.log('connected users', res);
  });
});

socket.on('disconnect', function disconnect() {
  console.log('socket disconected');
});

socket.on('leaveMessage', function leaveMessage(res) {
  console.log('leave', res);
});

socket.on('newMessage', function sendMessage(res) {
  console.log('newMessage', res);
});

socket.on('usersAtRoom', function usersAtRoom(res) {
  console.log('user at room', res);
});

socket.on('privedMessage', function privedMessage(message) {
  console.log('prived message', message);
});
