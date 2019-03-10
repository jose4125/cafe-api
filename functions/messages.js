const newMessage = state => ({
  getMessage: () => ({
    name: state.name,
    message: state.message,
    date: new Date().getTime()
  })
});

export default function Message(name, message) {
  let state = {
    name,
    message
  };

  return {
    ...newMessage(state)
  };
}
