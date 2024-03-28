import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindRolesQuery } from "../FindRolesQuery";
import { FindRolesResult } from "../result/FindRolesResult";
import { RolesRepository } from "src/orga_structure/domain/RoleRepository";


@QueryHandler(FindRolesQuery)
export class FindRolesHandler implements IQueryHandler<FindRolesQuery, FindRolesResult> {
    constructor(private readonly rolesRepository: RolesRepository) { }

    async execute(query: FindRolesQuery): Promise<FindRolesResult> {
        const roles = await this.rolesRepository.find();

        const rolesDto = roles.map(role => (
            { ...role, reportsTo: role.reportsTo.id, }))

        return new FindRolesResult(rolesDto);
    }
}