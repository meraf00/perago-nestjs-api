import {
  Check,
  Column,
  Entity,
  PrimaryColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
@Check(`"parentId" <> "id"`)
export class Role {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @TreeChildren()
  subordinates: Role[];

  @TreeParent()
  parent: Role;

  @Column({ unique: true, type: String })
  isRoot: string;

  @Column({ type: 'uuid', nullable: true })
  parentId: string;
}
