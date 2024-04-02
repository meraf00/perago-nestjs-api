import { AggregateRoot } from '@nestjs/cqrs';
import { BaseModel } from '../../../shared/BaseModel';
import { RoleValidationException } from './Exceptions';

export type RoleProperties = BaseModel & {
  name: string;
  description: string;
  reportsTo: Role | null;
  subordinates: Role[];
};

export class Role extends AggregateRoot implements RoleProperties {
  public readonly id: string;
  public name: string;
  public description: string;
  public reportsTo: Role | null;
  public subordinates: Role[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(properties: RoleProperties) {
    super();
    Object.assign(this, properties);
  }

  updateName(name: string): void {
    if (name.length < 1) {
      throw new RoleValidationException(
        'Role name must be at least 1 character long.',
      );
    }

    this.name = name;
    this.updatedAt = new Date();
  }

  updateDescription(description: string): void {
    this.description = description;
    this.updatedAt = new Date();
  }

  updateParent(parentRole: Role): void {
    if (this.reportsTo === null && parentRole !== null) {
      throw new RoleValidationException('Root role cannot have a parent.');
    }

    if (parentRole && this.id === parentRole.id) {
      throw new RoleValidationException('Role cannot report to itself.');
    }

    this.reportsTo = parentRole;
    this.updatedAt = new Date();
  }

  addSubordinate(role: Role): void {
    role.updateParent(this);
    this.subordinates.push(role);
    this.updatedAt = new Date();
  }
}
