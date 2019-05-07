import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import os from 'os';
import path from 'path';

import l from './logger';
import installValidator from './swagger';

const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    mongoose
      .connect(
        'mongodb+srv://gettymadmin:fY8rCxHihNygmjN@cluster0-kwqzn.mongodb.net/test?retryWrites=true'
      )
      .then(result => {
        l.info('connected to the database');
      })
      .catch(err => l.error(err));
  }

  router(routes: (app: Application) => void): ExpressServer {
    installValidator(app, routes);
    return this;
  }

  listen(p: string | number = process.env.PORT): Application {
    const welcome = port => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${port}}`
      );
    http.createServer(app).listen(p, welcome(p));
    return app;
  }
}
