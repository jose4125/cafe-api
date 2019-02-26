import jwt from 'jsonwebtoken';

import { config } from '../config/config';

export default (req, res, next) => {
  const token = req.query.token ? req.query.token : req.get('Authorization');

  jwt.verify(token, config.seed, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err
      });
    }
    req.user = decoded.user;
    next();
  });
};
