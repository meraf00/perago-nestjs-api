import { IQueryResult } from '@nestjs/cqrs';
import { Role } from '../../../domain/role/Role';

export class FindRoleResult implements IQueryResult {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly description: string,
    private readonly reportsTo: Role | null,
    private readonly subordinates: Role[],
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}
}
