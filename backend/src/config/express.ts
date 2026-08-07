import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import routes from './routes';
import logger from './winston';
import { APIError } from '../errors/APIError';

export const buildExpressApp = (): Application => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());

  app.use('/api', routes);

  app.use(
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      logger.error(err.stack || err.message);

      if (err instanceof APIError) {
        res.status(err.statusCode).json({
          success: false,
          message: err.isPublic ? err.message : 'Something went wrong',
        });
        return;
      }

      // Unknown/unexpected error — never trust its message to the client
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
  );

  return app;
};