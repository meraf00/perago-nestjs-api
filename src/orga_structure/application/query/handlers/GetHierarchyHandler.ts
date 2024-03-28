import { QueryHandler } from "@nestjs/cqrs";
import { GetHierarchyQuery } from "../GetHierarchyQuery";
import { RolesRepository } from "src/orga_structure/domain/RoleRepository";
import { RolesDomainService } from "src/orga_structure/domain/RolesDomainService";
import { GetHierarchyResult } from "../result/GetHierarchyResult";


@QueryHandler(GetHierarchyQuery)
export class GetHierarchyHandler {
    constructor(private readonly rolesRepository: RolesRepository, private readonly rolesService: RolesDomainService) { }

    async execute(query: GetHierarchyQuery): Promise<GetHierarchyResult> {
        const roles = await this.rolesRepository.find();

        const hierarchy = await this.rolesService.buildHierarchy(roles);

        return new GetHierarchyResult(hierarchy);
    }
}