import { Entity } from 'typeorm/decorator/entity/Entity';
import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrdersSchema } from './orders.schema';

@Entity('Client')
export class ClientSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  tel: string;

  @Column()
  dateOfBirth: Date;

  @Column({ default: true })
  status: boolean;

  //esta fazendo na mao, deve passar pro banco, @Column({ type: 'timestamp' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => OrdersSchema, (order) => order.clients)
  order: OrdersSchema;
}
