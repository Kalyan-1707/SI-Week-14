import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PetStore} from '../models';
import {PetStoreRepository} from '../repositories';

export class StoreController {
  constructor(
    @repository(PetStoreRepository)
    public petStoreRepository : PetStoreRepository,
  ) {}

  @post('/pet-stores')
  @response(200, {
    description: 'PetStore model instance',
    content: {'application/json': {schema: getModelSchemaRef(PetStore)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetStore, {
            title: 'NewPetStore',
            exclude: ['id'],
          }),
        },
      },
    })
    petStore: Omit<PetStore, 'id'>,
  ): Promise<PetStore> {
    return this.petStoreRepository.create(petStore);
  }

  @get('/pet-stores/count')
  @response(200, {
    description: 'PetStore model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PetStore) where?: Where<PetStore>,
  ): Promise<Count> {
    return this.petStoreRepository.count(where);
  }

  @get('/pet-stores')
  @response(200, {
    description: 'Array of PetStore model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PetStore, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PetStore) filter?: Filter<PetStore>,
  ): Promise<PetStore[]> {
    return this.petStoreRepository.find(filter);
  }

  @patch('/pet-stores')
  @response(200, {
    description: 'PetStore PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetStore, {partial: true}),
        },
      },
    })
    petStore: PetStore,
    @param.where(PetStore) where?: Where<PetStore>,
  ): Promise<Count> {
    return this.petStoreRepository.updateAll(petStore, where);
  }

  @get('/pet-stores/{id}')
  @response(200, {
    description: 'PetStore model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PetStore, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PetStore, {exclude: 'where'}) filter?: FilterExcludingWhere<PetStore>
  ): Promise<PetStore> {
    return this.petStoreRepository.findById(id, filter);
  }

  @patch('/pet-stores/{id}')
  @response(204, {
    description: 'PetStore PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetStore, {partial: true}),
        },
      },
    })
    petStore: PetStore,
  ): Promise<void> {
    await this.petStoreRepository.updateById(id, petStore);
  }

  @put('/pet-stores/{id}')
  @response(204, {
    description: 'PetStore PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() petStore: PetStore,
  ): Promise<void> {
    await this.petStoreRepository.replaceById(id, petStore);
  }

  @del('/pet-stores/{id}')
  @response(204, {
    description: 'PetStore DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.petStoreRepository.deleteById(id);
  }
}
