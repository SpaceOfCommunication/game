import * as express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { DB } from './app/db';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./assets/db.json');
if (!config) {
  throw new Error('App config not found')
}

const db = new DB(config.url, config.login, config.password);
const app = express();

app.use(express.json());

// LOGGER CONFIGURATION

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transports: any[] = [
  new winston.transports.File({ filename: 'error.log', level: 'error' })
];
if (process.env.NODE_ENV !== 'production') {
  transports.push(new winston.transports.Console({ format: winston.format.simple() }));
}
app.use(expressWinston.logger({
  level: 'info',
  transports,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

// AUTH: CRETE NEW USER API

app.post('/api/user-create', async (req, res) => {
  const { username, password} = req.body;
  if (!username || !password) {
    res.status(400).send("Please provide valid username and password");
    return;
  }
  try {
    const result = await db.signUp(username, password);
    res.send(result);
  } catch(err) {
    if (err.name === 'conflict') {
      res.status(400).send({ message: 'User already exists. Choose another username'});
    } else if(err.name === 'forbidden') {
      res.status(400).send({ message: 'Invalid name. Choose another username'});
    } else {
      res.status(400).send({ message: 'Something went wrong. Please try again'});
    }
  }
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
