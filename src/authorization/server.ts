import express from 'express';
import { connectDB } from './db';
import AuthRoutes from './routes/auth.routes';
import UserRoutes from './routes/user.routes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', AuthRoutes, UserRoutes);

export const authorizationServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
  } catch (inErr) {
    console.log(inErr);
    process.exit();
  }
};
