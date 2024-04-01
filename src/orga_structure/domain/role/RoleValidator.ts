import { Inject } from '@nestjs/common';
import { IRolesRepository } from './RoleRepository';
import { InjectionTokens } from 'src/shared/InjectionTokens';
import { Role } from './Role';

export class RoleValidator {
  constructor(
    @Inject(InjectionTokens.ROLE_REPOSITORY)
    private readonly roleRepository: IRolesRepository,
  ) {}

  async isRoot(role: Role): Promise<boolean> {
    const _role = await this.roleRepository.findById(role.id);
    if (!_role) return false;
    return _role.reportsTo === null;
  }

  async isValid(role: Role): Promise<boolean> {
    if (role.reportsTo == null) {
      const roles = await this.roleRepository.find();
      if (roles.length === 0) {
        return true;
      } else if (await this.isRoot(role)) {
        return true;
      }
      return false;
    }
    return role.id !== role.reportsTo.id;
  }
}
