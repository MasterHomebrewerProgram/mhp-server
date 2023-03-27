import express from 'express';
import v1 from './v1'

const app = express();
const port = 3000;

app.use('/api/v1', v1)

app.get('/', (req, res) => {
  res.send('Welcome to the MHP Homepage!');
});

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`);
});