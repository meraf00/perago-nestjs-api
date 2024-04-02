import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRolesQuery } from './FindRolesQuery';
import { FindRolesResult } from './FindRolesResult';
import { IRolesRepository } from '../../../domain/role/RoleRepository';
import { InjectionTokens } from '../../../../shared/InjectionTokens';
import {
  ChildOfSpec,
  RoleDescriptionContainsSpec,
  RoleNameSpec,
} from '../../../domain/role/RoleSpecification';

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

    return new FindRolesResult(...roles);
  }
}
