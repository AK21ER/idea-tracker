import { config } from './config/environments';
import { connectDB } from './config/mongoose';

const start = async () => {
  await connectDB();
  console.log(`Config loaded. Running in ${config.nodeEnv} mode on port ${config.port}`);
};

start();