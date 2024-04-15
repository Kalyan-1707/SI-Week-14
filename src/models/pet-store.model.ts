import {Entity, model, property} from '@loopback/repository';

@model()
export class PetStore extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  species: string;

  @property({
    type: 'string',
    required: true,
  })
  breed: string;

  @property({
    type: 'number',
    required: true,
  })
  price: string;


  constructor(data?: Partial<PetStore>) {
    super(data);
  }
}

export interface PetStoreRelations {
  // describe navigational properties here
}

export type PetStoreWithRelations = PetStore & PetStoreRelations;
