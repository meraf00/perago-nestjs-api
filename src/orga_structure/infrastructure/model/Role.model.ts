import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class RoleModel {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => RoleModel, (role) => role.reportsTo, {
    onDelete: 'CASCADE',
  })
  subordinates: RoleModel[];

  @ManyToOne(() => RoleModel, (role) => role.id)
  reportsTo?: RoleModel;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;
}