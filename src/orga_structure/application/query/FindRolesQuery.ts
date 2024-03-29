import { IQuery } from '@nestjs/cqrs';

export class FindRolesQuery implements IQuery {
  constructor(
    public readonly name?: string,
    public readonly description?: string,
    public readonly reportsTo?: string,
  ) {}
}
