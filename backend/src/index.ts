import { config } from './config/environments';
import { connectDB } from './config/mongoose';
import { buildExpressApp } from './config/express';
import { registerExceptionHandlers } from './config/exceptionHandler';
import logger from './config/winston';

const start = async () => {
  registerExceptionHandlers();
  await connectDB();

  const app = buildExpressApp();

  app.listen(config.port, () => {
    logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
  });
};

start();