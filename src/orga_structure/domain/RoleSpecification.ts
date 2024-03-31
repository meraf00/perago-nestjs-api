import { CompositeSpecification } from 'src/shared/specification';
import { Role } from './Role';

export class RoleNameSpec extends CompositeSpecification<Role> {
  constructor(private readonly name?: string) {
    super();
  }

  isSatisfiedBy(role: Role): boolean {
    if (this.name === undefined) {
      return true;
    }
    return role.name === this.name;
  }
}

export class RoleDescriptionContainsSpec extends CompositeSpecification<Role> {
  constructor(private readonly description?: string) {
    super();
  }

  isSatisfiedBy(role: Role): boolean {
    if (this.description === undefined) {
      return true;
    }
    return role.description.includes(this.description);
  }
}

export class ChildOfSpec extends CompositeSpecification<Role> {
  constructor(private readonly role?: Role | string | null) {
    super();
  }

  isSatisfiedBy(role: Role): boolean {
    if (typeof this.role === 'string') {
      return role.reportsTo.id === this.role;
    }
    if (this.role === null) {
      return role.reportsTo === null;
    }
    if (this.role === undefined) {
      return true;
    }
    return role.reportsTo === this.role;
  }
}
