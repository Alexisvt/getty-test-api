import L from '../../common/logger';
import { IPetModel, PetModel } from '../models/pet.model';

export class PetManagementService {
  async create(pet: IPetModel): Promise<IPetModel> {
    try {
      const petData: Partial<IPetModel> = {
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

  async getPetById(id: string): Promise<IPetModel> {
    L.info(`fetch pet with id ${id}`);

    try {
      const petData = await PetModel.findById(id);
      return petData;
    } catch (error) {
      L.error(`An error ocurred while fetching the pet: ${error}`);
      throw error;
    }
  }

  async deleteById(id: string): Promise<IPetModel> {
    L.info(`Deleting Pet with id: ${id}`);

    try {
      const result = await PetModel.findByIdAndDelete(id);
      L.info(`Pet ${result} was deleted`);
      return result;
    } catch (error) {
      L.error(`An error ocurred while deleting the pet: ${error}`);
      throw error;
    }
  }

  async updatePet(newPetData: IPetModel): Promise<IPetModel> {
    L.info(`Update data for Pet id: ${newPetData._id}`);
    try {
      const pet = await PetModel.findById(newPetData._id);

      pet.name = newPetData.name;
      pet.description = newPetData.description;
      pet.age = newPetData.age;

      return pet.save();
    } catch (error) {
      L.error(`An error has ocurred while updating the pet: ${newPetData._id}`);
      throw error;
    }
  }
}

export default new PetManagementService();
