import { OrderBuilder } from '../../builds/order.builder';
import { BuilderFactory } from './builder.factory';

export interface OrderBuilderFactoryInterface
  extends BuilderFactory<OrderBuilder> {
  configureBuilder(
    schema: any,
    domain: any,
    address: any,
    car: any,
    client: any,
  ): Promise<any>;
}
