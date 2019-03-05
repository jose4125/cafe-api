import { io } from '../www';
import TicketControl from '../functions/ticketControl';

const ticketControl = TicketControl();

io.on('connection', client => {
  console.log('user connected successfully');
  client.on('disconnect', () => {
    console.log('client disconnected');
  });

  client.emit('currentState', {
    currentTicket: ticketControl.getLastTicket(),
    lastTickets: ticketControl.getLastTickets()
  });

  client.on('nextTicket', (data, cb) => {
    ticketControl.nextTicket();
    const newTicket = ticketControl.getLastTicket();
    console.log('next ticket ', newTicket);
    cb(newTicket);
  });

  client.on('attendTicket', (data, cb) => {
    if (!data.desktop) {
      return cb({
        err: true,
        message: 'desktop is required'
      });
    }

    let newTicket = ticketControl.attendTicket(data.desktop);
    cb(newTicket);

    client.broadcast.emit('lastTickets', ticketControl.getLastTickets());
  });
});
