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
      res.status(500).end();
    }
  }

  async byId(req: Request, res: Response): Promise<void> {
    try {
      const result = await PetManagementService.getPetById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).end();
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const result = await PetManagementService.deleteById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).end();
    }
  }
}

export default new Controller();
