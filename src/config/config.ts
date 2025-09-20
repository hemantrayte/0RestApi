import {config as conf} from 'dotenv'
conf()


const _confing = {
  port:process.env.PORT
};

export const confing = Object.freeze(_confing)

