import { IQuery } from "@nestjs/cqrs";
import { ISpecification } from "src/core/specification";
import { Role } from "src/orga_structure/domain/Role";


export class FindRolesQuery implements IQuery {
    constructor(spec?: ISpecification<Role>) { }
}