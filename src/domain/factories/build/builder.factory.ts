export abstract class BuilderFactory<TBuilder> {
  abstract createBuilder(): TBuilder;
}
