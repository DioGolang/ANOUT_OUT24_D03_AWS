export interface PersistenceFactory<TSchema, TDomain> {
  createSchema(): TSchema;
}
