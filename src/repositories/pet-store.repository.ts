import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {PetStore, PetStoreRelations} from '../models';

export class PetStoreRepository extends DefaultCrudRepository<
  PetStore,
  typeof PetStore.prototype.id,
  PetStoreRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(PetStore, dataSource);
  }
}
