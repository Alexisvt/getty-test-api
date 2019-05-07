import { Application } from 'express';

import examplesRouter from './api/controllers/examples/router';
import petManagementRouter from './api/controllers/pet-management/router';

export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/pet', petManagementRouter);
}
