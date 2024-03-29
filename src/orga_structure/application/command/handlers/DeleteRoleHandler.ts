import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoleCommand } from '../DeleteRoleCommand';
import { RolesRepository } from 'src/orga_structure/domain/RoleRepository';
import { InjectionTokens } from '../../InjectionTokens';
import { Inject } from '@nestjs/common';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler
  implements ICommandHandler<DeleteRoleCommand, void>
{
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(command: DeleteRoleCommand): Promise<void> {
    await this.rolesRepository.delete(command.id);
  }
}
