import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { QueryFailedError, TreeRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: TreeRepository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const id = uuidv4();

    const role = this.roleRepository.create({
      ...createRoleDto,
      id,
      parent: createRoleDto.parentId ? { id: createRoleDto.parentId } : null,
    });

    if (createRoleDto.parentId === null) {
      role.isRoot = 'root';
    } else {
      role.isRoot = id;
    }

    try {
      return await this.roleRepository.save(role);
    } catch (err) {
      switch (err.constructor) {
        case QueryFailedError:
          if (createRoleDto.parentId === null) {
            throw new Error('Root role already exists');
          } else {
            throw new Error('Parent role does not exist');
          }
        default:
          throw new Error('An error occurred');
      }
    }
  }

  findAll() {
    return this.roleRepository.find();
  }

  findTree() {
    return this.roleRepository.findTrees();
  }

  findOne(id: string) {
    return this.roleRepository.findOne({ where: { id } });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const result = await this.roleRepository.update(id, updateRoleDto);

    if (result.affected === 1) return;

    throw new Error('Role not found');
  }

  async remove(id: string) {
    try {
      await this.roleRepository.remove(this.roleRepository.create({ id }));
    } catch (err) {
      switch (err.constructor) {
        case QueryFailedError:
          throw new Error('Role has subordinates');
        default:
          throw new Error(err.message);
      }
    }
  }
}
