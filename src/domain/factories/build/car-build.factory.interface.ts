import { CarBuilder } from '../../builds/car.builder';
import { BuilderFactory } from './builder.factory';

export interface CarBuilderFactoryInterface extends BuilderFactory<CarBuilder> {
  configureBuilder(schema: any, domain: any): Promise<any>;
}
