import {config as conf} from 'dotenv'
conf()


const _confing = {
  port:process.env.PORT,
  databaseUrl:process.env.MONGODB_URI,
  env:process.env.NODE_ENV
};

export const confing = Object.freeze(_confing)

