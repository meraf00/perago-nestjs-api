import { QueryHandler } from '@nestjs/cqrs';
import { GetHierarchyQuery } from '../GetHierarchyQuery';
import { RolesRepository } from 'src/orga_structure/domain/role/RoleRepository';
import { GetHierarchyResult } from '../result/GetHierarchyResult';
import { InjectionTokens } from '../../InjectionTokens';
import { Inject } from '@nestjs/common';

@QueryHandler(GetHierarchyQuery)
export class GetHierarchyHandler {
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(query: GetHierarchyQuery): Promise<GetHierarchyResult> {
    const hierarchy = await this.rolesRepository.getHierarchy();

    return new GetHierarchyResult(hierarchy);
  }
}
