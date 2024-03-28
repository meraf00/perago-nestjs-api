import { CompositeSpecification } from "src/core/specification";
import { Role } from "./Role";


export class RoleNameSpec extends CompositeSpecification<Role> {

    constructor(private readonly name: string) {
        super();
    }

    isSatisfiedBy(role: Role): boolean {
        return role.name === this.name;
    }
}

export class ChildOfSpec extends CompositeSpecification<Role> {

    constructor(private readonly role: Role) {
        super();
    }

    isSatisfiedBy(role: Role): boolean {
        return role.reportsTo === this.role;
    }
} 