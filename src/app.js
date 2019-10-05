import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import sentryConfig from './config/sentry';

import 'express-async-errors';
import routes from './routes';

import './database';

const isProduction = process.env.NODE_ENV === 'production';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());

    if (isProduction) {
      this.server.use(Sentry.Handlers.requestHandler());
    }

    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (isProduction) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    });
  }

  routes() {
    this.server.use(routes);

    if (isProduction) {
      this.server.use(Sentry.Handlers.errorHandler());
    }
  }
}

export default new App().server;
