import { QueryHandler } from '@nestjs/cqrs';
import { GetHierarchyQuery } from './GetHierarchyQuery';
import { IRolesRepository } from '../../../domain/role/RoleRepository';
import { GetHierarchyResult } from './GetHierarchyResult';
import { InjectionTokens } from '../../../../shared/InjectionTokens';
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
