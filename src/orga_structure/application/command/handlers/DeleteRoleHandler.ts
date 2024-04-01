import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoleCommand } from '../DeleteRoleCommand';
import { RolesRepository } from 'src/orga_structure/domain/role/RoleRepository';
import { InjectionTokens } from 'src/shared/InjectionTokens';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler
  implements ICommandHandler<DeleteRoleCommand, void>
{
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(command: DeleteRoleCommand): Promise<void> {
    const role = await this.rolesRepository.findById(command.id);
    if (role) {
      await this.rolesRepository.delete(command.id);
    } else {
      throw new NotFoundException('Role not found.');
    }
  }
}
