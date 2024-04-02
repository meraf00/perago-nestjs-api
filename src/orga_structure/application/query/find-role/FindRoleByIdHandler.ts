import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
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

    if (!role) {
      throw new NotFoundException('Role not found.');
    }

    const roleDto = {
      ...role,
    };

    return new FindRoleResult(
      roleDto.id,
      roleDto.name,
      roleDto.description,
      roleDto.reportsTo,
      roleDto.subordinates,
      roleDto.createdAt,
      roleDto.updatedAt,
    );
  }
}
