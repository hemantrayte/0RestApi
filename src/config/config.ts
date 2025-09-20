import {config as conf} from 'dotenv'
conf()


const _confing = {
  port:process.env.PORT,
  databaseUrl:process.env.MONGODB_URI
};

export const confing = Object.freeze(_confing)

