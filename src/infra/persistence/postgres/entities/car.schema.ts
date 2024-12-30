import { Entity } from 'typeorm/decorator/entity/Entity';
import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemsSchema } from './items.schema';
import { OrdersSchema } from './orders.schema';

@Entity('Car')
export class CarSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  plate: string;

  @Column()
  year: number;

  @Column()
  km: number;

  @Column()
  dailyRate: number;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ItemsSchema, (items) => items.car)
  items: ItemsSchema[];

  @OneToMany(() => OrdersSchema, (orders) => orders.cars)
  order: OrdersSchema;
}
