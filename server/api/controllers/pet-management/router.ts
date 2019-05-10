import express from 'express';

import controller from './controller';

export default express
  .Router()
  .post('/', controller.create)
  .delete('/delete/:id', controller.delete)
  .get('/:id', controller.byId);
