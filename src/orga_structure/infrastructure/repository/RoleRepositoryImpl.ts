import { InjectRepository } from '@nestjs/typeorm';
import { ISpecification } from 'src/core/specification';
import { Role, RoleProperties } from 'src/orga_structure/domain/Role';
import { RoleEntity } from 'src/orga_structure/infrastructure/entity/Role';
import { RolesRepository } from 'src/orga_structure/domain/RoleRepository';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RoleFactory } from 'src/orga_structure/domain/RoleFactory';

export class RolesRepositoryImpl implements RolesRepository {
  constructor(
    private readonly roleFactory: RoleFactory,
    //
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  generateId: () => Promise<string> = async () => {
    return uuidv4();
  };

  save: (role: Role | Role[]) => Promise<void> = async (role) => {
    if (Array.isArray(role)) {
      const entities = role.map((r) => this.roleToEntity(r));
      await this.roleRepository.save(entities);
    } else {
      await this.roleRepository.save(this.roleToEntity(role));
    }
  };

  findById: (id: string) => Promise<Role> = async (id) => {
    const entity = await this.roleRepository.findOne({ where: { id } });
    return this.entityToRole(entity);
  };

  findOne: (spec?: ISpecification<Role>) => Promise<Role> = async (spec) => {
    const entities = await this.roleRepository.find();

    const roles = entities
      .map((entity) => this.entityToRole(entity))
      .filter((role) => spec.isSatisfiedBy(role));

    if (roles.length === 0) {
      return null;
    }

    return roles[0];
  };

  find: (spec?: ISpecification<Role>) => Promise<Role[]> = async (spec) => {
    const entities = await this.roleRepository.find();

    const roles = entities
      .map((entity) => this.entityToRole(entity))
      .filter((role) => spec.isSatisfiedBy(role));

    return roles;
  };

  delete: (id: string) => Promise<void> = async (id) => {
    await this.roleRepository.delete(id);
  };

  roleToEntity(role: Role): RoleEntity {
    const properties = JSON.parse(JSON.stringify(role)) as RoleProperties;
    return {
      ...properties,
      reportsTo: role.reportsTo ? this.roleToEntity(role.reportsTo) : null,
      subordinates: role.subordinates.map((subordinate) =>
        this.roleToEntity(subordinate),
      ),
    };
  }

  entityToRole(entity: RoleEntity): Role {
    const properties = JSON.parse(JSON.stringify(entity)) as RoleProperties;
    return this.roleFactory.create(properties);
  }
}
