let socket = io();
const label = $('#lblNuevoTicket');
socket.on('connect', function connectIO() {
  console.log('connected with the server by socket');
});

socket.on('disconnect', function disconnect() {
  console.log('socket disconected');
});

socket.on('currentState', function currentTicket(response) {
  console.log('current', response);
  label.text(response.currentTicket);
});

$('button').on('click', function clickButton() {
  socket.emit('nextTicket', null, function nextTicket(newTicket) {
    label.text(newTicket);
  });
});
