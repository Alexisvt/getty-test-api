import L from '../../common/logger';
import { IPetModel, PetModel } from '../models/pet.model';

export class PetManagementService {
  async create(pet: IPetModel): Promise<any> {
    try {
      const petData: IPetModel = {
        name: pet.name,
        description: pet.description,
        age: pet.age,
      };
      const petModel = new PetModel(petData);
      const newPet = await petModel.save();
      return newPet;
    } catch (error) {
      L.error(`An error happened when creating a pet`);
      throw error;
    }
  }

  async getPetById(id: string): Promise<any> {
    L.info(`fetch pet with id ${id}`);

    try {
      const petData = await PetModel.findById(id);
      return petData;
    } catch (error) {
      L.error(`An error ocurred while fetching the pet: ${error}`);
      throw error;
    }
  }
}

export default new PetManagementService();
