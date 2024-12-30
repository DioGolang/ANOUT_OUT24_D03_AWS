import { Entity } from 'typeorm/decorator/entity/Entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressVo } from '../../../../domain/value-objects/address.vo';
import { OrdersStatusEnum } from '../../../../domain/enum/ordersStatus.enum';
import { CarSchema } from './car.schema';
import { ClientSchema } from './client.schema';

@Entity('Orders')
export class OrdersSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  initialDate: Date;

  @Column()
  finalDate: Date;

  @Column('jsonb')
  address: AddressVo;

  @Column({ type: 'float', nullable: true })
  rentalFee: number;

  @Column({ type: 'float', nullable: true })
  totalRentalValue: number;

  @Column({ nullable: true })
  orderClosingDate: Date;

  @Column({ type: 'float', nullable: true })
  lateFee: number;

  @Column({ type: 'enum', enum: OrdersStatusEnum, nullable: true })
  status: OrdersStatusEnum;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => CarSchema, (car) => car.order)
  @JoinColumn()
  cars: CarSchema;

  @ManyToOne(() => ClientSchema, (client) => client.order)
  @JoinColumn()
  clients: ClientSchema;
}
