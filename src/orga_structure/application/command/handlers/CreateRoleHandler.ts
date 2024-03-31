import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from '../CreateRoleCommand';
import { RolesRepository } from 'src/orga_structure/domain/role/RoleRepository';
import { RoleFactory } from 'src/orga_structure/domain/role/RoleFactory';
import { InjectionTokens } from '../../InjectionTokens';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler
  implements ICommandHandler<CreateRoleCommand, void>
{
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
    private readonly roleFactory: RoleFactory,
  ) {}

  async execute(command: CreateRoleCommand): Promise<void> {
    const parent = await this.rolesRepository.findById(command.reportsTo);

    if (!parent) {
      throw new Error('Parent role not found');
    }

    const id = await this.rolesRepository.generateId();

    const role = this.roleFactory.create({
      id: id,
      name: command.name,
      description: command.description,
      reportsTo: parent,
    });

    await this.rolesRepository.save(role);
  }
}
