import express from 'express';
import CustomRequest from './routes/custom-request.route';

const app = express();
const PORT = 4000;

app.use(express.json());

app.use('/', CustomRequest);

export const jsonDbServer = () => {
  app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
};
