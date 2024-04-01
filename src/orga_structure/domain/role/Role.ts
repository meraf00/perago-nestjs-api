import { AggregateRoot } from '@nestjs/cqrs';
import { BaseModel } from 'src/shared/BaseModel';

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
    this.name = name;
    this.updatedAt = new Date();
  }

  updateDescription(description: string): void {
    this.description = description;
    this.updatedAt = new Date();
  }

  updateParent(role: Role): void {
    this.reportsTo = role;
    this.updatedAt = new Date();
  }

  addSubordinate(role: Role): void {
    role.updateParent(this);
    this.subordinates.push(role);
    this.updatedAt = new Date();
  }
}
