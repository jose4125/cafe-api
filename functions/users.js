const add = state => ({
  addUser: (id, name, room) => {
    console.log(id, name);
    let user = { id, name, room };
    state.users.push(user);

    return state.users;
  }
});

const user = state => ({
  getUserById: id => state.users.filter(user => user.id === id)[0]
});

const allUsers = state => ({
  getAllUsers: () => state.users
});

const room = state => ({
  getUsersByRoom: room => state.users.filter(user => user.room === room)
});

const deleteUser = state => ({
  deleteUser: id => {
    let userDB = user(state).getUserById(id);
    state.users = state.users.filter(user => user.id !== id);

    return userDB;
  }
});

export default function Users() {
  let state = {
    users: []
  };

  return {
    ...add(state),
    ...user(state),
    ...allUsers(state),
    ...room(state),
    ...deleteUser(state)
  };
}
