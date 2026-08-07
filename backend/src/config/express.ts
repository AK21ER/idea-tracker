import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

export const buildExpressApp = (): Application => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());

  return app;
};