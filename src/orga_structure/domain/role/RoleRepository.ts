import { ISpecification } from 'src/shared/specification';
import { Role } from './Role';
import { Hierarchy } from './Hierarchy';

export interface IRolesRepository {
  generateId: () => Promise<string>;
  save: (role: Role | Role[]) => Promise<void>;
  findById: (id: string) => Promise<Role | null>;
  findOne: (spec?: ISpecification<Role>) => Promise<Role>;
  find: (spec?: ISpecification<Role>) => Promise<Role[]>;
  getHierarchy: () => Promise<Hierarchy>;
  delete: (id: string) => Promise<void>;
}
