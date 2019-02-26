import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env' });

export const config = {
  db: {
    service: process.env.DATABASE_SERVICE || process.env.DEV_DATABASE_SERVICE,
    host: process.env.DATABASE_HOST || process.env.DEV_DATABASE_HOST,
    port: process.env.DATABASE_PORT || process.env.DEV_DATABASE_PORT,
    db: process.env.DATABASE || process.env.DEV_DATABASE
  },
  port: process.env.PORT || 5000,
  expirationToken:
    process.env.EXPIRATION_TOKEN || process.env.DEV_EXPIRATION_TOKEN,
  seed: process.env.SEED_AUTH || process.env.DEV_SEED_AUTH,
  googleClientId:
    process.env.GOOGLE_CLIENT_ID || process.env.DEV_GOOGLE_CLIENT_ID,
  googleClientSecret:
    process.env.GOOGLE_CLIENT_SECRET || process.env.DEV_GOOGLE_CLIENT_SECRET
};

export const getDatabaseUrl = () => {
  const { service, host, port, db } = config.db;
  return `${service}.${host}:${port}/${db}`;
};

export const getExpirationToken = () => {
  const { expirationToken } = config;
  return expirationToken
    .split('*')
    .map(value => parseInt(value))
    .reduce((acc, num) => acc * num);
};
