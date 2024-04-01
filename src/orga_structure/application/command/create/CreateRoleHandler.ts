import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from './CreateRoleCommand';
import { RolesRepository } from 'src/orga_structure/domain/role/RoleRepository';
import { RoleFactory } from 'src/orga_structure/domain/role/RoleFactory';
import { InjectionTokens } from 'src/shared/InjectionTokens';
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { RoleValidator } from 'src/orga_structure/domain/role/RoleValidator';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler
  implements ICommandHandler<CreateRoleCommand, void>
{
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
    private readonly roleFactory: RoleFactory,
    private readonly roleValidator: RoleValidator,
  ) {}

  async execute(command: CreateRoleCommand): Promise<void> {
    let parent;

    if (command.reportsTo) {
      parent = await this.rolesRepository.findById(command.reportsTo);

      if (!parent) {
        throw new NotFoundException('Parent role not found');
      }
    } else {
      parent = null;
    }

    const id = await this.rolesRepository.generateId();

    const role = this.roleFactory.create({
      id: id,
      name: command.name,
      description: command.description,
      reportsTo: parent,
    });

    if (await this.roleValidator.isValid(role)) {
      await this.rolesRepository.save(role);
    } else {
      throw new ConflictException('Root role already exists.');
    }
  }
}
