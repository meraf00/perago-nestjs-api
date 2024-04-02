import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from './CreateRoleCommand';
import { IRolesRepository } from '../../../domain/role/RoleRepository';
import { RoleFactory } from '../../../domain/role/RoleFactory';
import { RoleValidator } from '../../../domain/role/RoleValidator';
import { InjectionTokens } from '../../../../shared/InjectionTokens';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler
  implements ICommandHandler<CreateRoleCommand, void>
{
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
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

    if (await this.roleValidator.validateUniqueRootRole(role)) {
      await this.rolesRepository.save(role);
    } else {
      throw new ConflictException('Root role already exists.');
    }
  }
}
