import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { config, getExpirationToken } from '../config/config';

const client = new OAuth2Client(config.googleClientId);

export async function signToken(userDB) {
  console.log('signToken');
  try {
    const token = await jwt.sign(
      {
        user: userDB
      },
      config.seed,
      {
        expiresIn: getExpirationToken()
      }
    );

    return token;
  } catch (err) {
    return err;
  }
}

export async function verifyToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleClientId // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const { name, email, picture } = payload;
    return {
      name,
      email,
      img: picture,
      google: true
    };
  } catch (err) {
    return err;
  }
}
