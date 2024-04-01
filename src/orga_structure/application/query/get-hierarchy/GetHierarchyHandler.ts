import { QueryHandler } from '@nestjs/cqrs';
import { GetHierarchyQuery } from './GetHierarchyQuery';
import { IRolesRepository } from 'src/orga_structure/domain/role/RoleRepository';
import { GetHierarchyResult } from './GetHierarchyResult';
import { InjectionTokens } from 'src/shared/InjectionTokens';
import { Inject } from '@nestjs/common';

@QueryHandler(GetHierarchyQuery)
export class GetHierarchyHandler {
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async execute(query: GetHierarchyQuery): Promise<GetHierarchyResult> {
    const hierarchy = await this.rolesRepository.getHierarchy();

    return new GetHierarchyResult(hierarchy);
  }
}
