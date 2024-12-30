import { UserBuilder } from '../../builds/user.builder';
import { BuilderFactory } from './builder.factory';

export interface UserBuilderFactoryInterface
  extends BuilderFactory<UserBuilder> {
  configureBuilder(schema: any, domain: any): Promise<any>;
}
