let socket = io();

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('desktop')) {
  window.location = '/';
  throw new Error('desktop is required');
}

let desktop = searchParams.get('desktop');
let label = $('small');
$('h1').text('Desktop ' + desktop);

$('button').on('click', function clickButton() {
  socket.emit('attendTicket', { desktop: desktop }, function attendTicket(
    response
  ) {
    if (response === 'no pending tickets') {
      label.text(' ' + response);
      alert(response);
      return;
    }
    label.text(' -> Ticket ' + response.ticketNumber);
  });
});
