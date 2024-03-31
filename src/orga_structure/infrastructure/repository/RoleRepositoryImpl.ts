import { InjectRepository } from '@nestjs/typeorm';
import { ISpecification } from 'src/shared/specification';
import { Role, RoleProperties } from 'src/orga_structure/domain/Role';
import { RoleModel } from 'src/orga_structure/infrastructure/model/Role.model';
import { RolesRepository } from 'src/orga_structure/domain/RoleRepository';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RoleFactory } from 'src/orga_structure/domain/RoleFactory';

export class RolesRepositoryImpl implements RolesRepository {
  constructor(
    private readonly roleFactory: RoleFactory,
    //
    @InjectRepository(RoleModel)
    private readonly roleRepository: Repository<RoleModel>,
  ) {}

  generateId: () => Promise<string> = async () => {
    return uuidv4();
  };

  save: (role: Role | Role[]) => Promise<void> = async (role) => {
    if (Array.isArray(role)) {
      const entities = role.map((r) => this.entityToModel(r));
      await this.roleRepository.save(entities);
    } else {
      await this.roleRepository.save(this.entityToModel(role));
    }
  };

  findById: (id: string) => Promise<Role> = async (id) => {
    const entity = await this.roleRepository.findOne({
      where: { id },
      relations: ['reportsTo', 'subordinates'],
    });
    return this.modelToEntity(entity);
  };

  findOne: (spec?: ISpecification<Role>) => Promise<Role> = async (spec) => {
    const entities = await this.roleRepository.find({
      relations: ['reportsTo', 'subordinates'],
    });

    const roles = entities
      .map((entity) => this.modelToEntity(entity))
      .filter((role) => spec.isSatisfiedBy(role));

    if (roles.length === 0) {
      return null;
    }

    return roles[0];
  };

  find: (spec?: ISpecification<Role>) => Promise<Role[]> = async (spec) => {
    const entities = await this.roleRepository.find({
      relations: ['reportsTo', 'subordinates'],
    });

    const roles = entities
      .map((entity) => this.modelToEntity(entity))
      .filter((role) => spec.isSatisfiedBy(role));

    return roles;
  };

  delete: (id: string) => Promise<void> = async (id) => {
    await this.roleRepository.delete(id);
  };

  entityToModel(role: Role): RoleModel {
    const properties = JSON.parse(JSON.stringify(role)) as RoleProperties;
    return {
      ...properties,
      reportsTo: role.reportsTo ? this.entityToModel(role.reportsTo) : null,
      subordinates: role.subordinates.map((subordinate) =>
        this.entityToModel(subordinate),
      ),
    };
  }

  modelToEntity(model: RoleModel): Role {
    const properties = JSON.parse(JSON.stringify(model)) as RoleProperties;
    return this.roleFactory.create(properties);
  }
}
