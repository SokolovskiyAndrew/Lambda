import express from 'express';
import CustomRequest from './routes/custom-request.route';

const jsonDbApp = express();
const PORT = 4000;

jsonDbApp.use(express.json());

jsonDbApp.use('/', CustomRequest);

export const jsonDbServer = () => {
  jsonDbApp.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
};

export default jsonDbApp;
