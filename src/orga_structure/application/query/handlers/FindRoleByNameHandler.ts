import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { RolesRepository } from "src/orga_structure/domain/RoleRepository";
import { FindRoleByNameQuery } from "../FindRoleByNameQuery";
import { FindRolesResult } from "../result/FindRolesResult";
import { RoleNameSpec } from "src/orga_structure/domain/RoleSpecification";

@QueryHandler(FindRoleByNameQuery)
export class FindRoleByNameHandler implements IQueryHandler<FindRoleByNameQuery, FindRolesResult> {
    constructor(private readonly rolesRepository: RolesRepository) { }

    async execute(query: FindRoleByNameQuery): Promise<FindRolesResult> {
        const spec = new RoleNameSpec(query.name);

        const roles = await this.rolesRepository.findOne(spec);

        const roleDto = roles.map((role) => ({ ...role, reportsTo: role.reportsTo.id, }))

        return new FindRolesResult(roleDto);
    }
}