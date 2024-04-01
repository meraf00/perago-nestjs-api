import { IQueryResult } from '@nestjs/cqrs';
import { Role } from 'src/orga_structure/domain/role/Role';

export class FindRolesResult implements IQueryResult {
  constructor(public readonly roles: ReadonlyArray<Role>) {}
}
