import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('warehouses')
class Warehouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}

export default Warehouse;
