import { Document, model, Schema } from 'mongoose';

export interface IPetModel extends Document {
  name: string;
  description: string;
  age: number;
}

const PetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

export const PetModel = model<IPetModel>('pet', PetSchema);
