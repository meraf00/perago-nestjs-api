import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionTokens } from '../../../../shared/InjectionTokens';
import { IRolesRepository } from '../../../domain/role/RoleRepository';
import { FindRoleByIdQuery } from './FindRoleByIdQuery';
import { FindRoleResult } from './FindRoleResult';

@QueryHandler(FindRoleByIdQuery)
export class FindRoleByIdHandler
  implements IQueryHandler<FindRoleByIdQuery, FindRoleResult>
{
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
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
