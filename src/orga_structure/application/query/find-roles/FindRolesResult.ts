import { IQueryResult } from '@nestjs/cqrs';
import { Role } from '../../../domain/role/Role';

export class FindRolesResult extends Array<Role> implements IQueryResult {}
