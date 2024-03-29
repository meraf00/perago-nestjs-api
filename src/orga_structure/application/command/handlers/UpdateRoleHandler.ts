import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleCommand } from '../UpdateRoleCommand';
import { RolesRepository } from 'src/orga_structure/domain//RoleRepository';
import { InjectionTokens } from '../../InjectionTokens';
import { Inject } from '@nestjs/common';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler
  implements ICommandHandler<UpdateRoleCommand, void>
{
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<void> {
    const role = await this.rolesRepository.findById(command.id);
    const parent = await this.rolesRepository.findById(command.reportsTo);

    role.updateName(command.name);
    role.updateDescription(command.description);
    role.updateParent(parent);

    await this.rolesRepository.save(role);
  }
}
