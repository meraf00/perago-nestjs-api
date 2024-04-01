import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IRolesRepository } from 'src/orga_structure/domain/role/RoleRepository';
import { Inject } from '@nestjs/common';
import { InjectionTokens } from 'src/shared/InjectionTokens';
import {
  ChildOfSpec,
  RoleDescriptionContainsSpec,
  RoleNameSpec,
} from 'src/orga_structure/domain/role/RoleSpecification';
import { FindRolesResult } from './FindRolesResult';
import { FindRolesQuery } from './FindRolesQuery';

@QueryHandler(FindRolesQuery)
export class FindRolesHandler
  implements IQueryHandler<FindRolesQuery, FindRolesResult>
{
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async execute(query: FindRolesQuery): Promise<FindRolesResult> {
    const nameSpec = new RoleNameSpec(query.name);
    const descSpec = new RoleDescriptionContainsSpec(query.description);
    const parentSpec = new ChildOfSpec(query.reportsTo);

    let roles = await this.rolesRepository.find(
      nameSpec.and(descSpec).and(parentSpec),
    );

    return new FindRolesResult(roles);
  }
}
