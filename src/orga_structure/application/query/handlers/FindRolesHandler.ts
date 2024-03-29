import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRolesQuery } from '../FindRolesQuery';
import { FindRolesResult } from '../result/FindRolesResult';
import { RolesRepository } from 'src/orga_structure/domain/RoleRepository';
import { Inject } from '@nestjs/common';
import { InjectionTokens } from '../../InjectionTokens';
import {
  ChildOfSpec,
  RoleDescriptionContainsSpec,
  RoleNameSpec,
} from 'src/orga_structure/domain/RoleSpecification';

@QueryHandler(FindRolesQuery)
export class FindRolesHandler
  implements IQueryHandler<FindRolesQuery, FindRolesResult>
{
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
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
