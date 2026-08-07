import { config } from './config/environments';
import { connectDB } from './config/mongoose';
import { buildExpressApp } from './config/express';
import { registerExceptionHandlers } from './config/exceptionHandler';
import { registerPassportStrategies } from './config/passport';
import logger from './config/winston';

const start = async () => {
  registerExceptionHandlers();
  await connectDB();
  registerPassportStrategies();

  const app = buildExpressApp();

  app.listen(config.port, () => {
    logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
  });
};

start();