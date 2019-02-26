import bcrypt from 'bcrypt';
import Db from '../utils/db';

const db = Db();

export async function getUsers(req, res, next) {
  const { start = 0, limit = 5 } = req.query;

  try {
    const { users, User } = await db.getUsers(start, limit);
    const total = await db.count(User, { state: true });
    res.json({
      ok: true,
      users,
      total
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      err
    });
  }
}

export async function createUser(req, res, next) {
  let { body } = req;

  try {
    const newUser = {
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      role: body.role
    };

    const user = await db.createUser(newUser);

    res.status(201).json({
      ok: true,
      user
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      err: {
        message: err.message
      }
    });
  }
}

export async function updateUser(req, res, next) {
  const id = req.params.id;
  const body = req.body;

  try {
    const user = await db.updateUser(id, body);
    res.json({
      ok: true,
      user
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      err
    });
  }
}

export async function deleteUser(req, res, next) {
  const id = req.params.id;
  const changeState = { state: false };

  try {
    const user = await db.deleteUser(id, changeState);
    res.json({
      ok: true,
      users: user
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      err
    });
  }
}
