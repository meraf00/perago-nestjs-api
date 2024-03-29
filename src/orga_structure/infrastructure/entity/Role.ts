import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class RoleEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => RoleEntity, (role) => role.reportsTo, {
    onDelete: 'CASCADE',
  })
  subordinates: RoleEntity[];

  @ManyToOne(() => RoleEntity, (role) => role.id)
  reportsTo?: RoleEntity;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;
}
