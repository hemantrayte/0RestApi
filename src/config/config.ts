import {config as conf} from 'dotenv'
conf()


const _confing = {
  port:process.env.PORT,
  databaseUrl:process.env.MONGODB_URI,
  env:process.env.NODE_ENV,
  jwtSecret:process.env.JWT_SECRET,
  expireJWT:process.env.JWT_EXPIRE
};

export const confing = Object.freeze(_confing)

