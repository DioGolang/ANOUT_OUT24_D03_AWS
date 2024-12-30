import { ClientBuilder } from '../../builds/client.builder';
import { BuilderFactory } from './builder.factory';

export interface ClientBuilderFactoryInterface
  extends BuilderFactory<ClientBuilder> {
  configureBuilder(schema: any, domain: any): Promise<any>;
}
