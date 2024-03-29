import { ISpecification } from 'src/core/specification';
import { Role } from './Role';

export interface RolesRepository {
  generateId: () => Promise<string>;
  save: (role: Role | Role[]) => Promise<void>;
  findById: (id: string) => Promise<Role | null>;
  findOne: (spec?: ISpecification<Role>) => Promise<Role>;
  find: (spec?: ISpecification<Role>) => Promise<Role[]>;
  delete: (id: string) => Promise<void>;
}
