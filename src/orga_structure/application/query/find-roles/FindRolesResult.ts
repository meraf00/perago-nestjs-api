import { IQueryResult } from '@nestjs/cqrs';
import { Role } from '../../../domain/role/Role';

export class FindRolesResult implements IQueryResult {
  constructor(public readonly roles: ReadonlyArray<Role>) {}
}
