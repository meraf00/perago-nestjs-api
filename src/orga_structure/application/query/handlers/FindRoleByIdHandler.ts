import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { RolesRepository } from "src/orga_structure/domain//RoleRepository";
import { FindRoleByIdQuery } from "../FindRoleByIdQuery";
import { FindRoleResult } from "../result/FindRoleResult";

@QueryHandler(FindRoleByIdQuery)
export class FindRoleByIdHandler implements IQueryHandler<FindRoleByIdQuery, FindRoleResult> {
    constructor(private readonly rolesRepository: RolesRepository) { }

    async execute(query: FindRoleByIdQuery): Promise<FindRoleResult> {
        const role = await this.rolesRepository.findById(query.id);

        const roleDto = { ...role, reportsTo: role.reportsTo.id, }

        return new FindRoleResult(roleDto);
    }
}