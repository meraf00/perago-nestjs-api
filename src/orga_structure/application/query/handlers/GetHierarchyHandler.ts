import { QueryHandler } from '@nestjs/cqrs';
import { GetHierarchyQuery } from '../GetHierarchyQuery';
import { RolesRepository } from 'src/orga_structure/domain/RoleRepository';
import { RolesDomainService } from 'src/orga_structure/domain/RolesDomainService';
import { GetHierarchyResult } from '../result/GetHierarchyResult';
import { InjectionTokens } from '../../InjectionTokens';
import { Inject } from '@nestjs/common';

@QueryHandler(GetHierarchyQuery)
export class GetHierarchyHandler {
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
    private readonly rolesService: RolesDomainService,
  ) {}

  async execute(query: GetHierarchyQuery): Promise<GetHierarchyResult> {
    const roles = await this.rolesRepository.find();

    const hierarchy = await this.rolesService.buildHierarchy(roles);

    return new GetHierarchyResult(hierarchy);
  }
}
