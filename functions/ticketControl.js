import data from '../data/data.json';
import fs from 'fs';

const setNewDay = state => {
  state.last = 0;
  state.pendingTickets = [];
  state.lastTickets = [];
  saveData(state).saveData();
};

const isNewDay = state => state.data.today !== state.today;

const nextTicket = state => ({
  nextTicket: () => {
    state.last += 1;
    let ticket = Ticket(state.last, null).getTicket();
    state.pendingTickets.push(ticket);
    saveData(state).saveData();
  }
});

const getLastTicket = state => ({
  getLastTicket: () => {
    return `Ticket ${state.last}`;
  }
});

const attendTicket = state => ({
  attendTicket: desktopNumber => {
    if (!state.pendingTickets.length) {
      return 'no pending tickets';
    }

    let ticketNumber = state.pendingTickets[0].ticketNumber;
    state.pendingTickets.shift();

    let newTicket = Ticket(ticketNumber, desktopNumber).getTicket();
    state.lastTickets.unshift(newTicket);

    if (state.lastTickets.length > 4) {
      state.lastTickets.splice(-1, 1);
    }

    saveData(state).saveData();

    return newTicket;
  }
});

const saveData = state => ({
  saveData: () => {
    const jsonData = {
      last: state.last,
      today: state.today,
      pendingTickets: state.pendingTickets,
      lastTickets: state.lastTickets
    };
    const jsonString = JSON.stringify(jsonData);
    fs.writeFileSync('./data/data.json', jsonString);
  }
});

const getLastTickets = state => ({
  getLastTickets: () => state.lastTickets
});

export default function TicketControl() {
  let state = {
    last: 0,
    today: new Date().getDate(),
    data: data,
    pendingTickets: [],
    lastTickets: []
  };

  console.log('isNewDay', isNewDay(state));

  if (isNewDay(state)) {
    setNewDay(state);
  } else {
    state.last = data.last;
    state.pendingTickets = data.pendingTickets;
    state.lastTickets = data.lastTickets;
  }

  console.log('state', state);
  return {
    ...isNewDay(state),
    ...getLastTicket(state),
    ...nextTicket(state),
    ...saveData(state),
    ...attendTicket(state),
    ...getLastTickets(state)
  };
}

const getTicket = state => ({
  getTicket: () => state
});

function Ticket(ticketNumber, desktopNumber) {
  let state = {
    ticketNumber,
    desktopNumber
  };

  return {
    ...getTicket(state)
  };
}
