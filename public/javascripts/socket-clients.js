let socket = io();

const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');
const lblDesktop1 = $('#lblDesktop1');
const lblDesktop2 = $('#lblDesktop2');
const lblDesktop3 = $('#lblDesktop3');
const lblDesktop4 = $('#lblDesktop4');

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblDesktops = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4];

socket.on('connect', function connectIO() {
  console.log('connected with the server by socket');
});

socket.on('disconnect', function disconnect() {
  console.log('socket disconected');
});

socket.on('currentState', function currentState(currentData) {
  updateHtml(currentData.lastTickets);
});

socket.on('lastTickets', function lastTickets(tickets) {
  const audio = new Audio('audio/new-ticket.mp3');
  audio.play();
  updateHtml(tickets);
});

function updateHtml(lastTickets) {
  lastTickets.forEach((element, index) => {
    lblTickets[index].text('Ticket' + element.ticketNumber);
    lblDesktops[index].text('Desktop' + element.desktopNumber);
  });
}
