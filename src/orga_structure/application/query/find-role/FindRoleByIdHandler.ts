import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RolesRepository } from 'src/orga_structure/domain/role/RoleRepository';
import { FindRoleByIdQuery } from './FindRoleByIdQuery';
import { FindRoleResult } from './FindRoleResult';
import { Inject } from '@nestjs/common';
import { InjectionTokens } from 'src/shared/InjectionTokens';

@QueryHandler(FindRoleByIdQuery)
export class FindRoleByIdHandler
  implements IQueryHandler<FindRoleByIdQuery, FindRoleResult>
{
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(query: FindRoleByIdQuery): Promise<FindRoleResult> {
    const role = await this.rolesRepository.findById(query.id);

    const roleDto = {
      ...role,
      reportsTo: role.reportsTo ? role.reportsTo.id : null,
      subordinates: role.subordinates.map((subordinate) => subordinate.id),
    };

    return new FindRoleResult(roleDto);
  }
}
