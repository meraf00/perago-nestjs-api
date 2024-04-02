import {
  BadRequestException,
  ConflictException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleCommand } from './UpdateRoleCommand';
import { IRolesRepository } from '../../../domain/role/RoleRepository';
import { InjectionTokens } from '../../../../shared/InjectionTokens';
import { RoleValidator } from '../../../domain/role/RoleValidator';
import { RoleValidationException } from '../../../domain/role/Exceptions';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler
  implements ICommandHandler<UpdateRoleCommand, void>
{
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
    private readonly roleValidator: RoleValidator,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<void> {
    const role = await this.rolesRepository.findById(command.id);
    const parent = await this.rolesRepository.findById(command.reportsTo);

    if (command.reportsTo && !parent) {
      throw new NotFoundException('Parent role not found.');
    }

    try {
      role.updateName(command.name);
      role.updateDescription(command.description);
      role.updateParent(parent);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    if (this.roleValidator.validateUniqueRootRole(role)) {
      await this.rolesRepository.save(role);
    } else {
      throw new BadRequestException('Root role already exists.');
    }
  }
}
