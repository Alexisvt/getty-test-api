import { Request, Response } from 'express';

import L from '../../../common/logger';
import petManagementService from '../../services/pet-management.service';

export class Controller {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await petManagementService.create(req.body);
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
      const result = await petManagementService.getPetById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).end();
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const result = await petManagementService.deleteById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).end();
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const result = await petManagementService.updatePet(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).end();
    }
  }
}

export default new Controller();
