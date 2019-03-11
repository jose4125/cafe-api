import { io } from '../www';
import UsersControl from '../functions/users';
import Message from '../functions/messages';

const usersControl = UsersControl();

io.on('connection', client => {
  console.log('user connected successfully');

  client.on('joinRoom', (user, cb) => {
    console.log('user joined', user);
    if (!user.name || !user.room) {
      cb({
        error: true,
        message: 'name and room are required'
      });
      return;
    }

    client.join(user.room);

    const users = usersControl.addUser(client.id, user.name, user.room);
    client.broadcast
      .to(user.room)
      .emit('usersAtRoom', usersControl.getUsersByRoom(user.room));

    cb(usersControl.getUsersByRoom(user.room));
  });

  client.on('newMessage', message => {
    const user = usersControl.getUserById(client.id);
    const newMessage = Message(user.name, message.message).getMessage();
    client.broadcast.to(user.room).emit('newMessage', newMessage);
  });

  client.on('disconnect', () => {
    const deletedUser = usersControl.deleteUser(client.id);

    if (deletedUser) {
      console.log(
        'Message',
        Message('Admin', `${deletedUser.name} leaved this room`).getMessage()
      );
      client.broadcast
        .to(deletedUser.room)
        .emit(
          'leaveMessage',
          Message('Admin', `${deletedUser.name} leaved this room`).getMessage()
        );
      client.broadcast
        .to(deletedUser.room)
        .emit('usersAtRoom', usersControl.getUsersByRoom(deletedUser.room));
    }
  });

  client.on('privedMessage', data => {
    const user = usersControl.getUserById(client.id);
    client.broadcast
      .to(data.to)
      .emit('privedMessage', Message(user.name, data.message).getMessage());
  });
});
