import bcrypt from 'bcrypt';
import { signToken, verifyToken } from '../utils/jwt';
import Db from '../utils/db';

const db = Db();

export async function authController(req, res) {
  let body = req.body;

  try {
    const user = await db.findUser({ email: body.email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'user or password invalid'
        }
      });
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'user or password invalid'
        }
      });
    }

    const token = await signToken(user);
    res.json({
      ok: true,
      user,
      token
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      err: {
        message: err.message
      }
    });
  }
}

export async function googleAuth(req, res) {
  const token = req.body.idtoken;
  try {
    const googleUser = await verifyToken(token);

    try {
      const user = await db.findUser({ email: googleUser.email });

      if (user && !user.google) {
        console.log('if ====================');
        return res.status(400).json({
          ok: false,
          err: {
            message: 'invalid user'
          }
        });
      }

      if (user && user.google) {
        console.log('ELSE ====================');
        const token = await signToken(user);

        return res.json({
          ok: true,
          user: user,
          token
        });
      }

      if (!user) {
        let newUser = {
          name: googleUser.name,
          email: googleUser.email,
          img: googleUser.img,
          google: true,
          password: ':)'
        };

        const savedUser = await db.createUser(newUser);
        const token = await signToken(user);

        return res.json({
          ok: true,
          user: savedUser,
          token
        });
      }
    } catch (err) {}
  } catch (err) {
    return res.status(403).json({
      ok: false,
      err
    });
  }
}

export function googlePlusRedirect(req, res) {
  console.log('authenticated user', res);
  // Successful authentication, redirect home.
  return res.json(req.user);
}
