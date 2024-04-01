import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModel } from './infrastructure/model/Role.model';
import { RoleController } from './api/controllers/role.controller';
import { CqrsModule } from '@nestjs/cqrs';

import { InjectionTokens } from 'src/shared/InjectionTokens';
import { RolesRepositoryImpl } from './infrastructure/repository/RoleRepositoryImpl';
import { RoleFactory } from './domain/role/RoleFactory';

import { RoleValidator } from './domain/role/RoleValidator';
import { FindRoleByIdHandler } from './application/query/find-role/FindRoleByIdHandler';
import { FindRolesHandler } from './application/query/find-roles/FindRolesHandler';
import { GetHierarchyHandler } from './application/query/get-hierarchy/GetHierarchyHandler';
import { CreateRoleHandler } from './application/command/create/CreateRoleHandler';
import { UpdateRoleHandler } from './application/command/update/UpdateRoleHandler';
import { DeleteRoleHandler } from './application/command/delete/DeleteRoleHandler';

const infrastructure: Provider[] = [
  {
    provide: InjectionTokens.ROLE_REPOSITORY,
    useClass: RolesRepositoryImpl,
  },
];

const application = [
  // query
  FindRoleByIdHandler,
  FindRolesHandler,
  GetHierarchyHandler,

  // command
  CreateRoleHandler,
  UpdateRoleHandler,
  DeleteRoleHandler,
];

const domain = [RoleFactory, RoleValidator];

@Module({
  imports: [TypeOrmModule.forFeature([RoleModel]), CqrsModule],
  controllers: [RoleController],
  providers: [...domain, ...application, ...infrastructure],
  exports: [TypeOrmModule],
})
export class OrgaStructureModule {}
