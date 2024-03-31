import { IQueryResult } from '@nestjs/cqrs';
import { Hierarchy } from 'src/orga_structure/domain/role/Hierarchy';

export class GetHierarchyResult implements IQueryResult {
  constructor(public readonly hierarchy: Hierarchy) {}
}
