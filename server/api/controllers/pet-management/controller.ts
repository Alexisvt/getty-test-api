import { Request, Response } from 'express';

import L from '../../../common/logger';
import PetManagementService from '../../services/pet-management.service';


export class Controller {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await PetManagementService.create(req.body);
      L.info(`Pet was created ${result}`);
      res
        .status(201)
        .location(`/api/v1/pet/${result._id}`)
        .json(result);
    } catch (error) {
      L.error(`An error has ocurrend while creating the pet ${error}`);
      res.status(500).end();
    }
  }

  async byId(req: Request, res: Response): Promise<void> {
    try {
      const result = await PetManagementService.getPetById(req.params.id);
      res.json(result);
      res.status(200).json(result);
    } catch (error) {
      err => L.error(err);
      res.status(404).end();
    }
  }
}

export default new Controller();
