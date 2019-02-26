import mongoose from 'mongoose';
import _ from 'lodash';

import User from '../models/user';

const connect = ({ db }) => ({
  connect: () => {
    mongoose.connect(db, (err, res) => {
      if (err) {
        throw err;
        return;
      }
      console.log('DB CONNECTED SUCCESSFULLY');
    });
  }
});

const count = state => ({
  count: async (model, query) => {
    try {
      const total = await model.count(query);

      return total;
    } catch (err) {
      return err;
    }
  }
});

const getUsers = state => ({
  getUsers: async (start, limit) => {
    try {
      const users = await User.find(
        { state: true },
        'name email role state google img'
      )
        .skip(parseInt(start, 10))
        .limit(parseInt(limit, 10))
        .exec();

      return { users, User };
    } catch (err) {
      return err;
    }
  }
});

const createUser = state => ({
  createUser: async user => {
    try {
      let newUser = new User(user);
      const savedUser = await newUser.save();

      return savedUser;
    } catch (err) {
      return err;
    }
  }
});

const updateUser = state => ({
  updateUser: async (id, body) => {
    try {
      const updateUserData = _.pick(body, [
        'name',
        'email',
        'img',
        'role',
        'state'
      ]);

      const user = await User.findByIdAndUpdate(id, updateUserData, {
        new: true,
        runValidators: true
      });

      return user;
    } catch (err) {
      return err;
    }
  }
});

const deleteUser = state => ({
  deleteUser: async (id, data) => {
    try {
      const user = await User.findByIdAndUpdate(id, data, { new: true });

      return user;
    } catch (err) {
      return err;
    }
  }
});

const findUser = state => ({
  findUser: async query => {
    console.log('query', query);
    try {
      const user = await User.findOne(query);
      console.log('user', user);

      return user;
    } catch (err) {
      return err;
    }
  }
});

const Db = configDB => {
  console.log('DATABASE =================================');
  let state = {
    db: configDB
  };
  return Object.assign(
    {},
    connect(state),
    getUsers(state),
    count(state),
    createUser(state),
    updateUser(state),
    deleteUser(state),
    findUser(state)
  );
};

export default Db;
