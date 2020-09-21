import * as express from 'express';
import { DB } from './app/db';

const db = new DB()
const app = express();

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
