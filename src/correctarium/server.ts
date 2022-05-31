import express from 'express';
import makeOrder from './routes/make-order.routes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', makeOrder);

export const runServer = () => {
  app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
};
